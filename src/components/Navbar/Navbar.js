import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../../Redux/homeDataSlice";

function Navbar() {
  const dispatch = useDispatch();
  const { homeData, status, error } = useSelector((state) => state.homeData);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchHomeData()); // Fetch data on component mount
    }
  }, [status, dispatch]);

  const [navOpen, setNavOpen] = useState(false);
  const [isLoggedin, setLoggedin] = useState(false);

  const userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (userData) {
      setLoggedin(true);
    }
  }, [userData]);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const logout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("authToken");
    setLoggedin(false);
  };
  return (
    <div className="navbar-area navbar-two">
      <div className="main-responsive-nav">
        <div className="container">
          <div className="main-responsive-menu mean-container">
            <div className="mean-bar">
              <a href="#nav" onClick={toggleNav} className="meanmenu-reveal">
                <span>
                  <span>
                    <span></span>
                  </span>
                </span>
              </a>
              <nav className="mean-nav">
                <ul className={`navbar-nav m-auto ${!navOpen && "d-none"}`}>
                  <li className="nav-item">
                    <a href="index.html" className="nav-link active">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link to={"sell-car"} className="nav-link">
                      Sell Car
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="about" className="nav-link">
                      About Us
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="contact" className="nav-link">
                      Contact
                    </Link>
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
              <Link to="/">
                <img
                  src={`https://partlinks.com.au/${homeData?.result?.logo_dark}`}
                  alt="partlinks"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="main-navbar">
        <div className="container">
          <nav className="navbar navbar-expand-md navbar-light">
            <a className="navbar-brand" href="#">
              <img
                src={`https://partlinks.com.au/${homeData?.result?.logo_dark}`}
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
                  <Link to={"sell-car"} className="nav-link">
                    Sell Car
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="about" className="nav-link">
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="contact" className="nav-link">
                    Contact
                  </Link>
                </li>
              </ul>
              <div className="others-option d-flex align-items-center">
                <div className="option-item">
                  {isLoggedin ? (
                    <>
                      <Link to="member" className="user-btn">
                        <i class="bx bxs-user"></i>
                        Your Panel
                      </Link>
                      <div onClick={logout} className="ms-2 user-btn">
                        <i class="bx bx-log-out-circle"></i>
                        Logout
                      </div>
                    </>
                  ) : (
                    <Link to="login" className="user-btn">
                      <i className="bx bx-log-in-circle"></i>
                      Login / Register
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
