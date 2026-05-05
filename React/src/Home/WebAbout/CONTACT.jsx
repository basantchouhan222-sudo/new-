import React from "react";
import { WebHeader } from "../WebHeader";
import { Footer } from "../Footer";
import "./CONTACT.css";

function CONTACT() {
  return (
    <>
      <WebHeader />

      <div className="contactPage">
        <div className="contactCard">

          {/* ⭐ FEEDBACK TOP SECTION */}
          <div className="contactTop">
            <h1>We Value Your Feedback </h1>
            <p>
              Your opinion helps us improve FoodHub and serve you better.
              Tell us what you love, what we can improve, or just say hello 
            </p>
          </div>

          {/* ⭐ MAIN CONTACT AREA */}
          <div className="contactMain">

            {/* LEFT INFO */}
            <div className="contactLeft">
              <h1>Get In Touch</h1>
              <p>
                Have questions, feedback, or partnership ideas?
                We’d love to hear from you.
                Fill the form and our team will reply quickly.
              </p>

              <div className="contactInfo">
                <div>📧 support@foodhub.com</div>
                <div>📞 +91 98765 43210</div>
                <div>📍 Rajasthan, India</div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="contactRight">
              <h2>Send Message</h2>

              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Your Email" />
              <input type="text" placeholder="Subject" />
              <textarea rows="4" placeholder="Write your message..." />

              <button>SEND MESSAGE</button>
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export { CONTACT };