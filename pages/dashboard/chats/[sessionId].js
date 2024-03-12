
import {useEffect, useState} from "react";
import {DashboardHeader} from "../../../components/DashboardHeader";
import {ChatMessage} from "../../../components/ChatMessage";
import {APIs} from "../../../const/APIs";
import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/router";

export default function SessionChat(){
    const [sessions, setSessions] = useState([])
    const [messages, setMessages] = useState([])
    const [errorState, setError] = useState('')
    const router = useRouter();
    const { sessionId } = router.query;
    const fetchSessions = async () => {
        await axios.get(APIs.ADMIN.GET_UNIQUE_SESSIONS).then(res=> {
            setSessions(res.data.response)
        }).catch(err=> {
            setError("Error fetching sessions" + err.message)
        })
    }
    const getSessionMessages = async () => {
        await axios.post(APIs.ADMIN.FILTER_CONVERSATIONS_USING_SESSION_ID, {
            sessionId: sessionId
        }).then(res=> {
            console.log(res.data.response)
            setMessages(res.data.response)
        }).catch(err=> {
            setError("Error fetching sessions" + err.message)
        })
    }

    useEffect(()=> {
        fetchSessions()
    }, [])
    useEffect(()=> {
        getSessionMessages()
    }, [messages])
    return (
        <>
            <DashboardHeader dashboard={false} chats={true} settings={false} />
            <div className="container flex flex-wrap p-6">
                <div className="w-full  pe-3  sm:w-1/2 lg:w-2/3 xl:w-2/4">
                    <h2 className="text-2xl font-bold leading-7 text-[#057e7e] sm:truncate sm:text-3xl sm:tracking-tight">
                        Sessions
                    </h2>
                    <hr/>
                    {/*    Sessions Lists */}
                    <ol className="list-decimal h-screen overflow-auto list-inside">
                        {
                            sessions ? sessions.map(session => {
                                return  <Link href={`/dashboard/chats/${session.sessionId}`}>
                                    <li className={`p-4 ${sessionId===session.sessionId && 'bg-[#057e7e] text-white rounded'}`}>{session.sessionId}</li>
                                </Link>
                            }) : <span className={"text-amber-800"}>No Session Generated</span>
                        }
                    </ol>

                </div>
                <div className="w-full h-screen overflow-auto  sm:w-1/2 lg:w-1/3 xl:w-2/4">
                    <h2 className="text-2xl font-bold leading-7 text-[#057e7e] sm:truncate sm:text-3xl sm:tracking-tight">
                        Chat Session: {sessionId}
                    </h2>
                    {
                        messages && messages.map(message=> {
                            return <ChatMessage dateTimeStamp={message.dateTimeStamp} index={1} senderMessage={message.userRequest} botReply={message.modelResponse} />
                        })
                    }
                </div>
            </div>
        </>
    )
}
