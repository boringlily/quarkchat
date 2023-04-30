import { useSupabaseClient, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import type { Database } from "../utils/databaseTypes.ts";
type ProfileType = Database['public']['Tables']['profiles']['Row'];


type CreatePostType = {
session: Session | null;
userProfile: ProfileType;
}


export default function CreatePost({session, userProfile}:CreatePostType) {
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
      <div className="flex flex-col justify-start items-left gap-2 p-4 bg-neutral-600 w-full rounded-2xl">
  
  
        <div className="flex flex-row justify-center items-center ">
          <div className="min-w-fit p-2 resize-none text-blue-400 font-sans font-semibold" >@{userProfile?.username}</div>
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
  