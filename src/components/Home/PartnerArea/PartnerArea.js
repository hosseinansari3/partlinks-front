import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./PartnerArea.css";

const options = {
  loop: true,
  nav: false,
  dots: false,
  smartSpeed: 500,
  margin: 30,
  autoplayHoverPause: true,
  autoplay: true,
  responsive: {
    0: {
      items: 2,
    },
    576: {
      items: 2,
    },
    768: {
      items: 3,
    },
    1024: {
      items: 3,
    },
    1200: {
      items: 4,
    },
  },
};

function PartnerArea() {
  return (
    <div className="partner-area pb-100">
      <div className="container">
        <div className="section-title">
          <h2>Choose Parts By Brand</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <OwlCarousel className="hero-slides owl-theme" {...options}>
          <div className="partner-item">
            <img
              src="https://templates.hibootstrap.com/maxon/default/assets/img/partner/partner-1.png"
              alt="image"
            />
          </div>
          <div className="partner-item">
            <img
              src="https://templates.hibootstrap.com/maxon/default/assets/img/partner/partner-2.png"
              alt="image"
            />
          </div>
          <div className="partner-item">
            <img
              src="https://templates.hibootstrap.com/maxon/default/assets/img/partner/partner-3.png"
              alt="image"
            />
          </div>
          <div className="partner-item">
            <img
              src="https://templates.hibootstrap.com/maxon/default/assets/img/partner/partner-4.png"
              alt="image"
            />
          </div>
        </OwlCarousel>
      </div>
    </div>
  );
}

export default PartnerArea;
