
import {useState} from "react";
import {DashboardHeader} from "../../../components/DashboardHeader";
import {ChatMessage} from "../../../components/ChatMessage";

export default function Chats(){
    return (
        <>
            <DashboardHeader dashboard={false} chats={true} settings={false} />
            <div className="container flex flex-wrap p-6">
                <div className="w-full pe-3  sm:w-1/2 lg:w-1/3 xl:w-1/4">
                    <h2 className="text-2xl font-bold leading-7 text-[#057e7e] sm:truncate sm:text-3xl sm:tracking-tight">
                        Sessions
                    </h2>
                    <hr/>
                    {/*    Sessions Lists */}
                    <ol className="list-decimal list-inside">
                        <li className="p-4">1</li>
                        <li className="p-4">2</li>
                        <li className="p-4">2</li>
                        <li className="p-4">3</li>
                    </ol>

                </div>
                <div className="w-full sm:w-1/2 lg:w-2/3 xl:w-3/4">
                    <ChatMessage index={1} senderMessage={"User Request"} botReply={"Bot reply"} />
                </div>
            </div>
        </>
    )
}
