import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient, Session, useSession } from '@supabase/auth-helpers-react'
import { Database } from '../utils/databaseTypes.ts'
type Profiles = Database['public']['Tables']['profiles']['Row']

export default function Account() {
  const supabase = useSupabaseClient<Database>()
  const session = useSession();

  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<Profiles['username'] | null>(null)
  const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url'] | null>(null)

  return (
    <div className="AccountPage">
    </div>
  )
}