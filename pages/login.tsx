import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import {ThemeSupa} from "@supabase/auth-ui-shared"




export default function Login(){
const supabase = useSupabaseClient();




    return (<div className=' z-10 h-full w-full bg-black absolute flex justify-center items-center opacity-70 transition-all'> 
        <div className=' p-14 bg-neutral-900 rounded-lg shadow-md shadow-white'>
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" providers={[]} /> 
        </div>
      </div>)
}
