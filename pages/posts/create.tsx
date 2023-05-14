import Loader from "@/components/Loader";
import NavBar from "@/components/NavBar";
import { useSession, useSupabaseClient, Session } from "@supabase/auth-helpers-react"
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function CreatePostPage() {
  const supabase = useSupabaseClient();
  const [session, setSession] = useState<any>(null);

  const [preview, setPreview] = useState<boolean>(false);
  const [contentTitle, setContentTitle] = useState(``);
  const [contentBody, setContentBody] = useState(``);



  // Get user session object from localStorage
  const getSession = useQuery(
    {
      queryFn: async (postData) => {
        console.log(session);
        if (session != null) {
          return '';
        }
        const { data, error } = await supabase.auth.getSession();

        if (!error) {
          console.log("CreatePost -> auth query: ", data, 'error: ', error);
          setSession(data);
        }
      },
      refetchOnWindowFocus: false
    }
  );

  // Post the new post data to the backend API
  const postPost = useMutation(
    {
      mutationFn: async (content: string) => {
        if (content.length > 0) {
          const { data: sessionData } = await supabase.auth.getSession();
          const { data, error } = await supabase
            .from("posts")
            .insert([{ author_id: sessionData.session?.user.id, content: content, created_at: Date().slice(0, 24) }]);
          return data;
        }
      }
    });


  const handleCreatePost = () => {



  }


  if (getSession.isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-neutral-950 text-white">


        <Loader />

      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start bg-neutral-950 text-white">

      <NavBar session={session} />

      <div className="flex flex-col justify-center max-w-3xl p-10 bg-neutral-800 rounded-xl text-gray-800 font-mono w-full h-2/3">
        <div className='flex items-start my-2 w-full'>
          <div className='flex flex-row p-1 bg-white rounded-xl'>
            <button className={"p-2 px-4 rounded-xl border-solid border-2 border-transparent text-gray-900 hover:text-neutral-700" + (!preview ? ' bg-gray-300 ' : '')} onClick={() => { setPreview(false) }}>Edit</button>
            <button className={"p-2 px-4 rounded-xl border-solid border-2 border-transparent text-gray-900 hover:text-neutral-700" + (preview ? ' bg-gray-300 ' : '')} onClick={() => { setPreview(true) }}>Preview</button>
          </div>

        </div>

        {preview ? <div className=" bg-white rounded-xl p-4">
          <h1 className="font-semibold text-lg pb-4">{contentTitle}</h1>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{contentBody}</ReactMarkdown>

        </div> : <>

          <input type="text" placeholder="Enter a Title for your post" value={contentTitle} onChange={(e) => { setContentTitle(e.target.value) }} className="p-4 w-full rounded-t-xl text-lg font-semibold placeholder:text-neutral-400 outline-none" />
          <textarea name="" id="" cols={30} rows={30} placeholder="Type what you would like to say" value={contentBody} onChange={(e) => { setContentBody(e.target.value) }} className=" p-4 text-md  placeholder:text-neutral-400 rounded-b-xl outline-none resize-y " />
        </>}


      </div>


    </div>)
}
