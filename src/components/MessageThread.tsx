'use client'

import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { formatDistanceToNow, format } from 'date-fns'
import type { Message, Conversation } from '@/types'
import { useMessageStore } from '@/store/messageStore'
import { toast } from 'react-hot-toast'

interface MessageThreadProps {
  conversation: Conversation
  currentUserId: string
  onBack?: () => void
}

export default function MessageThread({ conversation, currentUserId, onBack }: MessageThreadProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [inputText, setInputText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { sendMessage, markConversationAsRead } = useMessageStore()
  const supabase = createClient()
  
  const isParticipant1 = currentUserId === conversation.participant_1
  const otherProfile = isParticipant1 ? conversation.participant2_profile : conversation.participant1_profile

  // Fetch initial messages
  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null;
    
    const fetchMessages = async () => {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversation.id)
        .order('created_at', { ascending: true })

      if (error) {
        toast.error('Failed to load messages')
      } else {
        setMessages(data as Message[])
        // Mark as read when opened
        markConversationAsRead(conversation.id)
        scrollToBottom()
      }
      setIsLoading(false)

      // Subscribe to new messages for THIS conversation
      channel = supabase.channel(`messages-${conversation.id}`)
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversation.id}`
        }, (payload) => {
          const newMsg = payload.new as Message
          setMessages(prev => [...prev, newMsg])
          if (newMsg.sender_id !== currentUserId) {
            markConversationAsRead(conversation.id)
          }
          scrollToBottom()
        })
        .subscribe()
    }

    fetchMessages()

    return () => {
      if (channel) supabase.removeChannel(channel)
    }
  }, [conversation.id, currentUserId, supabase, markConversationAsRead])

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim() || isSending) return

    setIsSending(true)
    const text = inputText.trim()
    setInputText('')

    try {
      await sendMessage(conversation.id, text)
      // The local subscription will catch the insert and append it, but we could optimistic append here too.
    } catch (error) {
      toast.error('Failed to send message')
      setInputText(text) // Restore text on failure
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#121212]">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-[#EBEBEB] dark:border-[#3D3D3D] sticky top-0 bg-white dark:bg-[#121212] z-10">
        {onBack && (
          <button 
            onClick={onBack}
            className="md:hidden p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2D2D2D]"
          >
            ←
          </button>
        )}
        <div className="relative w-10 h-10 rounded-full flex-shrink-0 bg-gray-200 dark:bg-[#3D3D3D] overflow-hidden">
           {otherProfile?.avatar_url ? (
             <Image src={otherProfile.avatar_url} alt="Avatar" fill className="object-cover" />
           ) : (
             <div className="w-full h-full flex items-center justify-center font-bold">
               {otherProfile?.full_name?.charAt(0) || '?'}
             </div>
           )}
        </div>
        <div>
          <h3 className="font-semibold text-base">{otherProfile?.full_name || 'User'}</h3>
          {conversation.listing && (
            <p className="text-xs text-[#717171] dark:text-[#A0A0A0]">
              Inquiry about: <span className="text-[#FF385C]">{conversation.listing.title}</span>
            </p>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
             <div className="w-8 h-8 rounded-full border-2 border-[#FF385C] border-t-white dark:border-t-[#121212] animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-[#717171] dark:text-[#A0A0A0] py-12">
            This is the beginning of your conversation.
          </div>
        ) : (
          messages.map((msg, idx) => {
             const isMe = msg.sender_id === currentUserId
             const showTimestamp = idx === 0 || 
               new Date(msg.created_at).getTime() - new Date(messages[idx-1].created_at).getTime() > 1000 * 60 * 30 // 30 mins

             return (
               <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                 {showTimestamp && (
                    <div className="text-[10px] text-[#717171] dark:text-[#A0A0A0] mb-2 px-2 mt-4">
                      {format(new Date(msg.created_at), 'MMM d, h:mm a')}
                    </div>
                 )}
                 <div 
                   className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                     isMe 
                      ? 'bg-[#FF385C] text-white rounded-br-none' 
                      : 'bg-[#F7F7F7] dark:bg-[#2D2D2D] text-[#222222] dark:text-white rounded-bl-none border border-[#EBEBEB] dark:border-[#3D3D3D]'
                   }`}
                 >
                   <p className="whitespace-pre-wrap break-words">{msg.message}</p>
                 </div>
                 {isMe && msg.is_read && idx === messages.length - 1 && (
                   <span className="text-[10px] text-[#717171] dark:text-[#A0A0A0] mt-1 pr-1">Read</span>
                 )}
               </div>
             )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-[#EBEBEB] dark:border-[#3D3D3D] bg-white dark:bg-[#121212]">
        <form onSubmit={handleSend} className="flex items-end gap-2 relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
            placeholder="Type a message..."
            className="w-full max-h-32 min-h-[44px] bg-[#F7F7F7] dark:bg-[#1A1A1A] border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-2xl py-3 pl-4 pr-12 focus:outline-none focus:border-[#222222] dark:focus:border-white resize-none"
            rows={1}
            disabled={isSending || isLoading}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isSending || isLoading}
            className="absolute right-2 bottom-2 p-2 rounded-full text-white bg-[#FF385C] hover:bg-[#D90B38] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center shrink-0 w-8 h-8"
          >
            {isSending ? (
               <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 relative -right-[1px]">
                 <line x1="22" y1="2" x2="11" y2="13"></line>
                 <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
               </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
