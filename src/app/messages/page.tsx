'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useMessageStore } from '@/store/messageStore'
import ConversationList from '@/components/ConversationList'
import MessageThread from '@/components/MessageThread'

function MessagesContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, isLoading: authLoading } = useAuth()
  const [activeId, setActiveId] = useState<string | null>(null)

  const { conversations, isFetching, isInitialized, initialize } = useMessageStore()

  const listingParam = searchParams.get('listing')

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/')
    }
  }, [authLoading, user, router])

  useEffect(() => {
    if (user && !isInitialized) {
      initialize(user.id)
    }
  }, [user, isInitialized, initialize])

  useEffect(() => {
    if (!listingParam || !conversations.length) return
    const match = conversations.find((c) => c.listing_id === listingParam)
    if (match) {
      setActiveId(match.id)
      router.replace('/messages')
    }
  }, [listingParam, conversations, router])

  if (authLoading || (!user && !authLoading) || (user && !isInitialized && isFetching)) {
    return (
      <div className="flex h-[calc(100vh-80px)] md:h-[calc(100vh-80px)] bg-white dark:bg-[#121212] items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#EBEBEB] dark:border-[#3D3D3D] border-t-[#0071E3] rounded-full animate-spin"></div>
      </div>
    )
  }

  const activeConversation = conversations.find((c) => c.id === activeId)

  return (
    <div className="flex h-[calc(100vh-80px)] md:h-[calc(100vh-80px)] bg-[#F7F7F7] dark:bg-[#0A0A0A] overflow-hidden">
      <div className={`w-full md:w-[350px] lg:w-[400px] h-full flex-shrink-0 ${activeId ? 'hidden md:flex' : 'flex'}`}>
        {user && (
          <ConversationList
            conversations={conversations}
            currentUserId={user.id}
            activeConversationId={activeId}
            onSelect={(id) => setActiveId(id)}
          />
        )}
      </div>

      <div className={`flex-1 h-full ${!activeId ? 'hidden md:flex' : 'flex'}`}>
        {activeId && activeConversation && user ? (
          <div className="w-full h-full">
            <MessageThread
              conversation={activeConversation}
              currentUserId={user.id}
              onBack={() => setActiveId(null)}
            />
          </div>
        ) : (
          <div className="w-full h-full hidden md:flex flex-col items-center justify-center border-l border-[#EBEBEB] dark:border-[#3D3D3D] text-center p-6">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="w-24 h-24 text-[#DDDDDD] dark:text-[#3D3D3D] mb-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <h2 className="text-2xl font-semibold mb-2">Your Messages</h2>
            <p className="text-[#717171] dark:text-[#A0A0A0] max-w-sm">
              Select a conversation from the list to view your messages, or start a new inquiry from a listing page.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function MessagesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[calc(100vh-80px)] md:h-[calc(100vh-80px)] bg-white dark:bg-[#121212] items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#EBEBEB] dark:border-[#3D3D3D] border-t-[#0071E3] rounded-full animate-spin" />
        </div>
      }
    >
      <MessagesContent />
    </Suspense>
  )
}
