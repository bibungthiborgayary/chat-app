import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar-container">
      <div className="logo"><a href="./">ChatLinker</a></div>
      <button className="navbar-toggle" onClick={toggleNavbar}>
        ☰
      </button>
      <ul className={`navlinks ${isOpen ? 'open' : ''}`}>
        <li><a href="./">Home</a></li>
        <li><a href="#About">About</a></li>
        <li><a href="#Contact">Contact</a></li>
      </ul>
      <div className={`navbar-buttons ${isOpen ? 'open' : ''}`}>
        <button className='get-in-touch'>Get In Touch</button>
        <button className='start-chatting'>Start Chatting</button>
      </div>
    </nav>
  );
};

export default Navbar;
