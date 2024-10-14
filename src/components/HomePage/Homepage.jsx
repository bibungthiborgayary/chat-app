import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import './Homepage.css';
import image from '../../assets/images/chatlinker-high-resolution-logo-transparent.svg';

const socket = io('https://server-for-my-chat-app.onrender.com');

const Homepage = () => {
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('connectToRoom', (sessionId) => {
            console.log("Connected to room with sessionId:", sessionId);
            navigate('/chat', { state: { sessionId, username: userId } });
        });
        return () => {
            socket.off('connectToRoom');
        };
    }, [userId, navigate]);

    const handleInputChange = (event) => {
        setUserId(event.target.value);
    };

    const handleStartChat = () => {
        if (userId) {
            console.log("Start Chatting button clicked with username:", userId);
            socket.emit('joinQueue', { username: userId });
        } else {
            alert("Please enter your Username before starting the chat.");
            console.log("No username entered");
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleStartChat();
        }
    };

    return (
        <section className="homepage-container">
            <img src={image} alt="logo" />
            <h1 className="big-heading">Chat With Someone!!</h1>
            <label className='label-input' htmlFor="userId">Enter your Username to begin Chatting</label>
            <input
                className='input-field-homepage'
                type="text"
                id="userId"
                value={userId}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress} // Added Enter key event listener
                placeholder='Enter your Username'
            />
            <div className="button-homepage">
                <button className='start-chatting-homepage' onClick={handleStartChat}>
                    Start Chatting
                </button>
            </div>
        </section>
    );
}

export default Homepage;
