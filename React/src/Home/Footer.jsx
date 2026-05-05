import "./Footer.css";
import { FaInstagram, FaWhatsapp, FaFacebookF, FaYoutube, FaGooglePlay, FaApple } from "react-icons/fa";

function Footer(){
  return(
    <footer className="footer">

      <div className="footerContainer">

        {/* BRAND */}
        <div className="footerCol brandCol">
          <h1 className="logo">FoodieHub</h1>
          <p>
            Bringing delicious food to your doorstep 🍕  
            Fresh ingredients • Fast delivery • Best taste guaranteed.
          </p>

          {/* SOCIAL ICONS */}
          <div className="socialIcons">
            <FaInstagram />
            <FaWhatsapp />
            <FaFacebookF />
            <FaYoutube />
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footerCol">
          <h2>Quick Links</h2>
          <ul>
            <li>Home</li>
            <li>Our Menu</li>
            <li>Cart</li>
            <li>My Orders</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* FOOD CATEGORIES */}
        <div className="footerCol">
          <h2>Popular Foods</h2>
          <ul>
            <li>Indian Thali</li>
            <li>Pizza & Burger</li>
            <li>Chinese</li>
            <li>Desserts</li>
            <li>Cold Drinks</li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div className="footerCol">
          <h2>Stay Updated</h2>
          <p>Subscribe for offers & new dishes 🔥</p>

          <div className="newsletter">
            <input type="email" placeholder="Enter your email"/>
            <button>Subscribe</button>
          </div>

          {/* APP DOWNLOAD */}
          <div className="appDownload">
            <div className="appBtn"><FaGooglePlay/> Play Store</div>
            <div className="appBtn"><FaApple/> App Store</div>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="footerBottom">
        <p>© 2026 FoodieHub. All Rights Reserved.</p>
        <p>Made with ❤️ in India</p>
      </div>

    </footer>
  )
}

export { Footer };