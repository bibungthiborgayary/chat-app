import { useLocation } from 'react-router-dom'
import './ChatPage.css'

const ChatPage = () => {
    const location = useLocation();
    const username = location.state?.username || "{Default Username}";
    const handleDisconnect = () => {
        window.location.href = '/'; // Forces a full page reload to HomePage
      };
      
  return (
    <div className='grid-container'>
        <div className="first-component">
            <div className="user-id-show">
                <h1>Username: { username ? username : "Lion"} </h1>
            </div>
        </div>
        <div className="second-component">
            <div className="chat-box">
                <div className="chat-box-header">
                    <h1>Connected to Username: Panda</h1>
                    <div>
                        <button onClick={handleDisconnect}>Disconnect</button>
                    </div>
                </div>
                <div className="chat-box-body">
                    <div className="chat-message">
                        <div className="message-sent">
                            <p>Hello</p>
                        </div>
                        <div className="message-received">
                            <p>Hi</p>
                        </div>
                        <div className="message-sent">
                            <p>Whats up?</p>
                        </div>
                        <div className="message-received">
                            <p>Nothing much, What about you?</p>
                        </div>
                        <div className="message-sent">
                            <p>Same here, what are you doing?</p>
                        </div>
                        <div className="message-received">
                            <p>I was just watching some tv shows</p>
                        </div>
                        <div className="message-sent">
                            <p>Which one?</p>
                        </div>
                        <div className="message-received">
                            <p>The Big Bang Theory, Would you like to watch it Together?</p>
                        </div>
                        <div className="message-sent">
                            <p>Hello</p>
                        </div>
                        <div className="message-received">
                            <p>Hi</p>
                        </div>
                        <div className="message-sent">
                            <p>Whats up?</p>
                        </div>
                        <div className="message-received">
                            <p>Nothing much, What about you?</p>
                        </div>
                        <div className="message-sent">
                            <p>Same here, what are you doing?</p>
                        </div>
                        <div className="message-received">
                            <p>I was just watching some tv shows</p>
                        </div>
                        <div className="message-sent">
                            <p>Which one?</p>
                        </div>
                        <div className="message-received">
                            <p>The Big Bang Theory, Would you like to watch it Together?</p>
                        </div>
                    </div>
                </div>
                <div className="chat-box-footer">
                    <input type="text" placeholder='Type a message' />
                    <button>Send</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatPage