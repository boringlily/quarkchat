import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useEffect } from "react";





export default function Post({ content }: Database) {
    const supabase = useSupabaseClient();

    useEffect(() => { }, [content]);
  
    content
    
    return (
      <Link href={{pathname:'/[postid]', query:{postid: content.id}}} className="Post bg-neutral-900 p-4 w-full flex flex-col gap-2 rounded-xl border-solid border-2 border-transparent hover:border-red-500 hover:cursor-pointer">
        
        <div className="flex flex-row gap-4">
            <div className="text-blue-400">@{content.username}</div>
            <div>{content.content}</div>
        </div>

        <div className="flex flex-row gap-4 text-sm justify-end">
            {!!content.edited && <div className="text-blue-400"> Edited </div>}
            <div className="">Created at:{new Date(content.created_at).toLocaleDateString('en')}</div>
        </div>
        
      </Link>
    );

}
  