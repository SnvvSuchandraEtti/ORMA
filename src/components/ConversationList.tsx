'use client'

import React from 'react'
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
    <div className="flex flex-col h-full border-r border-[#EBEBEB] dark:border-[#3D3D3D] bg-white/70 dark:bg-[#121212]/70 backdrop-blur-xl overflow-y-auto custom-scrollbar">
      <div className="p-6 border-b border-[#EBEBEB] dark:border-[#3D3D3D] sticky top-0 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-md z-10">
        <h2 className="text-2xl font-bold text-[#222222] dark:text-white tracking-tight">Messages</h2>
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
              className={`p-4 border-b border-[#EBEBEB]/50 dark:border-[#3D3D3D]/50 flex items-start gap-4 cursor-pointer transition-all duration-200 relative ${
                isActive 
                  ? 'bg-white dark:bg-[#2D2D2D] shadow-sm z-10' 
                  : 'hover:bg-white/50 dark:hover:bg-[#1E1E1E]/50'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-[#0071E3] rounded-r-full" />
              )}
              <div className="relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden bg-gray-200 dark:bg-[#3D3D3D]">
                  <div className="w-full h-full flex items-center justify-center text-[#222222] dark:text-white font-semibold">
                    {otherProfile?.full_name?.charAt(0) || '?'}
                  </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className={`font-bold text-sm truncate pr-2 ${isActive ? 'text-[#0071E3]' : 'text-[#222222] dark:text-white'}`}>
                    {otherProfile?.full_name || 'Anonymous User'}
                  </h4>
                  {conv.last_message_at && (
                    <span className="text-[10px] font-medium text-[#717171] dark:text-[#A0A0A0] flex-shrink-0 uppercase">
                      {formatDistanceToNow(new Date(conv.last_message_at), { addSuffix: true })}
                    </span>
                  )}
                </div>
                {conv.listing && (
                  <p className="text-xs font-medium text-[#0071E3] mb-1 truncate">
                    Re: {conv.listing.title}
                  </p>
                )}
                <p className="text-xs font-medium text-[#717171] dark:text-[#A0A0A0] line-clamp-1 leading-relaxed">
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
