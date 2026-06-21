'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import type { Profile } from '@/types'
import toast from '@/lib/toast'

interface AuthContextType {
  user: User | null
  profile: Profile | null
  isLoading: boolean
  isGoogleLoading: boolean
  isAuthenticated: boolean
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (email: string, password: string, fullName: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const supabase = createClient()

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        return
      }
      setProfile(data as Profile)
    } catch (err) {
      console.error('Error fetching profile:', err)
    }
  }, [supabase])

  const completePendingAction = useCallback(async (currentUserId: string) => {
    if (typeof window === 'undefined') return
    const pendingRaw = localStorage.getItem('orma_pending_action')
    if (!pendingRaw) return

    try {
      const pending = JSON.parse(pendingRaw) as { type?: string; listingId?: string }
      if (pending.type === 'wishlist' && pending.listingId) {
        const { error } = await supabase
          .from('wishlists')
          .upsert(
            { listing_id: pending.listingId, user_id: currentUserId },
            { onConflict: 'user_id,listing_id', ignoreDuplicates: true }
          )
        if (error) throw error
      }
    } catch (err) {
      console.error('Failed to complete pending action:', err)
    } finally {
      localStorage.removeItem('orma_pending_action')
    }
  }, [supabase])

  useEffect(() => {
    // Get initial session
    const initAuth = async () => {
      try {
        const { data: { user: initialUser } } = await supabase.auth.getUser()
        setUser(initialUser)
        if (initialUser) {
          await fetchProfile(initialUser.id)
        }
      } catch (err) {
        console.error('Auth init error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()

    // Listen to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null
        setUser(currentUser)

        if (currentUser) {
          await fetchProfile(currentUser.id)
          await completePendingAction(currentUser.id)
        } else {
          setProfile(null)
        }

        if (event === 'SIGNED_IN') {
          setIsLoading(false)
        }
        if (event === 'SIGNED_OUT') {
          setIsLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [completePendingAction, fetchProfile, supabase.auth])

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    const fallbackName = email.split('@')[0]
    const name = profile?.full_name?.split(' ')[0] || fallbackName
    toast.success(`Welcome back, ${name}! 👋`)
  }

  const signUpWithEmail = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    })
    if (error) throw error
    toast.success('Welcome to ORMA! 🎉 Start by browsing items or listing your own.')
  }

  const signInWithGoogle = async () => {
    try {
      setIsGoogleLoading(true)

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) {
        throw error
      }

      // The redirect happens automatically
      // User will be redirected to Google, then back to /auth/callback
    } catch (err: any) {
      console.error('Google sign-in error:', err)
      toast.error(err.message || 'Failed to sign in with Google')
    } finally {
      setIsGoogleLoading(false)
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    setUser(null)
    setProfile(null)
    toast.success('Logged out successfully')
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error('Not authenticated')
    const { error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', user.id)
    if (error) throw error
    await fetchProfile(user.id)
    toast.success('Profile updated successfully')
  }

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        isGoogleLoading,
        isAuthenticated: !!user,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut,
        updateProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
