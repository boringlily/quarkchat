import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import {ThemeSupa} from "@supabase/auth-ui-shared"
import Link from "next/link";
import { useRouter } from "next/router";




export default function Login(){
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();

  

  if(!session)
  {
    return (<div className=' z-10 h-full w-full bg-neutral-800 absolute flex justify-center items-center transition-all'> 
    <div className=' p-14 bg-neutral-900 rounded-lg '>
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" providers={[]} redirectTo="http://localhost:3000/"/> 
    </div>
  </div>)
  }

  if(!!session)
  {
    router.push('/')
  }

  return (<div className=' z-10 h-full w-full bg-neutral-800 absolute flex justify-center items-center text-white'> 
  <div className=' p-14 bg-neutral-900 rounded-lg '>
<div className="">You are logged in</div>
<Link className="hover:text-blue-500" href={'/'}> Return Home </Link>
  </div>
</div>)
}
