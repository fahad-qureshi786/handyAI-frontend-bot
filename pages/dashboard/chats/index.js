
import {useEffect, useState} from "react";
import {DashboardHeader} from "../../../components/DashboardHeader";
import {ChatMessage} from "../../../components/ChatMessage";
import {APIs} from "../../../const/APIs";
import axios from "axios";
import Link from "next/link";

export default function Chats(){
    const [sessions, setSessions] = useState([])
    const [errorState, setError] = useState('')
    const [loading, setLoading] = useState({
        chat: false,
        sessions: false
    })
    const [messages, setMessages] = useState([])
    const fetchSessions = async () => {
        setLoading({...loading, sessions: true})
        await axios.get(APIs.ADMIN.GET_UNIQUE_SESSIONS).then(res=> {
            setSessions(res.data.response)
            setLoading({...loading, sessions: false})
        }).catch(err=> {
            setLoading({...loading, sessions: false})
            setError("Error fetching sessions" + err.message)
        })
    }
    const getAllDBChat = async () => {
        setLoading({...loading, chat: true})
        await axios.get(APIs.ADMIN.GET_ALL_CONVERSATIONS).then(res=> {
            setMessages(res.data.response)
            setLoading({...loading, chat: false})
        }).catch(err=> {
            setLoading({...loading, chat: false})
            setError("Error fetching sessions" + err.message)
        })
    }


    useEffect(()=> {
        fetchSessions()
    }, [])
    useEffect(()=> {
        getAllDBChat()
    }, [])
    return (
        <>
            <DashboardHeader dashboard={false} chats={true} settings={false} />
            <div className="container flex flex-wrap p-6">
                <div className="w-full h-screen overflow-auto  pe-3  sm:w-1/2 lg:w-2/3 xl:w-2/4">
                    <h2 className="text-2xl font-bold leading-7 text-[#057e7e] sm:truncate sm:text-3xl sm:tracking-tight">
                        Sessions
                    </h2>
                    <hr/>
                    {/*    Sessions Lists */}
                    {
                        loading.sessions===true ? <>
                            <div role="status">
                                <svg aria-hidden="true"
                                     className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"/>
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </> :  <ol className="list-decimal list-inside">
                            {
                                sessions ? sessions.map(session => {
                                    return  <Link href={`/dashboard/chats/${session.sessionId}`}>
                                        <li className="p-4">{session.sessionId}</li>
                                    </Link>
                                }) : <span className={"text-amber-800"}>No Session Generated</span>
                            }
                        </ol>

                    }
                </div>
                <div className="w-full h-screen overflow-auto sm:w-1/2 lg:w-1/3 xl:w-2/4">
                    <h2 className="text-2xl font-bold leading-7 text-[#057e7e] sm:truncate sm:text-3xl sm:tracking-tight">
                        All Product Chat
                    </h2>
                    {
                        loading.chat===true ? <div role="status">
                                <svg aria-hidden="true"
                                     className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"/>
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div> : messages && messages.map(message=> {
                            return <ChatMessage dateTimeStamp={message.dateTimeStamp} index={1} senderMessage={message.userRequest} botReply={message.modelResponse} />
                        })
                    }
                </div>
            </div>
        </>
    )
}
