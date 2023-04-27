import Post from "@/components/Post";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";


export default function Update() {
    const router = useRouter();
    const { postid } = router.query;
    const supabase = useSupabaseClient();

    const [postData, setPostData] = useState<Database>([]);
    const [loading, setLoading] = useState(true);


    const [username,setUsername] = useState('');
    const []





    useEffect(() => {

        getPost();
    }, []);


    async function getPost() {
        try {
            setLoading(true)

            let { data: posts, error, status } = await supabase
                .from('posts')
                .select('*')
                .eq('id', postid)
                .single()

            if (error && status !== 406) {
                throw error
            }
            if (!error) {
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


    if(loading)
    {

    }


    return (
        <div className="bg-neutral-800 h-screen w-full flex flex-col justify-center items-middle">

                <div className="Post bg-neutral-900 p-4 w-full flex flex-col gap-2 rounded-xl border-solid border-2 border-transparent hover:border-red-500 hover:cursor-pointer">

                    <div className="flex flex-row gap-4">
                        <div className="text-blue-400">@{postData.username}</div>
                        <div>{postData.content}</div>
                    </div>

                    <div className="flex flex-row gap-4 text-sm justify-end">
                        {!!postData.edited && <div className="text-blue-400"> Edited </div>}
                        <div className="">Created at:{new Date(postData.created_at).toLocaleDateString('en')}</div>
                    </div>

                </div>
        </div>

    );
}