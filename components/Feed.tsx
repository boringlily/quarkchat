import { useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import Post from "./Post";



export default function Feed() {
    const supabase = useSupabaseClient();

    const [postData, setPostData] = useState<Database>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      
      getAllPosts();
    }, []);
  

    async function getAllPosts() {
        try {
          setLoading(true)
    
          let {data:posts, error, status } = await supabase
            .from('posts')
            .select('*')
    
          if (error && status !== 406) {
            throw error
          }
    
          if(!error) {
            setPostData(posts);
            console.log(posts);
          }
        } catch (error) {
          alert('Error loading posts')
          console.log(error)
        } finally {
            console.log(postData)
          setLoading(false)
        }
      }



    const feedContent = postData.map((post: Database) => {
      return <Post key={post.post_id} content={post} />;
    });
  
    return (
      <div className="feed flex max-w-7xl w-full flex-column flex-wrap gap-4 ">
        {feedContent}
      </div>
    );
  }