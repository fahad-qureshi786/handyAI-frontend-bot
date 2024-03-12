import Link from 'next/link'
import {DashboardHeader} from "../../components/DashboardHeader";
import React from "react";
import {SystemPrompt} from "../../components/SystemPrompt";

export default function Settings() {
    return (
        <>
            <DashboardHeader dashboard={false} chats={false} settings={true}/>
            <SystemPrompt/>
        </>
    )
}
