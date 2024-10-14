import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { encryptMessage, decryptMessage } from '../../utils/encryption';
import './ChatPage.css';

const socket = io('https://server-for-my-chat-app.onrender.com');

const ChatPage = () => {
    const chatBoxRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { sessionId, username } = location.state || {};
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [countdown, setCountdown] = useState(50);
    const timerRef = useRef(null);

    // Request notification permission when component mounts
    useEffect(() => {
        if (Notification.permission === 'default') {
            Notification.requestPermission()
                .then((permission) => {
                    if (permission === 'granted') {
                        console.log('Notification permission granted.');
                    }
                })
                .catch((err) => console.error('Notification permission error:', err));
        }
    }, []);

    useEffect(() => {
        if (sessionId) {
            console.log("Joining room with sessionId:", sessionId);
            socket.emit('joinRoom', sessionId);

            const handleMessage = ({ message, senderId }) => {
                const decryptedMessage = decryptMessage(message);
                console.log("Message received:", decryptedMessage, "from sender:", senderId);
                setMessages((prev) => [...prev, { message: decryptedMessage, sender: senderId }]);
                resetCountdown(); // Reset countdown on message receive
                showNotification(decryptedMessage); // Show notification for new message
            };

            const handleTyping = (senderId) => {
                if (senderId !== socket.id) {
                    setIsTyping(true);
                    setTimeout(() => setIsTyping(false), 2000);
                }
            };

            const handleRoomClosed = (id) => {
                console.log('Room closed due to user disconnect:', id);
                alert('The chat has been closed due to the other user disconnecting. You will be redirected to the homepage.');
                navigate('/');
            };

            socket.on('message', handleMessage);
            socket.on('typing', handleTyping);
            socket.on('roomClosed', handleRoomClosed);

            startCountdown();

            return () => {
                console.log("Cleaning up socket listeners for sessionId:", sessionId);
                socket.off('message', handleMessage);
                socket.off('typing', handleTyping);
                socket.off('roomClosed', handleRoomClosed);
                clearTimeout(timerRef.current);
            };
        } else {
            console.log("No sessionId found in location state");
            navigate('/');
        }
    }, [sessionId, navigate]);

    useEffect(() => {
        if (countdown === 0) {
            alert("No activity detected. Redirecting to homepage.");
            navigate('/');
        }
    }, [countdown, navigate]);

    useEffect(() => {
        // Function to scroll the chat box to the bottom
        const scrollToBottom = () => {
            if (chatBoxRef.current) {
                chatBoxRef.current.scroll({
                    top: chatBoxRef.current.scrollHeight,
                    behavior: 'smooth'
                });
            }
        };

        // Call scrollToBottom whenever messages change or a new message arrives
        scrollToBottom();
    }, [messages]);

    const startCountdown = () => {
        setCountdown(50);
        timerRef.current = setInterval(() => {
            setCountdown((prev) => {
                if (prev === 1) {
                    clearTimeout(timerRef.current);
                }
                return prev - 1;
            });
        }, 1000);
    };

    const resetCountdown = () => {
        clearTimeout(timerRef.current);
        startCountdown();
    };

    const sendMessage = () => {
        if (inputMessage.trim()) {
            const encryptedMessage = encryptMessage(inputMessage);
            console.log("Sending encrypted message:", encryptedMessage, "to room:", sessionId);
            socket.emit('message', { message: encryptedMessage }, sessionId);
            setMessages((prev) => [...prev, { message: inputMessage, sender: socket.id }]);
            setInputMessage('');
            socket.emit('typing', sessionId);
            resetCountdown(); // Reset countdown on message send
        } else {
            alert("Please enter a message before sending");
            console.log("No message entered");
        }
    };

    const handleInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const handleDisconnect = () => {
        console.log("User disconnecting");
        navigate('/');
    };

    // Function to show browser notifications for new messages
    const showNotification = (message) => {
        if (Notification.permission === 'granted') {
            new Notification('New message', {
                body: message,
                icon: '/path/to/icon.png' // Optional: Path to an icon for the notification
            });
        }
    };

    return (
        <div className="grid-container">
            <div className="first-component">
                <div className="user-id-show">
                    <h1>Username: {username}</h1>
                </div>
            </div>
            <div className="second-component">
                <div className="chat-box">
                    <div className="chat-box-header">
                        <h1>Connected to User</h1>
                        <div>
                            <button onClick={handleDisconnect}>Disconnect</button>
                        </div>
                    </div>
                    <div className="chat-box-body" ref={chatBoxRef}>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={msg.sender === socket.id ? "message-sent" : "message-received"}
                            >
                                <p>{msg.message}</p>
                            </div>
                        ))}
                        {isTyping && <div className="typing-indicator">The other user is typing...</div>}
                    </div>
                    <div className="chat-box-footer">
                        <input
                            type="text"
                            placeholder="Type a message"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={handleInputKeyPress}
                        />
                        <button onClick={sendMessage}>Send</button>
                        <p className="countdown">Redirecting in {countdown} seconds if inactive</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
