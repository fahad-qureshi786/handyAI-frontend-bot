import React, {useEffect, useState} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {DashboardHeader} from "../../components/DashboardHeader";
import {SystemPrompt} from "../../components/SystemPrompt";

const Dashboard = () => {

    return (
        <>
            {/* component */}
            <ToastContainer/>

            {/*  Showing options to client*/}
            <DashboardHeader dashboard={true} chats={false} settings={false} />

            <div className="h-full justify-center flex">
                <img src="/in-progress.png" alt="In Progress"/>
            </div>
        </>
    );
};

export default Dashboard;
