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
            <SystemPrompt />
        </>
    );
};

export default Dashboard;
