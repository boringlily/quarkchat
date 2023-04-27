import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useMutation } from "react-query";




export default function CreateProfile({session}){

    const supabase = useSupabaseClient();

    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    const {} = useMutation(
        {
            mutationFn: async ()=>{
               const {data, error}  = await supabase

            }
        }
    )

    const handleCreateProfile = async () =>
    {   
        if(username.length > 0){
            const {data, error} = await supabase.from('profiles').insert([{id:session.user.id, username:username, bio:bio, updated_at:Date().slice(0,24)}])
        }
    }

    return (

        <div className=" bg-neutral-800 flex flex-col gap-2 p-12 rounded-xl">
            <h1 className="text-lg"> Create Profile</h1>
           <label className="flex flex-col gap-1">
            Choose a Username:
           <input placeholder='Choose a Username' className='min-w-fit overflow-show p-2 rounded-xl text-black resize-none w-full ' value={username} onChange={(e) => { setUsername(e.target.value)} }/>
            </label> 
            
          <label className="flex flex-col gap-1"> 
            Add some info about yourself:
        <textarea
            placeholder="Adding a bio is optional"
            name="Post"
            cols={30}
            rows={5}
            className="min-w-fit overflow-show p-2 rounded-xl text-black resize-none "
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
            }}
          ></textarea>
</label>  
        <div className=" flex flex-row justify-end">
            <button className="outline-none p-3 m-2 bg-neutral-700 rounded-xl text-white border-solid border-2 border-transparent hover:text-blue-200 hover:border-blue-400" onClick={handleCreateProfile}> Create Profile </button>
        </div>

        </div>
    )
}