import Loader from "@/components/Loader";
import Post from "@/components/Post";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import {Database} from '@/utils/databaseTypes.ts'


export default function Update() {
    const session = useSession();
    const router = useRouter();
    const { postid } = router.query;
    const supabase = useSupabaseClient();

    const [postData, setPostData] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [edit,setEdit] = useState(false);
    const [content,setContent]=useState('')


    async function getPost() {
        try {
            setLoading(true)

            let { data: post, error, status } = await supabase
                .from('posts')
                .select('*')
                .eq('id', postid)
                .single()

            if (error && status !== 406) {
                throw error
            }
            if (!error) {
                setPostData(post);
                setContent(post?.content);
                console.log(post);
            }
        } catch (error) {
            console.log(error)
        } finally {
            console.log(postData)
            setLoading(false)
        }
    }



    if(loading)
    {
        <Loader/>
    }


    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-start bg-neutral-950 text-white">
      <div className='Nav p-4 gap-6 flex flex-row items-center justify-between w-full bg-neutral-900 mb-6' >
        <div className="Logo text-xl font-sans font-bold p-4"> QuarkChat</div>
        {!!session && <button className='text-white p-2 hover:text-red-500' onClick={() => { supabase.auth.signOut() }}>Sign Out</button>}
      </div>

      <div className="Content flex flex-col max-w-5xl ">
      
      {edit?<div className="flex"><textarea
          placeholder="What is on your mind?"
          name="Post"
          cols={30}
          rows={1}
          className="min-w-fit overflow-show p-3 rounded-2xl text-black resize-none w-full"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea> <button className="p-2 hover:text-green-600">Update</button> </div>:<Post content={postData}/>}

      {edit?<button className="p-2 hover:text-red-600" onClick={()=>{setEdit(false)}}>
        Cancel
      </button >:<button className="p-2 hover:text-red-600"  onClick={()=>{setEdit(true)}}>
        Edit
      </button>}

      
      </div>

    </main>




        // <div className="bg-neutral-800 h-screen w-full flex flex-col justify-center items-middle">

        //         <div className="Post bg-neutral-900 p-4 w-full flex flex-col gap-2 rounded-xl border-solid border-2 border-transparent hover:border-red-500 hover:cursor-pointer">

        //             <div className="flex flex-row gap-4">
        //                 <div className="text-blue-400">@{postData.username}</div>
        //                 <div>{postData.content}</div>
        //             </div>

        //             <div className="flex flex-row gap-4 text-sm justify-end">
        //                 {!!postData.edited && <div className="text-blue-400"> Edited </div>}
        //                 <div className="">Created at:{new Date(postData.created_at).toLocaleDateString('en')}</div>
        //             </div>

        //         </div>
        // </div>

    );
}