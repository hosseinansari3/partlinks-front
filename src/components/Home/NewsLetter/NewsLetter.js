import React from "react";
import "./NewsLetter.css";

function NewsLetter() {
  return (
    <div className="newsletter-area item-two ptb-100">
      <div className="container">
        <div className="newsletter-content">
          <span>Special Offer For Subscription</span>
          <h3>Get Instant Discount For Membership</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore.
          </p>

          <form className="newsletter-form" novalidate="true">
            <input
              type="email"
              className="input-newsletter"
              placeholder="Enter Email Address"
              name="EMAIL"
              required=""
              autocomplete="off"
            />

            <button type="submit" className="disabled">
              Subscribe Now
            </button>

            <div id="validator-newsletter" className="form-result"></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewsLetter;
