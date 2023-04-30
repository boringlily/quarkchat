import { useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import Post from "./Post";
import { useQuery } from "react-query";
import { Database } from '@/utils/databaseTypes.ts'
import Loader from "./Loader";





export default function Feed() {
    const supabase = useSupabaseClient();

    const [postsList, setPostsList] = useState<any>();


    const {isLoading} = useQuery(
      {
        queryFn: async()=>{
          const {data, error, status } = await supabase
            .from('posts')
            .select('*')

          if(!error)
          {
            setPostsList(data);
          }
        }
      }
    )
      

    if( isLoading)
    {
      return <Loader/>
    }



    const feedList = postsList.map((post: any) => {
      return <Post key={post.id} post={post} />;
    });
  
    return (
      <div className="feed flex max-w-7xl mt-4 w-full flex-column flex-wrap gap-4 ">
        {feedList}
      </div>
    );
  }