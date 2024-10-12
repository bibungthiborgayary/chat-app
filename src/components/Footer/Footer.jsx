// Footer.jsx
import './Footer.css';  // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="logo">ChatLink</div>
      <div className="newsletter">
        <p>Subscribe to our newsletter</p>
        <div className="subscibe-input-button">
          <input
            type="email"
            placeholder="Input your email"
            className="input"
          />
          <button className="subscribe">Subscribe</button>
        </div>
      </div>
      <div className="footerLinks">
        <div className="sublink-footerlinks">
          <ul>
            <li className="first-li">Product</li>
            <li>Features</li>
            <li>Pricing</li>
          </ul>
        </div>
        <div className="sublink-footerlinks">
          <ul>
            <li className="first-li">Resources</li>
            <li>Blog</li>
            <li>User Guides</li>
            <li>Webinars</li>
          </ul>
        </div>
        <div className="sublink-footerlinks">
          <ul>
            <li className="first-li">Company</li>
            <li>About Us</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="sublink-footerlinks">
          <ul>
            <li className="first-li">Plans & Pricing</li>
            <li>Personal</li>
            <li>Start Up</li>
            <li>Organization</li>
          </ul>
        </div>
      </div>
      <div className="copyRight">
        <p>© 2024 Brand, Inc. • Privacy • Terms • Sitemap</p>
      </div>
    </footer>
  );
};

export default Footer;
