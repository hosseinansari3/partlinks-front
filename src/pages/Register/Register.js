import React from "react";
import "./Register.css";

function Register() {
  return (
    <div className="d-flex flex-column flex-lg-row flex-column-fluid stepper stepper-pills stepper-column stepper-multistep">
      <div class="d-flex flex-column flex-lg-row-auto w-lg-250px w-xl-350px ">
        <div
          class="d-flex flex-column position-lg-fixed top-0 bottom-0 w-lg-250px w-xl-350px scroll-y bgi-size-cover bgi-position-center"
          style={{
            backgroundImage:
              "url('https://partlinks.com.au/panel/media/misc/auth-bg.png')",
          }}
        >
          <div class="d-flex justify-content-center align-items-center py-4 py-lg-5 mt-lg-5">
            <a href="https://partlinks.com.au">
              <img
                alt="Logo"
                src="https://partlinks.com.au/panel/media/logos/custom-1.png"
              />
            </a>
          </div>

          <div class="d-flex justify-content-center align-items-center flex-wrap fs-5 px-4 py-5">
            <div class="d-flex fw-normal">
              <a
                href="https://partlinks.com.au"
                class="text-light px-5"
                target="_blank"
              >
                Register an account
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        class="d-flex flex-column flex-lg-row-fluid py-5"
        id="kt_create_account_form_stepper"
      >
        <div class="d-flex justify-content-center align-items-center flex-column flex-column-fluid">
          <div class="w-lg-700px w-xl-850px w-md-700px p-3 w-100 mx-auto">
            <div class="current">
              <div class="w-100">
                <div class="pb-14 pb-lg-5">
                  <h2 class=" d-flex align-items-center text-dark">
                    Choose Account Type
                    <i
                      class="fas fa-exclamation-circle ms-2 fs-7"
                      data-bs-toggle="tooltip"
                      aria-label="Choose your Account type correctly!"
                      data-bs-original-title="Choose your Account type correctly!"
                      data-kt-initialized="1"
                    ></i>
                  </h2>

                  <div class="form-text text-danger">
                    <span class="fa fa-info-circle mr-1"></span> You will not be
                    able to change this after you complete registration
                  </div>
                </div>

                <div class="fv-row">
                  <div class="row">
                    <div class="col-12 col-sm-6 col-md-2"></div>
                    <div class="col-12 col-sm-6 col-md-4">
                      <input
                        type="radio"
                        class="btn-check"
                        name="type"
                        value="member/business"
                        id="kt_create_account_form_type_member_business"
                        onchange="register_show_form(this.value)"
                      />
                      <label
                        class="btn btn-active-light-warning p-4 d-flex align-items-center mb-4"
                        for="kt_create_account_form_type_member_business"
                        style={{ border: "2px dashed" }}
                      >
                        <span class="svg-icon svg-icon-3x me-3">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 14H18V10H20C20.6 10 21 10.4 21 11V13C21 13.6 20.6 14 20 14ZM21 19V17C21 16.4 20.6 16 20 16H18V20H20C20.6 20 21 19.6 21 19ZM21 7V5C21 4.4 20.6 4 20 4H18V8H20C20.6 8 21 7.6 21 7Z"
                              fill="currentColor"
                            ></path>
                            <path
                              opacity="0.3"
                              d="M17 22H3C2.4 22 2 21.6 2 21V3C2 2.4 2.4 2 3 2H17C17.6 2 18 2.4 18 3V21C18 21.6 17.6 22 17 22ZM10 7C8.9 7 8 7.9 8 9C8 10.1 8.9 11 10 11C11.1 11 12 10.1 12 9C12 7.9 11.1 7 10 7ZM13.3 16C14 16 14.5 15.3 14.3 14.7C13.7 13.2 12 12 10.1 12C8.10001 12 6.49999 13.1 5.89999 14.7C5.59999 15.3 6.19999 16 7.39999 16H13.3Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </span>

                        <span class="d-block fw-semibold text-start">
                          <span class="member-text text-dark d-block mb-1">
                            Business Member
                          </span>
                          <span class="account-text">Business account.</span>
                        </span>
                      </label>
                    </div>
                    <div class="col-12 col-sm-6 col-md-4">
                      <input
                        type="radio"
                        class="btn-check"
                        name="type"
                        value="member/private"
                        id="kt_create_account_form_type_member_private"
                        onchange="register_show_form(this.value)"
                      />
                      <label
                        class="btn btn-active-light-warning p-4 d-flex align-items-center mb-4"
                        for="kt_create_account_form_type_member_private"
                        style={{ border: "2px dashed" }}
                      >
                        <span class="svg-icon svg-icon-3x me-3">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 14H18V10H20C20.6 10 21 10.4 21 11V13C21 13.6 20.6 14 20 14ZM21 19V17C21 16.4 20.6 16 20 16H18V20H20C20.6 20 21 19.6 21 19ZM21 7V5C21 4.4 20.6 4 20 4H18V8H20C20.6 8 21 7.6 21 7Z"
                              fill="currentColor"
                            ></path>
                            <path
                              opacity="0.3"
                              d="M17 22H3C2.4 22 2 21.6 2 21V3C2 2.4 2.4 2 3 2H17C17.6 2 18 2.4 18 3V21C18 21.6 17.6 22 17 22ZM10 7C8.9 7 8 7.9 8 9C8 10.1 8.9 11 10 11C11.1 11 12 10.1 12 9C12 7.9 11.1 7 10 7ZM13.3 16C14 16 14.5 15.3 14.3 14.7C13.7 13.2 12 12 10.1 12C8.10001 12 6.49999 13.1 5.89999 14.7C5.59999 15.3 6.19999 16 7.39999 16H13.3Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </span>

                        <span class="d-block fw-semibold text-start">
                          <span class="member-text text-dark d-block mb-1">
                            Private Member
                          </span>
                          <span class="account-text">Private account.</span>
                        </span>
                      </label>
                    </div>
                    <div class="col-12 col-sm-6 col-md-2"></div>
                  </div>
                  <div class="row">
                    <div class="col-12 col-sm-6 col-md-2"></div>
                    <div class="col-12 col-sm-6 col-md-4">
                      <input
                        type="radio"
                        class="btn-check"
                        name="type"
                        value="vendor"
                        id="kt_create_account_form_type_vendor"
                        onchange="register_show_form(this.value)"
                      />
                      <label
                        class="btn btn-active-light-warning p-4 d-flex align-items-center mb-4"
                        for="kt_create_account_form_type_vendor"
                        style={{ border: "2px dashed" }}
                      >
                        <span class="svg-icon svg-icon-3x me-3">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 14H18V10H20C20.6 10 21 10.4 21 11V13C21 13.6 20.6 14 20 14ZM21 19V17C21 16.4 20.6 16 20 16H18V20H20C20.6 20 21 19.6 21 19ZM21 7V5C21 4.4 20.6 4 20 4H18V8H20C20.6 8 21 7.6 21 7Z"
                              fill="currentColor"
                            ></path>
                            <path
                              opacity="0.3"
                              d="M17 22H3C2.4 22 2 21.6 2 21V3C2 2.4 2.4 2 3 2H17C17.6 2 18 2.4 18 3V21C18 21.6 17.6 22 17 22ZM10 7C8.9 7 8 7.9 8 9C8 10.1 8.9 11 10 11C11.1 11 12 10.1 12 9C12 7.9 11.1 7 10 7ZM13.3 16C14 16 14.5 15.3 14.3 14.7C13.7 13.2 12 12 10.1 12C8.10001 12 6.49999 13.1 5.89999 14.7C5.59999 15.3 6.19999 16 7.39999 16H13.3Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </span>

                        <span class="d-block fw-semibold text-start">
                          <span class="member-text text-dark d-block mb-1">
                            Vendor
                          </span>
                          <span class="account-text">Vendor account.</span>
                        </span>
                      </label>
                    </div>
                    <div class="col-12 col-sm-6 col-md-2"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="d-flex flex-stack pt-4">
              <div class="mr-2">
                <button
                  type="button"
                  class="btn btn-lg btn-light-warning me-3"
                  onclick="window.location.href = `https://partlinks.com.au`"
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        opacity="0.5"
                        x="6"
                        y="11"
                        width="13"
                        height="2"
                        rx="1"
                        fill="currentColor"
                      ></rect>
                      <path
                        d="M8.56569 11.4343L12.75 7.25C13.1642 6.83579 13.1642 6.16421 12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75L5.70711 11.2929C5.31658 11.6834 5.31658 12.3166 5.70711 12.7071L11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25C13.1642 17.8358 13.1642 17.1642 12.75 16.75L8.56569 12.5657C8.25327 12.2533 8.25327 11.7467 8.56569 11.4343Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  Back To Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
