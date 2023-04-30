import { Database } from "@/utils/databaseTypes";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useEffect } from "react";
import { useQuery } from "react-query";
import Loader from "./Loader";



export default function Post({ post }: any) {
    const supabase = useSupabaseClient();

    const {data:postUsername, isLoading} = useQuery(
      {
        queryFn: async ()=>{

          const {data, error} = await supabase
          .from('profiles')
          .select('username')
          .eq('id', post.id)
          .single()
          return(data);
        }
      }
    )

    if(isLoading)
    {
      return(<Loader/>)
    }

    return (
      <Link href={{pathname:'/[postid]', query:{postid: post?.id}}} className="Post bg-neutral-900 p-4 w-full flex flex-col gap-2 rounded-xl border-solid border-2 border-transparent hover:border-red-500 hover:cursor-pointer">
        
        <div className="flex flex-row gap-4">
            <div className="text-blue-400">@{postUsername?.username}</div>
            <div>{post.content}</div>
        </div>

        <div className="flex flex-row gap-4 text-sm justify-end">
            {!!post.edited && <div className="text-blue-400"> Edited </div>}
            <div className="">Created at: {new Date(post.created_at).toLocaleDateString('en')}</div>
        </div>
        
      </Link>
    );

}
  