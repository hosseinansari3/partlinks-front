import React, { useEffect } from "react";
import "./Contact.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../../Redux/homeDataSlice";
import { fetchContactData } from "../../Redux/contactDataSlice";

function Contact() {
  const dispatch = useDispatch();
  const { contactData, status, error } = useSelector(
    (state) => state.contactData
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchContactData()); // Fetch data on component mount
    }
    console.log("contactData", contactData);
  }, [status, dispatch]);

  return (
    <div>
      <div class="page-banner-area item-bg2">
        <div class="d-table">
          <div class="d-table-cell">
            <div class="container">
              <div class="page-banner-content">
                <h2>Contact Us</h2>
                <ul>
                  <li>
                    <a href="index.html">Home</a>
                  </li>
                  <li>Contact Us</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="contact-info-area pt-100 pb-70">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 col-sm-6">
              <div class="contact-info-box">
                <div class="icon">
                  <i class="bx bx-envelope"></i>
                </div>

                <h3>Email Here</h3>
                <p>
                  <a href="mailto:hello@maxon.com">hello@maxon.com</a>
                </p>
                <p>
                  <a href="mailto:support@maxon.com">support@maxon.com</a>
                </p>
              </div>
            </div>

            <div class="col-lg-4 col-md-6 col-sm-6">
              <div class="contact-info-box">
                <div class="icon">
                  <i class="bx bx-map"></i>
                </div>

                <h3>Location Here</h3>
                <p>{contactData?.result?.contact_info?.primary_address}</p>
                <p>{contactData?.result?.contact_info?.secondary_address}</p>
              </div>
            </div>

            <div class="col-lg-4 col-md-6 col-sm-6">
              <div class="contact-info-box">
                <div class="icon">
                  <i class="bx bxs-phone-call"></i>
                </div>

                <h3>Call Here</h3>
                <p>
                  <a
                    href={`tel:${contactData?.result?.contact_info?.primary_phone_number}`}
                  >
                    {contactData?.result?.contact_info?.primary_phone_number}
                  </a>
                </p>
                <p>
                  <a
                    href={`tel:${contactData?.result?.contact_info?.other_phone_numbers[0]}`}
                  >
                    {contactData?.result?.contact_info?.other_phone_numbers[0]}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="contact-area pb-100">
        <div class="container">
          <div class="section-title">
            <h2>Ready To Get Started?</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div class="contact-form">
            <form id="contactForm" novalidate="true">
              <div class="row justify-content-center">
                <div class="col-lg-6 col-md-6">
                  <div class="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      class="form-control"
                      required=""
                      data-error="Please enter your name"
                    />
                    <div class="help-block with-errors"></div>
                  </div>
                </div>

                <div class="col-lg-6 col-md-6">
                  <div class="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      class="form-control"
                      required=""
                      data-error="Please enter your email"
                    />
                    <div class="help-block with-errors"></div>
                  </div>
                </div>

                <div class="col-lg-6 col-md-6">
                  <div class="form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone_number"
                      id="phone_number"
                      required=""
                      data-error="Please enter your number"
                      class="form-control"
                    />
                    <div class="help-block with-errors"></div>
                  </div>
                </div>

                <div class="col-lg-6 col-md-6">
                  <div class="form-group">
                    <label>Subject</label>
                    <input
                      type="text"
                      name="msg_subject"
                      id="msg_subject"
                      class="form-control"
                      required=""
                      data-error="Please enter your subject"
                    />
                    <div class="help-block with-errors"></div>
                  </div>
                </div>

                <div class="col-lg-12 col-md-12">
                  <div class="form-group has-error has-danger">
                    <label>Message</label>
                    <textarea
                      name="message"
                      class="form-control"
                      id="message"
                      cols="30"
                      rows="6"
                      required=""
                      data-error="Write your message"
                    ></textarea>
                    <div class="help-block with-errors">
                      <ul class="list-unstyled">
                        <li>Write your message</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="col-lg-12 col-md-12">
                  <button type="submit" class="default-btn disabled">
                    Send Message
                  </button>

                  <div id="msgSubmit" class="h3 text-center hidden"></div>
                  <div class="clearfix"></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
