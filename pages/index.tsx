import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { profile } from 'console'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })





function Nav()
{
  const session = useSession();
  const supabase = useSupabaseClient();


    function LoggedInNav()
    {

      return(<>
        <button onClick={()=>supabase.auth.signOut()} >Logout</button>
      
      </>
        
      )
    }

    function NotLoggedInNav()
    {

      return(
        <>
        <Link href="/">Login</Link>
        <div>You need to login to make a post</div>
        </> 
      )
    }


  return( <div className='Nav p-4 gap-y-6 flex rounded-full flex-row justify-center items-center w-fit bg-neutral-200' >
    { 
      !session? <NotLoggedInNav/>: <LoggedInNav/>}
     </div> )

}


function Feed()
{

  

return(
  <div className='Feed max-w-7xl '> some random content </div>
)

}



export default function Home()
{ 
  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const session = useSession()
  const supabase = useSupabaseClient()


  async function getUser()
  {
      const {data, error} = await supabase.from('profile').select("*");

  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-100">
      
      
       <Nav/>
      <Feed/>
      

    </main>
  )
}
