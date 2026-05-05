import React from "react";
import {  WebHeader } from "../WebHeader";
import { useNavigate } from "react-router-dom";
import {Footer}  from "../Footer";
import "./ABOUT.css"
function ABOUT(){
     return(
        <>
         <WebHeader/>

    <div className="aboutPage">

      {/* HERO SECTION */}
      <section className="aboutHero">
        <div className="heroContent">
          <h1>About Our Platform</h1>
          <p>
            We blend technology and food to create a fast, smooth and
            delightful online experience for everyone.
          </p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="aboutSection">
        <div className="aboutText">
          <h2>Who We Are</h2>
          <p>
            We are a modern web platform designed to make discovering and
            ordering food simple, fast and enjoyable. Our team focuses on
            creating clean design, smooth animations and a seamless user
            experience across all devices.
          </p>
        </div>

        <div className="aboutImage">
          {/* <div className="blob"></div> */}
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>Why People Love Us</h2>

        <div className="featureGrid">
          <div className="featureCard">
            <h3>⚡ Fast Experience</h3>
            <p>Lightning fast browsing and smooth performance.</p>
          </div>

          <div className="featureCard">
            <h3>🔒 Secure Accounts</h3>
            <p>Your data is safe with modern authentication.</p>
          </div>

          <div className="featureCard">
            <h3>📱 Mobile Friendly</h3>
            <p>Fully responsive and optimized for all devices.</p>
          </div>

          <div className="featureCard">
            <h3>🎨 Modern UI</h3>
            <p>Clean design with beautiful animations.</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stat">
          <h1>10K+</h1>
          <p>Happy Users</p>
        </div>

        <div className="stat">
          <h1>500+</h1>
          <p>Orders Daily</p>
        </div>

        <div className="stat">
          <h1>99%</h1>
          <p>Positive Feedback</p>
        </div>

        <div className="stat">
          <h1>24/7</h1>
          <p>Support</p>
        </div>
      </section>

      {/* MISSION */}
      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          Our mission is to simplify online ordering while delivering a smooth,
          secure and enjoyable digital experience. We aim to create a platform
          people trust and love to use every day.
        </p>
      </section>

    </div>
     <Footer/>
        
        </>
    )
 }
 export{ABOUT}