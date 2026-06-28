import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const envPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '.env.local')
const envContent = fs.readFileSync(envPath, 'utf8')
envContent.split('\n').forEach(line => {
  if (line.trim() && !line.startsWith('#')) {
    const [key, ...values] = line.split('=')
    process.env[key.trim()] = values.join('=').trim()
  }
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function testCreateBooking() {
  const listingId = '33e5f231-6018-4e11-bfbd-5e251f7d3dff'
  const userId = '7a7b8e19-5d2f-4a0b-85cd-3a7e937d1d4e' // we need a valid userId from the profiles

  const { data: users } = await supabase.from('profiles').select('id').limit(2)
  if (!users || users.length < 2) {
    console.error('Not enough users to test')
    return
  }

  const testPayload = {
    listing_id: listingId,
    renter_id: users[0].id,
    owner_id: users[1].id,
    start_date: new Date().toISOString(),
    end_date: new Date(Date.now() + 86400000).toISOString(),
    total_price: 150,
    status: 'pending'
  }

  const { data, error } = await supabase.from('bookings').insert(testPayload).select().single()
  if (error) {
    console.error('Error creating booking:', error)
  } else {
    console.log('Successfully created booking:', data.id)
    // Clean it up
    await supabase.from('bookings').delete().eq('id', data.id)
    console.log('Cleaned up test booking.')
  }
}

testCreateBooking().catch(console.error)
