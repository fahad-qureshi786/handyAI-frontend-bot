import React, {Fragment, useEffect, useState} from 'react'
import {useRouter} from "next/router";
import axios from "axios";
import {APIs} from "../const/APIs";
import {toast, ToastContainer} from "react-toastify";

export const SystemPrompt = () => {
    const router = useRouter();
    const [editable, setEditable] = useState(false)
    const [systemPrompt, setSystemPrompt] = useState({
        temperature: 0.7,
        systemPrompt: ''
    })
    const [errorState, setError] = useState('')

    async function fetchSystemPrompt() {
        await axios.get(APIs.ADMIN.GET_SYSTEM_PROMPT).then(res => {
            setSystemPrompt(res.data.response[0])
            console.log(res.data.response[0])
        }).catch(err => {
            setError("Error fetching system prompt" + err.message)
        })
    }

    useEffect(() => {
        fetchSystemPrompt()
    }, [])

    function enableEditable() {
        setEditable(true)
    }

    async function saveEditedPrompt() {
        await axios.put(APIs.ADMIN.UPDATE_SYSTEM_PROMPT, {
            id: systemPrompt._id,
            systemPrompt: systemPrompt.systemPrompt,
            temperature: systemPrompt.temperature
        }).then(res=> {
            toast.success('System Prompt Updated Successfully!', {
                position: toast.POSITION.TOP_RIGHT
            });
            setEditable(false)
        }).catch(err=> {
            toast.error('Error while updating System Prompt!', {
                position: toast.POSITION.TOP_RIGHT
            });
        })

    }

    return (
        <>
            <div className="container p-6">
                <div className="flex justify-between">
                    <ToastContainer />
                    <h2 className="text-2xl font-bold leading-7 text-[#057e7e] sm:truncate sm:text-3xl sm:tracking-tight">System
                        Prompt</h2>
                    <button onClick={enableEditable}
                            className="bg-[#057e7e] hover:bg-[#057e7e] text-white font-bold py-1 px-4 rounded inline-flex items-center">
                        Edit System Prompt
                    </button>
                </div>
                <textarea rows={20} onChange={(e) => setSystemPrompt({...systemPrompt, systemPrompt: e.target.value})}
                          value={systemPrompt.systemPrompt} disabled={!editable}
                          className={`text-black w-full  ${editable ? 'border-4' : 'border-2'} mt-3 p-2`}>
                </textarea>
                <div className="flex justify-between mt-4">
                    <h2 className="text-2xl font-bold leading-7 text-[#057e7e] sm:truncate sm:text-3xl sm:tracking-tight">Temperature</h2>
                </div>
                <input onChange={(e) => setSystemPrompt({...systemPrompt, temperature: e.target.value})} value={systemPrompt.temperature}  disabled={!editable}
                       className={`text-black w-full ${editable ? 'border-4' : 'border-2'} mt-3 p-2`} />
                <button style={{display: editable ? 'block' : 'none'}} onClick={saveEditedPrompt}
                        className="bg-[#057e7e] mt-4 hover:bg-[#057e7e] text-white font-bold py-1 px-4 rounded inline-flex items-center">
                    Save Updated
                </button>
            </div>
        </>
    )
}
