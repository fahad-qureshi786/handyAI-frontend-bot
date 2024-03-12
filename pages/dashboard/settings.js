import Link from 'next/link'
import {DashboardHeader} from "../../components/DashboardHeader";
import React, {useEffect, useState} from "react";
import {SystemPrompt} from "../../components/SystemPrompt";
import axios from "axios";
import {APIs} from "../../const/APIs";

export default function Settings() {

    return (
        <>
            <DashboardHeader dashboard={false} chats={false} settings={true}/>
            <SystemPrompt/>
        </>
    )
}
