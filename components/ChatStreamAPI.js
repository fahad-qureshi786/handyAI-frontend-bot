import {useEffect, useRef, useState} from "react";

export default function ChatStreamAPI(){
    const [ws, setWs] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    // Reference to automatically scroll to the latest message
    const bottomRef = useRef(null);

    useEffect(() => {
        // Connect to WebSocket server
        const ws = new WebSocket('ws://localhost:8080'); // Ensure this matches your server's address
        setWs(ws);

        ws.onmessage = (event) => {
            // When a message is received, add it to the messages array
            setMessages((prevMessages) => [...prevMessages, { text: event.data, sender: 'bot' }]);
            scrollToBottom();
        };

        // Clean up on component unmount
        return () => ws.close();
    }, []);

    const sendMessage = () => {
        if (ws && input.trim()) {
            ws.send(input); // Send message to server
            setMessages([...messages, { text: input, sender: 'user' }]); // Add message to local state
            setInput(''); // Clear input field
            scrollToBottom();
        }
    };

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <>
            <div>
                <div style={{ height: '400px', overflowY: 'scroll' }}>
                    {messages.map((msg, index) => (
                        <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                            {msg.text}
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} />
                <button onClick={sendMessage}>Send</button>
            </div>
        </>
    )
}
