import React, {useState} from 'react';
import {useRouter} from 'next/router'
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {Avatar} from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const router = useRouter();

    function handleClick(event) {
        if (userData.email===process.env.ADMIN_EMAIL || userData.password===process.env.ADMIN_PASSWORD) {
            event.preventDefault();
            sessionStorage.setItem("login", JSON.stringify({
                username: 'admin@handyAI.com'
            }))
            router.push("/dashboard");
            toast.success('Login Successfully !', {
                position: toast.POSITION.TOP_RIGHT
            });
        }else {
            toast.error('Please enter valid credentials!', {
                position: toast.POSITION.TOP_RIGHT
            });
            event.preventDefault();
        }
    }

    return (
        <>
            <>
                <div className="relative min-h-screen flex ">
                    <div
                        className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
                        <div
                            className="sm:w-1/2 xl:w-full h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative"
                            style={{
                                backgroundColor: '#057e7e'
                            }}
                        >
                            <div
                                className="absolute opacity-75 inset-0 z-0"/>
                            <div className="w-full  max-w-lg z-10">
                                <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">
                                    Welcome to HandyAI
                                </div>
                                <div className="sm:text-sm xl:text-md text-gray-200 font-normal">
                                    {"At The Upkeep Club, we understand the importance of maintaining a well-kept home. That's why we offer a wide range of services, from basic repairs to full-scale renovations, all tailored to meet your specific requirements. Whether you need plumbing fixed, electrical work, painting, carpentry, or even complex installations, our expert handymen are equipped with the skills and tools to get the job done right."}
                                </div>
                            </div>
                            {/*-remove custom style*/}
                            <ul className="circles">
                                <li/>
                                <li/>
                                <li/>
                                <li/>
                                <li/>
                                <li/>
                                <li/>
                                <li/>
                                <li/>
                                <li/>
                            </ul>
                        </div>
                        <div
                            className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
                            <div className="max-w-md w-full space-y-8">
                                <div className="text-center">
                                    <Avatar
                                        size="lg"
                                        alt="avatar"
                                        src="/admin.png"
                                        className="border border-green-500 shadow-xl shadow-green-900/20 ring-4 ring-green-500/30"
                                    />
                                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                                        Welcom Back!
                                    </h2>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Please sign in to your account
                                    </p>
                                </div>
                                <form className="mt-8 space-y-4" action="#" method="POST">
                                    <input type="hidden" name="remember" defaultValue="true"/>
                                    <div className="relative">
                                        <label className="text-sm font-bold text-gray-700 tracking-wide">
                                            Email
                                        </label>
                                        <input
                                            style={{"width": "100%"}}
                                            value={userData.email}
                                            onChange={(e) => setUserData({...userData, email: e.target.value})}
                                            type="text"
                                            placeholder="email"
                                            className="py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                                        />
                                    </div>
                                    <div className="mt-4 content-center">
                                        <label className=" text-sm font-bold text-gray-700 tracking-wide">
                                            Password
                                        </label>
                                        <div className="relative w-full">
                                            <input
                                                value={userData.password}
                                                onChange={(e) => setUserData({...userData, password: e.target.value})}
                                                style={{"width": "100%"}}
                                                type={passwordVisible ? 'text' : 'password'}
                                                placeholder="Password"
                                                className="py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                                            />
                                            <span
                                                onClick={togglePasswordVisibility}
                                                className="absolute top-2 right-2 cursor-pointer"
                                            >
        {passwordVisible ? (
            <div className={"mt-1"}>
           <AiOutlineEye/>
            </div>
        ) : (
            <div className={"mt-1"}>
            <AiOutlineEyeInvisible/>
            </div>
        )}
      </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                id="remember_me"
                                                name="remember_me"
                                                type="checkbox"
                                                className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                                            />
                                            <label
                                                htmlFor="remember_me"
                                                className="ml-2 block text-sm text-gray-900"
                                            >
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full text-white flex justify-center bg-[#057e7e] hover:text-black mt-8 py-4 rounded-xl text-black hover:bg-amber-600 hover:shadow-xl transition ease-in duration-300"
                                            onClick={handleClick}
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </>

        </>
    );
};

export default Login;
