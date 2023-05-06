import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { AuthSession, Session } from "@supabase/supabase-js";




export default function NavBar({session}:any)
{
    const supabase = useSupabaseClient();
    // console.log("navbar->:", session)

    return(  
        <div className='Nav p-4 gap-6 flex flex-row items-center justify-between w-full bg-neutral-900 mb-6' >
        <div className="Logo text-xl font-sans font-bold p-4"> QuarkChat</div>
        {!!session && <button className='text-white p-2 hover:text-red-500' onClick={() => { supabase.auth.signOut() }}>Sign Out</button>}
        </div>
     )

}