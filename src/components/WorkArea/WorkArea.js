import React from "react";
import "./WorkArea.css";

function WorkArea() {
  return (
    <section class="work-area pt-100 pb-70">
      <div class="container">
        <div class="section-title">
          <h2>How It Works</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div class="row justify-content-center">
          <div class="col-lg-4 col-md-6">
            <div class="single-work">
              <div class="work-content">
                <div class="icon">
                  <i class="flaticon-car-wheel"></i>
                </div>

                <h3>Find Your Tires Among Our Widset Collection</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
                  eiusmod tempor incididunt ut dolore.
                </p>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="single-work">
              <div class="work-content">
                <div class="icon">
                  <i class="flaticon-appointment"></i>
                </div>

                <h3>Collect Your Product From The Shop In Short Time</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
                  eiusmod tempor incididunt ut dolore.
                </p>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="single-work">
              <div class="work-content">
                <div class="icon">
                  <i class="flaticon-delivery-truck"></i>
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
