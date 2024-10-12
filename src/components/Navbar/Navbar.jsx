import './Navbar.css'
const Navbar = () => {
  return (
    <nav className="navbar-container">
        <div className="logo"><a href="./">ChatLinker</a></div>
        <ul className="navlinks">
            <li><a href="./">Home</a></li>
            <li><a href="#About">About</a></li>
            <li><a href="#Contact">Contact</a></li>
        </ul>
        <div className="navbar-buttons">
            <button className='get-in-touch'>Get In Touch</button>
            <button className='start-chatting'>Start Chatting</button>
        </div>
    </nav>
  )
}

export default Navbar