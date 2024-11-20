import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <section className="footer-area pt-100 pb-70">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-3 col-sm-6">
            <div className="single-footer-widget">
              <a href="index.html">
                <img
                  src="https://templates.hibootstrap.com/maxon/default/assets/img/logo-2.png"
                  alt="image"
                />
              </a>

              <p>
                Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <ul className="footer-social">
                <li>
                  <a href="https://www.facebook.com/login/" target="_blank">
                    <i className="bx bxl-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/i/flow/login" target="_blank">
                    <i className="bx bxl-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.pinterest.com/" target="_blank">
                    <i className="bx bxl-pinterest-alt"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/" target="_blank">
                    <i className="bx bxl-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6">
            <div className="single-footer-widget">
              <h2>Recent Product</h2>

              <div className="footer-post">
                <article className="item">
                  <a href="blog-details.html" className="thumb">
                    <span className="fullimage cover bg1" role="img"></span>
                  </a>
                  <div className="info">
                    <h4 className="title usmall">
                      <a href="blog-details.html">
                        Electronic Car Protect Air Pollution
                      </a>
                    </h4>
                    <span>24 Dec 2024</span>
                  </div>
                </article>

                <article className="item">
                  <a href="blog-details.html" className="thumb">
                    <span className="fullimage cover bg2" role="img"></span>
                  </a>
                  <div className="info">
                    <h4 className="title usmall">
                      <a href="blog-details.html">
                        Automotive Advancements to Look Forward
                      </a>
                    </h4>
                    <span>25 Dec 2024</span>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6">
            <div className="single-footer-widget pl-5">
              <h2>Quick Links</h2>

              <ul className="quick-links">
                <li>
                  <i className="bx bxs-chevrons-right"></i>
                  <a href="about.html">About Company</a>
                </li>
                <li>
                  <i className="bx bxs-chevrons-right"></i>
                  <a href="blog-details.html">Services</a>
                </li>
                <li>
                  <i className="bx bxs-chevrons-right"></i>
                  <a href="shop.html">Shop</a>
                </li>
                <li>
                  <i className="bx bxs-chevrons-right"></i>
                  <a href="faq.html">FAQ</a>
                </li>
                <li>
                  <i className="bx bxs-chevrons-right"></i>
                  <a href="blog.html">Blog</a>
                </li>
                <li>
                  <i className="bx bxs-chevrons-right"></i>
                  <a href="gallery.html">Gallery</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6">
            <div className="single-footer-widget">
              <h2>Information</h2>

              <ul className="footer-contact-info">
                <li>
                  <i className="bx bxs-phone"></i>
                  <span>Phone</span>
                  <a href="tel:882569756">882-569-756</a>
                </li>
                <li>
                  <i className="bx bx-envelope"></i>
                  <span>Email</span>
                  <a href="mailto:hello@maxon.com">hello@maxon.com</a>
                </li>
                <li>
                  <i className="bx bx-map"></i>
                  <span>Address</span>
                  175 5th Ave Premium Area, New York
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
