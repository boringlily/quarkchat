import { useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import Post from "./Post";
import { useQuery } from "react-query";



export default function Feed() {
    const supabase = useSupabaseClient();

    const [postsList, setPostsList] = useState<Database>([]);


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
  

    const feedList = postsList.map((post: Database) => {
      return <Post key={post.id} content={post} />;
    });
  
    return (
      <div className="feed flex max-w-7xl w-full flex-column flex-wrap gap-4 ">
        {feedList}
      </div>
    );
  }