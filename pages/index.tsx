import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Link from "next/link";
import autoAnimate from "@formkit/auto-animate";

import type { Database } from "../utils/database.types";
import Post from "@/components/Post";
import Feed from "@/components/Feed";
import TextArea from "@/components/TextArea";
import { useQuery } from "react-query";
import Loader from "@/components/Loader";
import CreateProfile from "@/components/CreateProfile";


function CreatePost({ session, userProfile }) {
  const supabase = useSupabaseClient();
  const [content, setContent] = useState("");

  const handleCreatePost = async () => {
    if (content.length > 0) {
      const { data, error } = await supabase
        .from("posts")
        .insert([{ author: session.user.id, content: content, created_at: Date().slice(0, 24) }]);

      if (!error) {

      }
    }
  };

  const handleCanclePost = () => {
    setContent("");
  };

  return (
    <div className="flex flex-col justify-start items-left gap-2 m-4 p-4 bg-neutral-600 w-full rounded-2xl">


      <div className="flex flex-row justify-center items-center ">
        <div className="min-w-fit overflow-show py-2 resize-none w-full text-blue-400 font-sans font-semibold text-center" >@{userProfile?.username}</div>
        <textarea
          placeholder="What is on your mind?"
          name="Post"
          cols={30}
          rows={1}
          className="min-w-fit overflow-show p-3 rounded-2xl text-black resize-none w-full"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
      </div>
      {/* <TextArea/> */}

      {content.length > 0 && (
        <div className="flex flex-row text-white gap-4 justify-end">
          <button onClick={handleCanclePost}> Clear </button>
          <button onClick={handleCreatePost}> Post </button>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [createPost, setCreatePost] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  const {isLoading} = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      if (!!session) {
        const {data} = await supabase.from('profiles').select('*').eq('id', session?.user.id).single();
        console.log(data);
        setUserProfile(data);
        return data
      }
      return new Error;

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
      <div className='Nav p-4 gap-6 flex flex-row items-center justify-between w-full bg-neutral-900 mb-6' >
        <div className="Logo text-xl font-sans font-bold p-4"> QuarkChat</div>
        {!!session && <button className='text-white p-2 hover:text-red-500' onClick={() => { supabase.auth.signOut() }}>Sign Out</button>}
      </div>

      <div className="Content flex flex-col max-w-5xl ">

        {userProfile?.length == 0 ? <CreateProfile session={session} /> : <CreatePost session={session} userProfile={userProfile} />}


        <Feed />


      </div>



    </main>
  );
}
