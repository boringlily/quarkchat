import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import {type Database } from '../utils/database.types'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState<Database>(() => createBrowserSupabaseClient<Database>())

  return ( 
  
  
  <QueryClientProvider client={queryClient}>  
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
    </QueryClientProvider>
  )
}
