import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client'
import type { Conversation, Message } from '@/types'

interface MessageStore {
  conversations: Conversation[]
  unreadCount: number
  isInitialized: boolean
  isFetching: boolean
  currentUserId: string | null
  
  initialize: (userId: string) => Promise<void>
  fetchConversations: () => Promise<void>
  markConversationAsRead: (conversationId: string) => Promise<void>
  sendMessage: (conversationId: string, text: string) => Promise<void>
  subscribeToMessages: () => void
  unsubscribeFromMessages: () => void
  cleanup: () => void
}

let messageChannel: any = null;

export const useMessageStore = create<MessageStore>((set, get) => ({
  conversations: [],
  unreadCount: 0,
  isInitialized: false,
  isFetching: false,
  currentUserId: null,

  initialize: async (userId: string) => {
    if (get().currentUserId === userId && get().isInitialized) return
    set((state) => {
       // Cleanup old sub if changing users
       if (state.currentUserId && state.currentUserId !== userId) {
         get().cleanup()
       }
       return { currentUserId: userId, isInitialized: true }
    })
    
    await get().fetchConversations()
    get().subscribeToMessages()
  },

  fetchConversations: async () => {
    const { currentUserId } = get()
    if (!currentUserId) return

    set({ isFetching: true })
    const supabase = createClient()
    
    try {
      // Fetch all conversations where user is a participant
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          listing:listings(*),
          participant1_profile:profiles!conversations_participant_1_fkey(*),
          participant2_profile:profiles!conversations_participant_2_fkey(*)
        `)
        .or(`participant_1.eq.${currentUserId},participant_2.eq.${currentUserId}`)
        .order('last_message_at', { ascending: false })

      if (error) throw error

      const conversations = (data || []) as Conversation[]
      
      // Calculate unread count matching the new conversations
      const cIds = conversations.map(c => c.id)
      let unreads = 0
      
      if (cIds.length > 0) {
        const { count, error: countErr } = await supabase
          .from('messages')
          .select('*', { count: 'exact', head: true })
          .in('conversation_id', cIds)
          .eq('is_read', false)
          .neq('sender_id', currentUserId)
          
        if (!countErr) unreads = count || 0
      }

      set({ conversations, unreadCount: unreads, isFetching: false })
    } catch (err) {
      console.error('Error fetching conversations:', err)
      set({ isFetching: false })
    }
  },

  markConversationAsRead: async (conversationId: string) => {
    const { currentUserId } = get()
    if (!currentUserId) return

    const supabase = createClient()
    const { error } = await supabase
      .from('messages')
      .update({ is_read: true })
      .eq('conversation_id', conversationId)
      .eq('is_read', false)
      .neq('sender_id', currentUserId)

    if (!error) {
      // Recalculate unread count by re-fetching (or local decrement based on precise count, but re-fetch is safer for now, actually let's just re-fetch unreads silently to be safe, or just call fetchConversations without loading state)
      const { conversations } = get()
      const cIds = conversations.map(c => c.id)
      if(cIds.length > 0) {
        const { count } = await supabase
          .from('messages')
          .select('*', { count: 'exact', head: true })
          .in('conversation_id', cIds)
          .eq('is_read', false)
          .neq('sender_id', currentUserId)
        
        set({ unreadCount: count || 0 })
      }
    }
  },

  sendMessage: async (conversationId: string, text: string) => {
    const { currentUserId } = get()
    if (!currentUserId) return

    const supabase = createClient()
    
    // Optimistic locally update last message
    const convs = [...get().conversations]
    const idx = convs.findIndex(c => c.id === conversationId)
    if (idx !== -1) {
      convs[idx] = { 
        ...convs[idx], 
        last_message_text: text, 
        last_message_at: new Date().toISOString() 
      }
      convs.sort((a, b) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime())
      set({ conversations: convs })
    }

    // Insert Message
    await supabase.from('messages').insert({
      conversation_id: conversationId,
      sender_id: currentUserId,
      message: text
    })

    // Update conversation last message data
    await supabase.from('conversations').update({
      last_message_text: text,
      last_message_at: new Date().toISOString()
    }).eq('id', conversationId)
  },

  subscribeToMessages: () => {
    const { currentUserId } = get()
    if (!currentUserId) return

    // Prevent duplicate subs
    if (messageChannel) return 

    const supabase = createClient()
    
    messageChannel = supabase.channel('global-messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages'
      }, (payload) => {
        const newMessage = payload.new as Message
        const state = get()
        
        // Is this message for a conversation we know about?
        const isKnown = state.conversations.some(c => c.id === newMessage.conversation_id)
        
        if (isKnown) {
          // If we didn't send it, increment unread immediately (unless we're actively viewing it - but since this is global store, we just increment. Local view can mark read immediately)
          if (newMessage.sender_id !== currentUserId) {
            set({ unreadCount: state.unreadCount + 1 })
          }
          
          // Re-sort the conversations by updating the last message timestamp optimisticallly 
          // (or just rely on the conversation update subscription below)
        } else {
          // It's a new conversation we don't have yet, re-fetch conversations to get the populated joins
          get().fetchConversations()
        }
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'conversations'
      }, (payload) => {
         // Update the conversation in list
         const updatedConv = payload.new as Conversation
         const state = get()
         const newConvs = [...state.conversations]
         const idx = newConvs.findIndex(c => c.id === updatedConv.id)
         
         if (idx !== -1) {
           newConvs[idx] = { ...newConvs[idx], ...updatedConv }
           newConvs.sort((a, b) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime())
           set({ conversations: newConvs })
         } else {
           // We are part of it but didn't have it locally
           get().fetchConversations()
         }
      })
      .subscribe()
  },

  unsubscribeFromMessages: () => {
    if (messageChannel) {
      messageChannel.unsubscribe()
      messageChannel = null
    }
  },

  cleanup: () => {
    get().unsubscribeFromMessages()
    set({
      conversations: [],
      unreadCount: 0,
      isInitialized: false,
      currentUserId: null
    })
  }
}))
