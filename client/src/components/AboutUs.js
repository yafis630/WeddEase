import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function AboutUs() {
  return (
    <div className="body"><Header />
    <section className="about-us">
      <div className="about-us-content">
        <h2 className="about-us-heading">Welcome to WeddEase</h2>
        <p className="about-us-description">
          At WeddEase, we believe in turning dreams into reality. We understand
          that planning a wedding can be both exciting and overwhelming, which
          is why we've created the ultimate wedding management web app to make
          the journey effortless and unforgettable.
        </p>
        <p className="about-us-description">
          WeddEase is more than just a web app; it's your personal wedding
          companion. Seamlessly manage every aspect of your wedding in one
          place. From browsing and shopping for the finest products to hiring
          talented professionals to bring your vision to life, we've got you
          covered.
        </p>
        <p className="about-us-description">
          For vendors and professionals, WeddEase offers an innovative platform
          to showcase your skills and products. Display your profiles
          artistically and share your expertise with couples seeking to create
          their perfect day.
        </p>
        <p className="about-us-description">
          Join us on this journey as we transform wedding planning from a
          daunting task into a delightful experience. Let's make every moment
          leading up to your special day as memorable as the day itself.
        </p>
      </div>
      
    </section><Footer />
    </div>
  );
}

export default AboutUs;
