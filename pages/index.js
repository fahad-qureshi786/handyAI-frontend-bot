import {useState, useEffect, useRef} from 'react';

// Import Tailwind CSS classes for the delete icon
import 'tailwindcss/tailwind.css';
import axios from "axios";
import Head from "next/head";
import Image from 'next/image';
import Loader from "../components/Loader";

export default function Home() {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // New state for loading indicator
    const [inputText, setInputText] = useState({
        prompt: '',
    });
    const [isChatCleared, setChatCleared] = useState(false);
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);


    useEffect(() => {
        // Adjust the textarea height initially
        adjustTextareaHeight();
        // Scroll to the bottom of the chat messages when they change
        messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
    }, [messages]);

    const handleSendMessage = () => {
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
        // Send the user message to the API
        axios.post("http://localhost:5000/process-menu", inputText)
            .then(response => {
                console.log(response.data);
                // Reset the textarea height after a slight delay
                adjustTextareaHeight();
                // Extract the bot's response from the API response and format it
                const botResponseHtml = response.data["waiter_response"];
                const formattedBotResponse = {
                    text: botResponseHtml,
                    sender: 'bot',
                };
                // Set the formatted bot response directly in the state
                setMessages([...messages, userMessage, formattedBotResponse]);
                setIsLoading(false);
            })
            .catch(error => {
                // Handle errors here
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

    // Function to adjust the textarea height based on its content
    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height to auto
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to scrollHeight
        }
    };


    const handleClearChat = () => {
        setMessages([]); // Clear the messages array
        setChatCleared(true); // Set the chat clearing state to true
    };


    return (
        <>
            <Head>
                <title> Dice Food App</title>
            </Head>
            <div className="flex flex-col h-screen relative">
                <div className="fixed top-2 right-2 z-10">
                    {/* Delete button to clear the chat */}
                    <button
                        className="text-red-600 hover:text-red-800 transition duration-300"
                        onClick={handleClearChat}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div
                    style={{maxHeight: 'calc(100vh - 50px)', overflowY: 'auto'}}
                    id="messages"
                    className="flex-1 mt-8 bg p-2 sm:p-6 text-lg justify-start flex flex-col space-y-4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                >
                    {isChatCleared ? null : (
                        messages.map((message, index) => (
                            <div
                                key={index}
                                className={`chat-message ${
                                    message.sender === 'user' ? 'self-end' : 'self-start'
                                }`}
                            >
                                {message.sender === 'bot' ? (
                                    <div
                                        dangerouslySetInnerHTML={{__html: message.text}}
                                        className={`px-4 py-2 rounded-lg inline-block bg-gray-200 text-gray-900 md:max-w-[52rem]`}
                                    />
                                ) : (
                                    <span
                                        className={`px-4 py-2 rounded-lg inline-block bg-blue-600 text-white my-4 w-full md:max-w-[52rem]`}>
                                    {message.text}
                                </span>
                                )}
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef}/>
                </div>
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
                        <div className="absolute bottom-0 right-0  pb-2.5 pe-3">
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
