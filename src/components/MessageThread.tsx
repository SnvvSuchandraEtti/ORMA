'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
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
    <div className="flex flex-col h-full bg-[#F7F7F7] dark:bg-[#0A0A0A]">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 md:p-6 border-b border-[#EBEBEB] dark:border-[#3D3D3D] sticky top-0 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-md z-10 shadow-sm">
        {onBack && (
          <button 
            onClick={onBack}
            className="md:hidden p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#2D2D2D]"
          >
            ←
          </button>
        )}
        <div className="relative w-10 h-10 rounded-full flex-shrink-0 bg-gray-200 dark:bg-[#3D3D3D] overflow-hidden">
             <div className="w-full h-full flex items-center justify-center font-bold">
               {otherProfile?.full_name?.charAt(0) || '?'}
             </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-base text-[#222222] dark:text-white tracking-tight">{otherProfile?.full_name || 'User'}</h3>
          {conversation.listing && (
            <Link href={`/listing/${conversation.listing_id}`} className="text-xs font-semibold text-[#717171] dark:text-[#A0A0A0] flex items-center gap-1 hover:text-[#0071E3] transition-colors">
              <span className="opacity-70">Renting:</span> {conversation.listing.title}
            </Link>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
             <div className="w-8 h-8 rounded-full border-2 border-[#0071E3] border-t-white dark:border-t-[#121212] animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-white dark:bg-[#1E1E1E] rounded-3xl flex items-center justify-center shadow-sm mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-[#0071E3]">
                <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#222222] dark:text-white mb-1">New Conversation</h3>
            <p className="text-sm text-[#717171] dark:text-[#A0A0A0] max-w-xs">
              This is the beginning of your chat about <strong>{conversation.listing?.title}</strong>.
            </p>
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
                    className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm transition-all hover:shadow-md ${
                      isMe 
                       ? 'bg-gradient-to-br from-[#0071E3] to-[#0055B3] text-white rounded-tr-none' 
                       : 'bg-white dark:bg-[#1E1E1E] text-[#222222] dark:text-white rounded-tl-none border border-[#EBEBEB] dark:border-[#3D3D3D]'
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words font-medium">{msg.message}</p>
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
            className="w-full max-h-32 min-h-[52px] bg-white dark:bg-[#1A1A1A] border border-[#DDDDDD] dark:border-[#3D3D3D] rounded-2xl py-4 pl-5 pr-14 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] dark:focus:border-[#0071E3] transition-all resize-none shadow-sm"
            rows={1}
            disabled={isSending || isLoading}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isSending || isLoading}
            className="absolute right-3 bottom-2.5 p-2 rounded-xl text-white bg-gradient-to-br from-[#0071E3] to-[#0055B3] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center shrink-0 w-10 h-10 group"
          >
            {isSending ? (
               <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
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
