import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="content">
          <p className="subtitle">WE ARE WAITING FOR YOU</p>
          <h1>Let's Make The World Great Again</h1>
          <p>We can start by taking small steps and making small changes that can have a big impact on the world.</p>
        </div>
        <div className="hero-image">
          <img src="hero-image.png" alt="Politician speaking" />
        </div>
      </section>

      <section className="mission-section">
        <div className="content">
          <p className="subtitle">MISSION</p>
          <h1>We Are Committed to Empowering the Community</h1>
          <p>Our mission is to empower individuals through education, healthcare, and social support, ensuring a better tomorrow. By creating initiatives and programs that foster a sense of responsibility, we are laying the foundation for a stronger, more connected community.</p>
        </div>
        <div className="image">
          <img src="mission-image.png" alt="Mission" />
        </div>
      </section>

      <section className="vision-section">
        <div className="content">
          <p className="subtitle">VISION</p>
          <h1>Building a Sustainable Future Together</h1>
          <p>We envision a future where every individual has access to the tools they need to thrive. Our vision is a society where opportunities for growth and success are abundant, and every voice is heard, leading to a world that is fairer, greener, and more equitable for all.</p>
        </div>
        <div className="image">
          <img src="vision-image.png" alt="Vision" />
        </div>
      </section>

      {/* News Section */}
      <section className="news-section">
        <div className="content">
          <p className="subtitle">NEWS</p>
          <h1>Latest Updates and News</h1>
          <p>Stay updated with the latest news and developments from our campaign. We're committed to keeping you informed about the progress we're making together.</p>
        </div>
        <div className="news-items">
          <div className="news-item">
            <h3>Exciting New Policy Announced</h3>
            <p>Details on our new policy that aims to bring better education to underprivileged communities.</p>
          </div>
          <div className="news-item">
            <h3>Community Outreach Program</h3>
            <p>We launched a community outreach program to connect with people and understand their needs better.</p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="events-section">
        <div className="content">
          <p className="subtitle">EVENTS</p>
          <h1>Join Us at Our Upcoming Events</h1>
          <p>We are organizing several events to engage with the community. Don't miss the chance to be a part of the movement!</p>
        </div>
        <div className="events-items">
          <div className="event-item">
            <h3>Community Meet-Up</h3>
            <p>Join us for a community meet-up this weekend to discuss our goals and plans.</p>
          </div>
          <div className="event-item">
            <h3>Fundraising Gala</h3>
            <p>Our annual fundraising gala will be held next month. Come and support our cause!</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
