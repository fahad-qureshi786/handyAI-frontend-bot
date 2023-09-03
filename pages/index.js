import { useState, useEffect, useRef } from 'react';

// Import Tailwind CSS classes for the delete icon
import 'tailwindcss/tailwind.css';

export default function Home() {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isChatCleared, setChatCleared] = useState(false); // State to control chat clearing
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom of the chat messages when they change
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = () => {
        if (inputText.trim() === '') return;

        // Reset the chat cleared state to false
        setChatCleared(false);

        // Create a new user message and add it to the chat
        const userMessage = { text: inputText, sender: 'user' };
        setMessages([...messages, userMessage]);
        setInputText('');

        // Simulate a bot response (you can replace this with your own logic)
        setTimeout(() => {
            const botResponse = {
                text: 'Hi welcome! How can I help you?',
                sender: 'bot',
            };
            setMessages([...messages, userMessage, botResponse]);

            // Reset the textarea height after a slight delay
            adjustTextareaHeight();
        }, 10);
    };

    const isSendButtonDisabled = inputText.trim() === '';

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleInputChange = (e) => {
        setInputText(e.target.value);
        adjustTextareaHeight();
    };

    // Function to adjust the textarea height based on its content
    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height to auto
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to scrollHeight
        }
    };

    useEffect(() => {
        // Adjust the textarea height initially
        adjustTextareaHeight();
    }, []);

    const handleClearChat = () => {
        setMessages([]); // Clear the messages array
        setChatCleared(true); // Set the chat clearing state to true
    };

    return (
        <div className="flex flex-col h-screen relative">
            <div className="fixed top-4 right-4 z-10">
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
                id="messages"
                className="flex-1 mt-8 p-2 sm:p-6 justify-start flex flex-col space-y-4 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
            >
                {isChatCleared ? null : (
                    messages.map((message, index) => (
                        <div
                            key={index}
                            className={`chat-message ${
                                message.sender === 'user' ? 'self-end' : 'self-start'
                            }`}
                        >
                            <span
                                className={`px-4 py-2 rounded-lg inline-block ${
                                    message.sender === 'user'
                                        ? 'bg-blue-600 text-white w-full md:max-w-[52rem]'
                                        : 'bg-gray-300 text-gray-600'
                                }`}
                            >
                                {message.text}
                            </span>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="border-t-2 border-gray-200 mb-4 px-4 pt-4 sm:pt-2 relative">
                <div className="relative flex">
                    <textarea
                        ref={textareaRef}
                        rows="1" // Start with a single row
                        placeholder="Write your message!"
                        className="flex-grow resize-none pe-16 focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
                        value={inputText}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                    />
                    <div className="absolute bottom-0 right-0 pb-1 pe-1">
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
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
