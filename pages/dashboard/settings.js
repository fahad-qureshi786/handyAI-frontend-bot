import Link from 'next/link'
import {DashboardHeader} from "../../components/DashboardHeader";
import React from "react";

export default function Settings() {
    return (
        <>
            <DashboardHeader dashboard={false} chats={false} settings={true} />
            <h4>
                <span className="text-center">
                <Link href={"/dashboard"}>In Progress Go Back</Link>
            </span>
            </h4>
        </>
    )
}
