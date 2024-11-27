import React, { useEffect } from "react";
import "./Footer.css";
import { fetchHomeData } from "../../Redux/homeDataSlice";
import { useDispatch, useSelector } from "react-redux";

function Footer() {
  const dispatch = useDispatch();
  const { homeData, status, error } = useSelector((state) => state.homeData);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchHomeData()); // Fetch data on component mount
    }
  }, [status, dispatch]);

  useEffect(() => {
    console.log("homeData", homeData);
  }, [homeData]);

  return (
    <section className="footer-area pt-100 pb-70">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-3 col-sm-6">
            <div className="single-footer-widget">
              <a href="index.html">
                <img
                  src={`https://partlinks.com.au/${homeData?.result?.logo}`}
                  alt="image"
                />
              </a>

              <p>{homeData?.result?.description}</p>

              <ul className="footer-social">
                {homeData?.result?.social_media_list.map((item) => {
                  return (
                    <li>
                      <a href={item.company_url} target="_blank">
                        <i className={`bx bxl-${item.title}`}></i>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6"></div>

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
                  <a
                    href={`tel:${homeData?.result?.contact_info?.primary_phone_number}`}
                  >
                    {homeData?.result?.contact_info?.primary_phone_number}
                  </a>
                </li>
                {homeData?.result?.contact_info?.email && (
                  <li>
                    <i className="bx bx-envelope"></i>
                    <span>Email</span>
                    <a href={`mailto:${homeData?.result?.contact_info?.email}`}>
                      {homeData?.result?.contact_info?.email}
                    </a>
                  </li>
                )}

                <li>
                  <i className="bx bx-map"></i>
                  <span>Address</span>
                  {homeData?.result?.contact_info?.primary_address}
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
