import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar-area navbar-two">
      <div className="main-responsive-nav">
        <div className="container">
          <div className="main-responsive-menu mean-container">
            <div className="mean-bar">
              <a href="#nav" className="meanmenu-reveal">
                <span>
                  <span>
                    <span></span>
                  </span>
                </span>
              </a>
              <nav className="mean-nav">
                <ul className="navbar-nav m-auto" style={{ display: "none" }}>
                  <li className="nav-item">
                    <a href="index.html" className="nav-link active">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="sellcar.html" className="nav-link">
                      Sell Car
                    </a>
                  </li>

                  <li className="nav-item">
                    <a href="about.html" className="nav-link">
                      About Us
                    </a>
                  </li>
                  <li className="nav-item mean-last">
                    <a href="contact.html" className="nav-link">
                      Contact
                    </a>
                  </li>
                </ul>

                <div className="others-option d-flex align-items-center">
                  <div className="option-item">
                    <span>
                      Hotline:
                      <a href="tel:882563789966">(+882) 563 789 966</a>
                    </span>
                  </div>
                </div>
              </nav>
            </div>
            <div className="logo">
              <a href="index.html">
                <img
                  src="https://theme.partlinks.com.au/assets/img/logo.png"
                  alt="image"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="main-navbar">
        <div className="container">
          <nav className="navbar navbar-expand-md navbar-light">
            <a className="navbar-brand" href="#">
              <img
                src="https://theme.partlinks.com.au/assets/img/logo.png"
                alt="partlinks-logo"
              />
            </a>
            <div className="collapse navbar-collapse mean-menu">
              <ul className="navbar-nav m-auto">
                <li className="nav-item">
                  <a href="#" className="nav-link active">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">
                    Home
                  </a>
                </li>
              </ul>
              <div className="others-option d-flex align-items-center">
                <div className="option-item">
                  <span>
                    Hotline: <a href="tel:882563789966">(+882) 563 789 966</a>
                  </span>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="others-option-for-responsive">
        <div className="container">
          <div className="dot-menu">
            <div className="inner">
              <div className="circle circle-one"></div>
              <div className="circle circle-two"></div>
              <div className="circle circle-three"></div>
            </div>
          </div>

          <div className="container">
            <div className="option-inner">
              <div className="others-option d-flex align-items-center">
                <div className="option-item">
                  <span>
                    Hotline:
                    <a href="tel:882563789966">(+882) 563 789 966</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
