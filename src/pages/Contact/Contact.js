import React, { useEffect } from "react";
import "./Contact.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchHomeData } from "../../Redux/homeDataSlice";
import { fetchContactData } from "../../Redux/contactDataSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { setLoading } from "../../Redux/preloaderSlice";
import axios from "axios";

function Contact() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onChange", // Validate on each keystroke
  });

  const name = watch("name");
  const email = watch("email");
  const subject = watch("subject");
  const message = watch("message");

  const { contactData, status, error } = useSelector(
    (state) => state.contactData
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchContactData()); // Fetch data on component mount
    }
    console.log("contactData", contactData);
  }, [status, dispatch]);

  const onError = (e) => {
    if (errors) {
      toast.error("Please complete required items and try again.");
      console.log("errors", errors);
    }
  };

  const onSubmit = async (e) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        "https://partlinks.com.au/api/v1/member/contact_us_Store",
        { name: name, email: email, subject: subject, message: message }
      );
      dispatch(setLoading(false));

      console.log(response);
      if (response?.data?.done) {
        reset();
        toast.success("Your message sent successfully");
      }

      response?.data?.error && toast.error(response?.data?.error?.message);
    } catch (error) {
      dispatch(setLoading(false));

      console.log(error);
    }
  };

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
            <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="contact-info-box">
                <div class="icon">
                  <i class="bx bx-envelope"></i>
                </div>

                <h3>Email</h3>
                <p className="mt-5">
                  <a href="mailto:info[@]partlinks.com.au">
                    info[@]partlinks.com.au
                  </a>
                </p>
              </div>
            </div>

            <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="contact-info-box">
                <div class="icon">
                  <i class="bx bx-map"></i>
                </div>

                <h3>Address</h3>
                <p>{contactData?.result?.contact_info?.primary_address}</p>
              </div>
            </div>

            <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="contact-info-box">
                <div class="icon">
                  <i class="bx bxs-phone-call"></i>
                </div>

                <h3>Phone</h3>
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
            <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="contact-info-box">
                <div class="icon">
                  <i class="bx bxl-facebook-circle"></i>
                </div>

                <h3>Social media</h3>
                <div className="d-flex mt-5 justify-content-center align-items-center">
                  {contactData?.result?.social_media_list?.map((item) => {
                    return (
                      <div className="">
                        <a href={item.company_url} target="_blank">
                          <img
                            className="social-icon"
                            src={`https://partlinks.com.au/${item.icon}`}
                          />
                        </a>
                      </div>
                    );
                  })}
                </div>
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
            <form id="contactForm" onSubmit={handleSubmit(onSubmit, onError)}>
              <div class="row justify-content-center">
                <div class="col-lg-6 col-md-6">
                  <div class="form-group">
                    <label>Name</label>
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      name="name"
                      class="form-control"
                      required=""
                      data-error="Please enter your name"
                    />
                    <div
                      className={`${
                        errors?.name && "d-block"
                      } fv-plugins-message-container invalid-feedback`}
                    >
                      name is required
                    </div>
                  </div>
                </div>

                <div class="col-lg-6 col-md-6">
                  <div class="form-group">
                    <label>Email</label>
                    <input
                      {...register("email", { required: true })}
                      type="email"
                      name="email"
                      id="email"
                      class="form-control"
                      required=""
                      data-error="Please enter your email"
                    />
                    <div
                      className={`${
                        errors?.email && "d-block"
                      } fv-plugins-message-container invalid-feedback`}
                    >
                      email is required
                    </div>
                  </div>
                </div>

                <div class="">
                  <div class="form-group">
                    <label>Subject</label>
                    <input
                      {...register("subject", { required: true })}
                      type="text"
                      name="subject"
                      id="msg_subject"
                      class="form-control"
                      required=""
                      data-error="Please enter your subject"
                    />
                    <div
                      className={`${
                        errors?.subject && "d-block"
                      } fv-plugins-message-container invalid-feedback`}
                    >
                      subject is required
                    </div>
                  </div>
                </div>

                <div class="col-lg-12 col-md-12">
                  <div class="form-group has-error has-danger">
                    <label>Message</label>
                    <textarea
                      {...register("message", { required: true })}
                      name="message"
                      class="form-control"
                      id="message"
                      cols="30"
                      rows="6"
                      required=""
                      data-error="Write your message"
                    ></textarea>
                    <div
                      className={`${
                        errors?.message && "d-block"
                      } fv-plugins-message-container invalid-feedback`}
                    >
                      message is required
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
