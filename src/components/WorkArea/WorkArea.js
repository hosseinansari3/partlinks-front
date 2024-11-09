import React from "react";
import "./WorkArea.css";

function WorkArea() {
  return (
    <section className="work-area pt-100 pb-70">
      <div className="container">
        <div className="section-title">
          <h2>How It Works</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6">
            <div className="single-work">
              <div className="work-content">
                <div className="icon">
                  <i className="flaticon-car-wheel"></i>
                </div>

                <h3>Find Your Tires Among Our Widset Collection</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
                  eiusmod tempor incididunt ut dolore.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="single-work">
              <div className="work-content">
                <div className="icon">
                  <i className="flaticon-appointment"></i>
                </div>

                <h3>Collect Your Product From The Shop In Short Time</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
                  eiusmod tempor incididunt ut dolore.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="single-work">
              <div className="work-content">
                <div className="icon">
                  <i className="flaticon-delivery-truck"></i>
                </div>

                <h3>Get Your Tire Delivered and Get Installed</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
                  eiusmod tempor incididunt ut dolore.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkArea;
