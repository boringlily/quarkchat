import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { profile } from 'console'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Link from 'next/link'
import autoAnimate from '@formkit/auto-animate'


const inter = Inter({ subsets: ['latin'] })

import type {Database} from '../utils/database.types'



function Nav() {
  const [showAuth, setShowAuth] = useState(false);
  const session = useSession();
  const supabase = useSupabaseClient();


  return (<div className='Nav p-4 gap-6 flex flex-row justify-end w-full bg-neutral-900 mb-6' >

    {!!session && <button className='text-white p-2' onClick={() => { supabase.auth.signOut() }}>Sign Out</button>}
    {!session && <button className='text-white p-2' onClick={() => { setShowAuth(true) }}>Login</button>}
    {showAuth &&
      <div className='p-4  w-screen h-screen grow flex flex-col justify-center items-center bg-black'>
        <div className='p-4 w-full h-full flex flex-col justify-center items-center'>
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]} />
          <button className='text-white p-2 text-lg' onClick={() => { setShowAuth(false) }}> Cancel</button>
        </div>
      </div>

    }
  </div>)

}


function CreatePost() {
  const session = useSession();
  const supabase = useSupabaseClient();

  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");


  const handleCreatePost = async () => {
    if(username.length && content.length )
    {
      const { data, error } = await supabase
      .from('simplepost')
      .insert([
        { content: content, username: username },
      ])

        handleCanclePost();

    }
  
  }

  const handleCanclePost = () => {
    setUsername("");
    setContent("");
  }

  if (!session) {
    return (
      <div className='p-4'>


        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]} />

      </div>
    )
  }
  else {


    return (
      <div className='flex flex-col justify-start gap-2 m-10'>

        <div>Create a post</div>
        <input placeholder='@username' className='min-w-fit overflow-show p-2 rounded-xl text-black resize-none ' value={username} onChange={(e) => { setUsername(e.target.value)} }/>
        <textarea placeholder='What would you like to say?' name="post" cols={30} rows={5} className='min-w-fit overflow-show p-2 rounded-xl text-black resize-none ' value={content} onChange={(e) => { setContent(e.target.value) }}></textarea>

        {content.length > 0 && <div className='flex flex-row text-white gap-4 justify-end'>
          <button onClick={handleCanclePost}> Cancel </button> 
          <button onClick={handleCreatePost}> Create</button>
        </div>}
      </div>

    )


  }




  return <></>

}



function Post({content}:Database) {
const supabase = useSupabaseClient();
  
  const handleDelete = async () => {

    const {error} =  await supabase.from('simplepost').delete().eq('post_id', content.post_id)

  }

useEffect(()=>{

}, content)


  return (
    <div className='Post bg-neutral-900 p-4 flex gap-4 rounded-xl border-solid border-2 border-transparent hover:border-red-500 hover:cursor-pointer' onClick={handleDelete}>
      <div className='text-blue-400'>@{content.username}</div>
      <div>{content.content}</div>
    </div>



  )
}



function Feed() {
  const supabase = useSupabaseClient();
  const [postData, setPostData] = useState<Database>([]);


  

  useEffect(()=>{



    const getAllData = async ()=>
    {
      const {data, error} = await supabase.from('simplepost').select("*")
  
      console.log(data)
      setPostData(data)
    }
    getAllData();

  }, [])



  const feedContent = postData.map((post:Database)=>{
  
    return(<Post key={post.post_id} content={post}/> )

  });

  return (
    <div className='feed max-w-7xl flex flex-column gap-4  w-20'>
      {feedContent}
    </div>
  )

}



export default function Home() {

  const session = useSession()
  const supabase = useSupabaseClient()

  const [createPost, setCreatePost] = useState(false);



  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-black text-white">


      <CreatePost />
      <Feed />


    </main>
  )
}
