import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../../Redux/homeDataSlice";

function Navbar() {
  const dispatch = useDispatch();
  const { homeData, status, error } = useSelector((state) => state.homeData);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    <div className={` ${isSticky && "is-sticky"} navbar-area navbar-two`}>
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
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to={"sell-car"}
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Sell Car
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="about"
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      About Us
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="contact"
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      Contact
                    </NavLink>
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
            <Link className="navbar-brand" to="/">
              <img
                src={`https://partlinks.com.au/${homeData?.result?.logo_dark}`}
                alt="partlinks-logo"
              />
            </Link>
            <div className="collapse navbar-collapse mean-menu">
              <ul className="navbar-nav m-auto">
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to={"sell-car"}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Sell Car
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="about"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    About Us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="contact"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Contact
                  </NavLink>
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
      <div class="others-option-for-responsive">
        <div class="container">
          <div class="dot-menu">
            {isLoggedin ? (
              <>
                <Link to="member" className="user-btn-mobile">
                  <i class="bx bxs-user"></i>
                </Link>
                <div onClick={logout} className="ms-2 user-btn-mobile">
                  <i class="bx bx-log-out-circle"></i>
                </div>
              </>
            ) : (
              <Link to="login" className="user-btn-mobile">
                <i className="bx bx-log-in-circle"></i>
              </Link>
            )}
          </div>

          <div class="container">
            <div class="option-inner">
              <div class="others-option d-flex align-items-center">
                <div class="option-item">
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
