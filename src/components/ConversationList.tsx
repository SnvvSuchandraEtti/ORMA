'use client'

import React from 'react'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import type { Conversation } from '@/types'

interface ConversationListProps {
  conversations: Conversation[]
  currentUserId: string
  activeConversationId: string | null
  onSelect: (id: string) => void
}

export default function ConversationList({ 
  conversations, 
  currentUserId, 
  activeConversationId, 
  onSelect 
}: ConversationListProps) {
  
  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center border-r border-gray-200 dark:border-[#3D3D3D]">
        <h3 className="text-xl font-semibold mb-2">No messages</h3>
        <p className="text-[#717171] dark:text-[#A0A0A0]">When you contact someone or someone contacts you, the messages will appear here.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full border-r border-[#EBEBEB] dark:border-[#3D3D3D] bg-white dark:bg-[#121212] overflow-y-auto">
      <div className="p-4 border-b border-[#EBEBEB] dark:border-[#3D3D3D] sticky top-0 bg-white dark:bg-[#121212] z-10">
        <h2 className="text-2xl font-semibold">Messages</h2>
      </div>
      <div className="flex-1">
        {conversations.map(conv => {
          const isParticipant1 = currentUserId === conv.participant_1
          const otherProfile = isParticipant1 ? conv.participant2_profile : conv.participant1_profile
          const isActive = activeConversationId === conv.id
          
          return (
            <div 
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              className={`p-4 border-b border-[#EBEBEB] dark:border-[#3D3D3D] flex items-start gap-4 cursor-pointer transition-colors ${
                isActive 
                  ? 'bg-gray-100 dark:bg-[#2D2D2D]' 
                  : 'hover:bg-gray-50 dark:hover:bg-[#1E1E1E]'
              }`}
            >
              <div className="relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden bg-gray-200 dark:bg-[#3D3D3D]">
                {otherProfile?.avatar_url ? (
                  <Image 
                    src={otherProfile.avatar_url} 
                    alt={otherProfile.full_name || 'User'} 
                    fill 
                    className="object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#222222] dark:text-white font-semibold">
                    {otherProfile?.full_name?.charAt(0) || '?'}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-semibold text-base truncate pr-2">
                    {otherProfile?.full_name || 'Anonymous User'}
                  </h4>
                  {conv.last_message_at && (
                    <span className="text-xs text-[#717171] dark:text-[#A0A0A0] flex-shrink-0">
                      {formatDistanceToNow(new Date(conv.last_message_at), { addSuffix: true })}
                    </span>
                  )}
                </div>
                {conv.listing && (
                  <p className="text-xs font-medium text-[#FF385C] mb-1 truncate">
                    Re: {conv.listing.title}
                  </p>
                )}
                <p className="text-sm text-[#717171] dark:text-[#A0A0A0] truncate">
                  {conv.last_message_text || 'No messages yet...'}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
