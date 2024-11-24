import React from "react";
import "./Support.css";

function Support() {
  return (
    <section className="support-area bg-color">
      <div className="container">
        <div className="custom-row">
          <div className="custom-item">
            <div className="single-support">
              <div className="icon">
                <i className="flaticon-free-delivery"></i>
              </div>

              <div className="support-content">
                <h3>Free Delivery</h3>
                <span>World Wide</span>
              </div>
            </div>
          </div>

          <div className="custom-item">
            <div className="single-support">
              <div className="icon">
                <i className="flaticon-return-of-investment"></i>
              </div>

              <div className="support-content">
                <h3>Easy Returns</h3>
                <span>World Wide</span>
              </div>
            </div>
          </div>

          <div className="custom-item">
            <div className="single-support">
              <div className="icon">
                <i className="flaticon-online-payment"></i>
              </div>

              <div className="support-content">
                <h3>Payment Comfort</h3>
                <span>World Wide</span>
              </div>
            </div>
          </div>

          <div className="custom-item">
            <div className="single-support">
              <div className="icon">
                <i className="flaticon-online-support"></i>
              </div>

              <div className="support-content">
                <h3>Online Support</h3>
                <span>World Wide</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Support;
