import Image from "next/image";
import { Inter } from "next/font/google";
import { type Session, useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Link from "next/link";
import autoAnimate from "@formkit/auto-animate";

import type { Database } from "../utils/databaseTypes.ts";
import Post from "@/components/Post";
import Feed from "@/components/Feed";
import TextArea from "@/components/TextArea";
import { useQueries, useQuery } from "react-query";
import Loader from "@/components/Loader";
import CreateProfile from "@/components/CreateProfile";
import NavBar from "@/components/NavBar.tsx";


export default function Home() {

  const supabase = useSupabaseClient<Database>();
  const [createPost, setCreatePost] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [session, setSession] = useState<any>(null);

  const getSession = useQuery(
    {
      queryFn: async (postData) => {
        console.log(session);
        if (session != null) {
          return '';
        }
        const { data, error } = await supabase.auth.getSession();

        if (!error) {
          console.log("CreatePost -> auth query: ", data, 'error: ', error);
          setSession(data);
        }
      },
      refetchOnWindowFocus: false
    }
  );

  const {data, isLoading} = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
        const {data:sessionData} = await supabase.auth.getSession();
        const {data:userProfile} = await supabase.from('profiles').select('*').eq('id', sessionData.session?.user.id).limit(1).single();
        // console.log(userProfile);
        setUserProfile(userProfile);
        return {userProfile, sessionData}
    }
  }
  )

  // If User is not logged in, show sign-in screen
  if (!session) {
    return <div className="flex min-h-screen w-full flex-col items-center justify-center
    bg-neutral-800 text-white">
      <div className="p-4 m-2 w-fit">
        The application is currently in Alpha stage,
        you must sign in to proceed.
      </div>

      <div className=' p-14 bg-neutral-900 rounded-lg'>
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" providers={[]} redirectTo="http://localhost:3000/" />
      </div>
    </div>
  }

  if (!!session && isLoading) {
    return <Loader />
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-start bg-neutral-950 text-white">
     <NavBar session={session}/>

      <div className="Content flex flex-col max-w-5xl ">

        {userProfile?.length == 0 ? <CreateProfile session={session} /> : <div className="Feed Nav"> <Link href={'/posts/create'}>Create Post </Link> </div>}


        <Feed />


      </div>



    </main>
  );
}
