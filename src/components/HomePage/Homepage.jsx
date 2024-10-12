import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Homepage.css'
const Homepage = () => {

    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setUserId(event.target.value);
    };

    const handleStartChat = () => {
        if (userId) {
          navigate('/chat', { state : { username: userId } });
        } else {
          alert("Please enter your User ID before starting the chat.");
        }
      };


  return (
    <section className="homepage-container">
        <h1 className="big-heading">Chat With Someone!!</h1>
        <label className='label-input' htmlFor="userId">Enter your Username to begin Chatting</label>
        <input 
        className='input-field-homepage'
        type="text"
        id="userId"
        value={userId}
        onChange={handleInputChange}
        placeholder='Enter your Username' 
        />
        <div className="button-homepage">
            <button className='start-chatting-homepage' onClick={handleStartChat}>
                    Start Chatting
                </button>
            </div>
    </section>
  )
}
export default Homepage