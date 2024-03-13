import {useState, useEffect, useRef} from 'react';

import 'tailwindcss/tailwind.css';
import axios from "axios";
import Head from "next/head";
import Loader from "../components/Loader";
import Link from "next/link";
import {AiOutlineLogin} from "react-icons/ai";
import {APIs} from "../const/APIs";

export default function Home() {
    const [messages, setMessages] = useState([]);
    const [sendTrigger, setSendTrigger] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // New state for loading indicator
    const [inputText, setInputText] = useState({
        prompt: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState(null);
    const hiddenFileInput = useRef(null);
    const [isChatCleared, setChatCleared] = useState(false);
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null);

    useEffect(() => {
        return () => {
            if (stream) {
                let tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, [stream]);


    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        if (fileUploaded) {
            setImage(fileUploaded);
            // Optionally, you can also use FileReader to read the file and display a preview
        }
    };

    // Camera
    const [capturedImage, setCapturedImage] = useState(null);

    // Ref to the hidden file input element
    const hiddenFileInputCamera = useRef(null);

    // Function to handle the manual click on hidden file input
    const handleClickCamera = () => {
        hiddenFileInputCamera.current.click();
    };

    // Function to handle the file capture
    const handleChangeCamera = event => {
        const file = event.target.files[0];
        if (file) {
            setCapturedImage(file);
            // You can use FileReader here as well if you want to display a preview
        }
    };


    const createNewSession = async () => {
        if (!sessionStorage.getItem("session")) {
            await axios.get(APIs.USERS.GENERATE_SESSION).then(res => {
                sessionStorage.setItem("session", JSON.stringify(res.data.response));
            }).catch(err => {
                console.log("Error session creation")
            })
        } else if (sessionStorage.getItem("chatHistory")) {
            setMessages(JSON.parse(sessionStorage.getItem("chatHistory")))
        }
    }

    useEffect(() => {
        createNewSession()
    }, []);

    useEffect(() => {
        adjustTextareaHeight();
        messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
    }, [messages]);
    useEffect(() => {
        if (messages.length > 0) {
            sessionStorage.setItem("chatHistory", JSON.stringify(messages));
        }
    }, [messages]);
    const handleSendMessage = async () => {
        // Reset the textarea height after a slight delay
        adjustTextareaHeight();
        if (inputText.prompt.trim() === '') return;
        // Reset the chat cleared state to false
        setChatCleared(false);

        // Create a new user message and add it to the chat
        const userMessage = {text: inputText.prompt, sender: 'user'};
        setMessages([...messages, userMessage]);
        setInputText({prompt: ''}); // Clear the input text
        setIsLoading(true);
        let formData = new FormData()
        formData.append("sessionId", JSON.parse(sessionStorage.getItem("session")))
        formData.append("userRequest", inputText.prompt)

        await axios.post(APIs.USERS.ASK_QUERY, {
            sessionId: JSON.parse(sessionStorage.getItem("session")),
            userRequest: inputText.prompt
        })
            .then(response => {
                adjustTextareaHeight();
                const botResponseHtml = response.data.response.modelResponse;
                const formattedBotResponse = {
                    text: botResponseHtml,
                    sender: 'bot',
                };
                setMessages([...messages, userMessage, formattedBotResponse]);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                console.error(error);
            });
    };
    const isSendButtonDisabled = inputText.prompt.trim() === '';

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleInputChange = (e) => {
        console.log(e.target.value)
        setInputText({prompt: e.target.value});
        adjustTextareaHeight();
    };

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height to auto
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to scrollHeight
        }
    };


    const handleClearChat = () => {
        setMessages([]);
        sessionStorage.setItem("chatHistory", JSON.stringify([]));
        setChatCleared(true);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    async function handleSendMessageViaShortcut(howDoIUseAStudFinder) {
        const userMessage = {text: howDoIUseAStudFinder, sender: 'user'};
        messages.push(userMessage)
        setIsLoading(true);
        let formData = new FormData()
        formData.append("sessionId", JSON.parse(sessionStorage.getItem("session")))
        formData.append("userRequest", howDoIUseAStudFinder)
        await axios.post(APIs.USERS.ASK_QUERY, {
            sessionId: JSON.parse(sessionStorage.getItem("session")),
            userRequest: howDoIUseAStudFinder
        }).then(response => {
                adjustTextareaHeight();
                const botResponseHtml = response.data.response.modelResponse;
                const formattedBotResponse = {
                    text: botResponseHtml,
                    sender: 'bot',
                };
                setMessages([...messages, formattedBotResponse]);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                console.error(error);
            });
    }

    return (
        <>
            <Head>
                <title> HandyAI</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className="flex flex-col h-screen relative">
                <div style={{backgroundColor: '#EEEEEE', height: '4rem'}}>
                    <div style={{marginTop: '0.2rem'}} className="fixed bg xl:top-2 lg:top-2 md:top-2 right-2 z-10">
                        <button
                            className="text-red-600 hover:text-red-800 transition duration-300"
                            onClick={handleClearChat}
                        >
                            <svg width="40" height="42" viewBox="0 0 40 42" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.77664 33.4618C13.1558 36.8174 16.3308 37.1875 16.3308 37.1875C18.9791 34.7034 20.4225 32.4844 22.0325 27.7314C22.0325 27.7314 15.7425 21.3255 14.4566 19.3095C14.4566 19.3095 11.5325 20.8845 9.2708 21.1015C7.56664 21.2651 4.65747 20.349 4.65747 20.349C4.6808 22.9023 6.3433 30.051 9.77664 33.4618Z"
                                    stroke="#808080" strokeWidth="2.08333" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                                <path
                                    d="M14.4568 19.3095C16.0426 18.368 18.9426 16.1997 20.2851 17.4282C21.3375 18.3293 22.3075 19.3314 23.1826 20.4216C24.0985 21.6764 22.8343 24.864 22.0326 27.7314"
                                    stroke="#808080" strokeWidth="2.08333" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                                <path
                                    d="M21.7126 18.767C24.5184 16.1245 35.3426 4.8125 35.3426 4.8125M5.8584 26.3427C9.38923 26.6201 11.7167 25.8072 11.7167 25.8072M9.0984 32.7136C14.2567 31.955 16.0426 29.2399 16.0426 29.2399"
                                    stroke="#808080" strokeWidth="2.08333" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <div className="text-center mt-5">
                        <h3 className={"text-lg text-[#057e7e]"}><b>Personal AI Handyman</b></h3>
                    </div>
                    <div className="fixed hide-mobile top-2 ms-2 cursor-pointer left-2 z-10">
                        <div className="relative">
                            <div className="cursor-pointer" onClick={toggleDropdown}>
                                <img src="/img.png" alt={"cursor"}/>
                            </div>
                            {isOpen && (
                                <div
                                    className="absolute left-1 mt-2 w-28 bg-white border border-gray-300 shadow-lg rounded-lg">
                                    <ul>
                                        <Link href={"/login"}>
                                            <li className="px-4 flex items-center space-x-2 justify-center py-2 hover:bg-gray-100 cursor-pointer">
                                                <div>
                                                    Login
                                                </div>
                                                <AiOutlineLogin/>
                                            </li>
                                        </Link>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
                <div
                    style={{maxHeight: 'calc(100vh - 50px)', overflowY: 'auto'}}
                    id="messages"
                    className="flex-1 mt-8 bg p-2 sm:p-6 text-lg justify-start flex flex-col space-y-4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                >
                    {/*Modal Send Image*/}
                    {showModal ? (
                        <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                    {/*content*/}
                                    <div
                                        className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                        {/*header*/}
                                        <div
                                            className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                            <h3 className="text-3l font-semibold">
                                                Upload/Select an Image
                                            </h3>
                                            <button
                                                className="p-1 ml-auto border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                onClick={() => setShowModal(false)}
                                            >
                                                <span
                                                    className=" text-dark text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                  X
                                                </span>
                                            </button>
                                        </div>
                                        {/*body*/}
                                        <div className="relative p-6 flex-auto">
                                            <div className="flex flex-wrap -mx-2">
                                                <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 px-2">
                                                    <img onClick={handleClick} src="/flat-color-icons_gallery.png"
                                                         alt="Choose Photo" className="mx-auto"/>
                                                    <h6 onClick={handleClick} className="text-center">Choose Photo</h6>
                                                    <input
                                                        type="file"
                                                        ref={hiddenFileInput}
                                                        onChange={handleChange}
                                                        style={{display: 'none'}} // Hide the file input
                                                        accept="image/*" // Accept images only
                                                    />
                                                </div>
                                                <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 px-2">
                                                    <img src="/ph_camera.png" alt="Capture Photo" className="mx-auto"/>
                                                    <h6 className="text-center">Capture Photo</h6>
                                                    <canvas ref={canvasRef} style={{display: 'none'}}></canvas>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                    ) : null}
                    {/*Close modal send image*/}
                    {isChatCleared ? null : (
                        messages.map((message, index) => (
                            <div
                                key={index}
                                className={`chat-message ${
                                    message.sender === 'user' ? 'self-end' : 'self-start'
                                }`}
                            >
                                {message.sender === 'bot' ? (
                                    <div style={{backgroundColor: '#007C7C', opacity: '70%', color: 'white'}}
                                         dangerouslySetInnerHTML={{__html: message.text}}
                                         className={`px-4 py-2 rounded-lg inline-block text-gray-900 md:max-w-[52rem]`}
                                    />
                                ) : (
                                    <span style={{backgroundColor: '#EEEEEE', color: 'black'}}
                                          className={`px-4 py-2 rounded-lg inline-block my-4 w-full md:max-w-[52rem]`}>
                                    {message.text}
                                </span>
                                )}
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef}/>
                </div>

                {
                    messages.length === 0 && <>
                        <div className="flex justify-center mb-3 mt-2">
                            <div className="row lg:flex md:flex-row sm:flex-row">
                                <div onClick={()=> {
                                    handleSendMessageViaShortcut("Who am I?")
                                }} style={{width: '430px', fontSize: '17px'}}
                                     className="w-500  ms-2 bg-[#E0E0E0] rounded-[10px] mb-3 overflow-hidden">
                                    <div className="px-6 py-4">
                                        <div className="justify-between cursor-pointer flex">
                                            <div className="font-bold mb-2 my-auto cursor-pointer">Who am I?</div>
                                            <div>
                                                <img className={"cursor-pointer"} src="/up.png" alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{width: '430px', fontSize: '17px'}}
                                     className="w-500  ms-2 bg-[#E0E0E0] rounded-[10px] mb-3 overflow-hidden">
                                    <div className="px-6 py-4">
                                        <div onClick={()=> {
                                            handleSendMessageViaShortcut("How do I use a stud finder?")
                                        }}
                                             className="justify-between cursor-pointer flex">
                                            <div className="font-bold mb-2 my-auto cursor-pointer">How do I use a stud
                                                finder?
                                            </div>
                                            <div>
                                                <img className={"cursor-pointer"} src="/up.png" alt=""/>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mb-3 mt-2">
                            <div className="row lg:flex md:flex-row sm:flex-row">
                                <div style={{width: '430px', fontSize: '17px'}}
                                     className="w-500  ms-2 bg-[#E0E0E0] rounded-[10px] mb-3 overflow-hidden">
                                    <div className="px-6 py-4">
                                        <div onClick={()=> {
                                            handleSendMessageViaShortcut("What type of paint should I use for room?")
                                        }}
                                             className="justify-between cursor-pointer flex">
                                            <div className="font-bold mb-2 my-auto cursor-pointer">What type of paint should I use for?
                                            </div>
                                            <div>
                                                <img className={"cursor-pointer"} src="/up.png" alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{width: '430px', fontSize: '17px'}}
                                     className="w-500  ms-2 bg-[#E0E0E0] rounded-[10px] mb-3 overflow-hidden">
                                    <div className="px-6 py-4">
                                        <div onClick={()=> {
                                            handleSendMessageViaShortcut("Why is my refrigerator not cooling?")
                                        }}
                                             className="justify-between cursor-pointer flex">
                                            <div className="font-bold mb-2 my-auto cursor-pointer">Why is my refrigerator not cooling?
                                            </div>
                                            <div>
                                                <img className={"cursor-pointer"} src="/up.png" alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }

                <div className="border-t-2 fixed border-gray-200 mb-4 px-4 pt-4 sm:pt-2 relative">
                    <div className="relative shadow-inner drop-shadow-sm  shadow-lg  flex my-4">
                    <textarea
                        ref={textareaRef}
                        rows="1" // Start with a single row
                        placeholder="Write your message!"
                        className="flex-grow resize-none pe-16 text-xl focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-4"
                        value={inputText.prompt}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                    />
                        {/*left button*/}
                        <div className="absolute my-3 left-2  pb-2.5 pe-3">
                            {/*right button*/}
                            <span data-modal-target="popup-modal" data-modal-toggle="popup-modal">
                                <span onClick={() => setShowModal(false)}>
                                      <svg width="30" height="30" viewBox="0 0 30 30" fill="none"
                                           xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6.25 26.25C5.5625 26.25 4.97417 26.0054 4.485 25.5163C3.99583 25.0271 3.75083 24.4383 3.75 23.75V6.25C3.75 5.5625 3.995 4.97417 4.485 4.485C4.975 3.99583 5.56333 3.75083 6.25 3.75H23.75C24.4375 3.75 25.0263 3.995 25.5163 4.485C26.0063 4.975 26.2508 5.56333 26.25 6.25V23.75C26.25 24.4375 26.0054 25.0263 25.5163 25.5163C25.0271 26.0063 24.4383 26.2508 23.75 26.25H6.25ZM6.25 23.75H23.75V6.25H6.25V23.75ZM7.5 21.25H22.5L17.8125 15L14.0625 20L11.25 16.25L7.5 21.25Z"
                                        fill="#808080"/>

                                </svg>
                                </span>
                            </span>


                        </div>
                        <div className="absolute bottom-0 right-0  pb-2.5 pe-3">
                            {/*left button*/}
                            <button
                                type="button"
                                className={`inline-flex items-center justify-center rounded-lg px-4 py-2 transition duration-500 ease-in-out text-white ${
                                    isSendButtonDisabled
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-blue-500 hover:bg-blue-400'
                                } focus:outline-none`}
                                onClick={handleSendMessage}
                                disabled={isSendButtonDisabled}
                            >
                                {isLoading ? (
                                    <Loader/>

                                ) : (
                                    <>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-6 w-6 ml-2 transform rotate-90"
                                        >
                                            <path
                                                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
                                            />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
