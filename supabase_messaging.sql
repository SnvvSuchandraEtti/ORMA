-- Conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID REFERENCES listings(id) ON DELETE SET NULL,
  participant_1 UUID REFERENCES profiles(id) ON DELETE CASCADE,
  participant_2 UUID REFERENCES profiles(id) ON DELETE CASCADE,
  last_message_text TEXT DEFAULT '',
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(listing_id, participant_1, participant_2)
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Conversations
-- Users can only see conversations they're part of
CREATE POLICY "Users can view their own conversations" 
ON conversations FOR SELECT 
USING (auth.uid() = participant_1 OR auth.uid() = participant_2);

-- Users can insert conversations if they are participant_1 or participant_2
CREATE POLICY "Users can create conversations" 
ON conversations FOR INSERT 
WITH CHECK (auth.uid() = participant_1 OR auth.uid() = participant_2);

-- Users can update their own conversations (e.g., last_message_text/at)
CREATE POLICY "Users can update their own conversations" 
ON conversations FOR UPDATE 
USING (auth.uid() = participant_1 OR auth.uid() = participant_2);

-- RLS Policies for Messages
-- Users can only see messages in their conversations
CREATE POLICY "Users can view messages in their conversations" 
ON messages FOR SELECT 
USING (
  conversation_id IN (
    SELECT id FROM conversations 
    WHERE participant_1 = auth.uid() OR participant_2 = auth.uid()
  )
);

-- Users can insert messages to conversations they're part of
CREATE POLICY "Users can send messages to their conversations" 
ON messages FOR INSERT 
WITH CHECK (
  auth.uid() = sender_id AND
  conversation_id IN (
    SELECT id FROM conversations 
    WHERE participant_1 = auth.uid() OR participant_2 = auth.uid()
  )
);

-- Users can update messages in their conversations (e.g., mark as read)
CREATE POLICY "Users can update messages in their conversations" 
ON messages FOR UPDATE 
USING (
  conversation_id IN (
    SELECT id FROM conversations 
    WHERE participant_1 = auth.uid() OR participant_2 = auth.uid()
  )
);

-- Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_conversations_participants ON conversations(participant_1, participant_2);
CREATE INDEX IF NOT EXISTS idx_conversations_listing ON conversations(listing_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read);

-- Setup realtime for messaging
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime FOR TABLE messages, conversations;
COMMIT;
