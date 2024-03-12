import {Fragment, useState} from 'react'
import {useRouter} from "next/router";

export const SystemPrompt = () => {
    const router = useRouter();
    const [globalSystemPrompt, setSystemPrompt] = useState({
        systemPrompt: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab dolorem dolores harum inventore, iure, magni minus natus nostrum quod recusandae repudiandae sit veniam? Aliquid, cumque debitis doloremque fugiat vitae voluptatibus.',
        temperature: 0.7,
    })
    const [editable, setEditable] = useState(false)


    function enableEditable() {
        setEditable(true)
    }

    function saveEditedPrompt() {
        setEditable(false)
    }

    return (
        <>
            <div className="container p-6">
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold leading-7 text-[#057e7e] sm:truncate sm:text-3xl sm:tracking-tight">System Prompt</h2>
                    <button onClick={enableEditable} className="bg-[#057e7e] hover:bg-[#057e7e] text-white font-bold py-1 px-4 rounded inline-flex items-center">
                        Edit System Prompt
                    </button>
                </div>
                <p contentEditable={editable} className={`text-black ${editable ? 'border-4': 'border-2'} mt-3 p-2`}>
                    {globalSystemPrompt.systemPrompt}
                </p>
                <div className="flex justify-between mt-4">
                    <h2 className="text-2xl font-bold leading-7 text-[#057e7e] sm:truncate sm:text-3xl sm:tracking-tight">Temperature</h2>
                </div>
                <p contentEditable={editable} className={`text-black ${editable ? 'border-4': 'border-2'} mt-3 p-2`}>
                    {globalSystemPrompt.temperature}
                </p>
                <button style={{display: editable? 'block': 'none'}} onClick={saveEditedPrompt} className="bg-[#057e7e] mt-4 hover:bg-[#057e7e] text-white font-bold py-1 px-4 rounded inline-flex items-center">
                    Save Updated
                </button>
            </div>
        </>
    )
}
