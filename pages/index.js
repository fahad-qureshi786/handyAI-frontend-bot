import {useState, useEffect, useRef} from 'react';

// Import Tailwind CSS classes for the delete icon
import 'tailwindcss/tailwind.css';
import axios from "axios";

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
                const botResponseHtml = response.data["waiter Response"];
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
                                <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-100" cx="12" cy="12" r="10" stroke="blue"
                                            strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.86 3.168 8.022l2-2.732zm12 2.732A7.962 7.962 0 0120 12h4c0 6.627-5.373 12-12 12v-4zm-2-5.291l2-2.732A7.962 7.962 0 0120 12h-4c0-3.042-1.135-5.86-3.168-8.022z"></path>
                                </svg>

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
    );
}
