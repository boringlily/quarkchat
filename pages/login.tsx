import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import {ThemeSupa} from "@supabase/auth-ui-shared"
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";




export default function Login(){
  const supabase = useSupabaseClient();
  const router = useRouter();

  const [session, setSession] = useState<any>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const getSession = useQuery(
    {
      queryFn: async ()=> {
        const { data, error } = await supabase.auth.getSession();

        if (!error) {
          console.log("CreatePost -> auth query: ", data, 'error: ', error);
          setSession(data.session);
          return(data.session);
        }
      },
      refetchOnWindowFocus: false
    }
  );


  if(getSession.data)
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
