import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { profile } from "console";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Link from "next/link";
import autoAnimate from "@formkit/auto-animate";

const inter = Inter({ subsets: ["latin"] });

import type { Database } from "../utils/database.types";
import Post from "@/components/Post";
import Feed from "@/components/Feed";


function CreatePost() {
  const supabase = useSupabaseClient();

  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");

  const handleCreatePost = async () => {
    if (username.length && content.length) {
      const { data, error } = await supabase
        .from("posts")
        .insert([{ content: content, username: username, created_at: Date().slice(0, 24)}]);
    }
  };
  
  const handleCanclePost = () => {
    setUsername("");
    setContent("");
  };

  
    return (
      <div className="flex flex-col justify-start items-center gap-2 m-10">
        
        <div>Create a post</div>
        {/* <div className="min-w-fit overflow-show p-4 rounded-xl text-black resize-none bg-neutral-200 w-full" >@username </div> */}
          <input placeholder='@username' className='min-w-fit overflow-show p-2 rounded-xl text-black resize-none w-full' value={username} onChange={(e) => { setUsername(e.target.value)} }/>
          <textarea
            placeholder="What is on your mind?"
            name="Post"
            cols={30}
            rows={5}
            className="min-w-fit overflow-show p-2 rounded-xl text-black resize-none "
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
      

        {content.length > 0 && (
          <div className="flex flex-row text-white gap-4 justify-end">
            <button onClick={handleCanclePost}> Cancel </button>
            <button onClick={handleCreatePost}> Create</button>
          </div>
        )}
      </div>
    );
  }

export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();

  const [createPost, setCreatePost] = useState(false);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-start bg-neutral-800 text-white">
      <div className='Nav p-4 gap-6 flex flex-row items-center justify-between w-full bg-neutral-900 mb-6' >
      <div className="Logo text-xl font-sans font-bold p-4"> QuarkChat</div>
        {/* {!!session && <button className='text-white p-2 hover:text-red-500' onClick={() => { supabase.auth.signOut() }}>Sign Out</button>}
        {!session && <Link className='text-white p-2 hover:text-red-500' href="Login"> Login</Link>} */}
      </div>
      <CreatePost />
      <Feed />
    </main>
  );
}
