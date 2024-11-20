import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <div className="top-header-area">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6 col-md-12">
              <ul className="top-header-information">
                <li>
                  <i className="flaticon-pin"></i>565, Nyman Tower Melbourne,
                  Australia
                </li>
                <li>
                  <i className="flaticon-clock"></i>
                  Monday 8:00 AM - 12:00 PM
                </li>
              </ul>
            </div>

            <div className="col-lg-6 col-md-12">
              <ul className="top-header-optional">
                <li>
                  Currency:{" "}
                  <b className="text-[#d31531] relative top-[1px]">USD</b>
                </li>
                <li>Language</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="middle-header-area">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6">
              <div className="middle-header-search">
                <form className="search-form">
                  <label>
                    <input
                      type="search"
                      className="search-field"
                      placeholder="Search the entire store here"
                    />
                  </label>
                  <button type="submit">
                    <i className="bx bx-search-alt"></i>
                  </button>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <ul className="middle-header-optional">
                <li>
                  <a href="#">
                    <i className="bx bx-heart">
                      <span>0</span>
                    </i>
                    Wishlist
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="bx bx-cart">
                      <span>0</span>
                    </i>
                    Add to Cart
                  </a>
                </li>
                <li>
                  <Link to="login" className="user-btn">
                    <i className="bx bx-log-in-circle"></i>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="auth/register" className="user-btn">
                    <i className="bx bx-log-in-circle"></i>
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
