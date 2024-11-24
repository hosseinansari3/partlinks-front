import React, { useEffect, useState } from "react";
import "./SellCarVerify.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { InputLabel } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import OtpInput from "../../../components/Common/OtpInput";

const steps = {
  STEP_PHONE: "STEP_PHONE",
  STEP_PASSWORD: "STEP_PASSWORD",
  STEP_OTP: "SPET_OTP",
};

function SellCarVerify() {
  const navigate = useNavigate();
  const location = useLocation();

  const [responseData, setResponseData] = useState();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(steps.STEP_PHONE);
  const [otpNumber, setOtpNumber] = useState(null); // State to store OTP as a number

  useEffect(() => {
    console.log("OTP", otpNumber);
  }, [otpNumber]);

  useEffect(() => {
    console.log("step", step);
  }, [step]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onChange", // Validate on each keystroke
  });

  const userName = watch("userName");
  const password = watch("password");

  useEffect(() => {
    console.log("number", userName);
  }, [userName]);

  const onError = (e) => {
    if (errors) {
      toast.error("Please complete required items and try again.");
      console.log("errors", errors);
    }
  };

  const onCheckOTP = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://partlinks.com.au/api/v1/member/auth/check_otp",
        { phone_number: userName, otp: otpNumber }
      );
      console.log(response);
      setResponseData(response.data);
      if (response?.data?.result?.match) {
        navigate("/auth/register", {
          state: { token: response?.data?.result?.auth_info?.token },
        });
      }

      setLoading(false);

      response?.data?.error && toast.error(response?.data?.error?.message);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  const onSubmit = async (e) => {
    if (step == steps.STEP_PHONE) {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://partlinks.com.au/api/v1/member/selling/check_otp",
          { otp: otpNumber, selling_token: location?.state?.sellingToken }
        );
        console.log(response);
        if (response?.data?.done && response?.data?.result?.match) {
          localStorage.setItem(
            "authToken",
            response?.data?.result?.auth_info?.token
          );
          localStorage.setItem(
            "userData",
            JSON.stringify(response?.data?.result?.user_data)
          );
          navigate("/sell-car/success", {
            state: { sellingToken: location?.state?.sellingToken },
          });
        }
        setLoading(false);

        response?.data?.error && toast.error(response?.data?.error?.message);
      } catch (error) {
        setLoading(false);

        console.log(error);
      }
    }

    if (step == steps.STEP_PASSWORD) {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://partlinks.com.au/api/v1/member/auth/login_with_phone_number",
          { phone_number: userName, password: password }
        );
        console.log(response);
        if (response?.data?.done && response?.data?.result?.match) {
          localStorage.setItem(
            "authToken",
            response?.data?.result?.auth_info?.token
          );
          localStorage.setItem(
            "userData",
            JSON.stringify(response?.data?.result?.user_data)
          );

          if (
            response?.data?.result?.user_data?.app_open?.register_step == -1
          ) {
            navigate("/member");
          } else {
            if (
              response?.data?.result?.user_data?.business_info?.business_type ==
              "business"
            ) {
              navigate("/auth/member/business/complete", {
                state: {
                  token: response?.data?.result?.auth_info?.token,
                  info: response?.data?.result?.user_data,
                },
              });
            }
            if (
              response?.data?.result?.user_data?.business_info?.business_type ==
              "private"
            ) {
              navigate("/auth/member/private/complete", {
                state: {
                  token: response?.data?.result?.auth_info?.token,
                  info: response?.data?.result?.user_data,
                },
              });
            }
          }
        }

        setLoading(false);

        response?.data?.error && toast.error(response?.data?.error?.message);
      } catch (error) {
        setLoading(false);

        console.log(error);
      }
    }

    if (step == steps.STEP_OTP) {
      onCheckOTP();
    }
  };

  const stepOTP = (
    <div>
      <div className="d-flex justify-content-center mb-2">
        <InputLabel
          sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
          required
          id="otp"
        >
          Enter code sent to your phone
        </InputLabel>
      </div>
      <OtpInput onComplete={() => {}} length={6} setOtpNumber={setOtpNumber} />
    </div>
  );

  return (
    <div className="d-flex flex-column flex-root bg-dark ">
      <div className="d-flex flex-column flex-column-fluid flex-lg-row">
        <div className="d-flex flex-center col-lg-6 justify-content-center align-items-center w-lg-50 pt-5 pt-lg-0 px-4">
          <div className="d-flex flex-center flex-lg-start flex-column">
            <a href="https://partlinks.com.au" className="mb-7">
              <img
                alt="Logo"
                src="https://partlinks.com.au/panel/media/logos/custom-1.png"
              />
            </a>

            <h2 className="text-white fw-normal fs-6 m-0">2024 ©Copyright</h2>
          </div>
        </div>
        <div className="d-flex flex-center col-lg-6 justify-content-center align-items-center w-lg-50 p-5">
          <div className="card rounded-3 w-md-550px">
            <div className="card-body p-4 p-lg-5">
              <form
                className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
                onSubmit={handleSubmit(onSubmit, onError)}
              >
                <input
                  type="hidden"
                  name="_token"
                  value="uN7gYwMmJKf58ryRhT5OlgEbvguPj3Z7TMbbx2sz"
                />
                <div className="text-center mb-5">
                  <div>
                    <img src="https://partlinks.com.au/panel/media/svg/misc/smartphone.svg" />
                  </div>
                  <div
                    className={`d-flex justify-content-center align-items-center`}
                  >
                    <h1 className="text-dark fw-bolder mb-3">
                      Verify Your Mobile
                    </h1>
                  </div>

                  <div className="text-gray-500 fw-normal fs-6">
                    Enter the verification code we sent to
                  </div>
                </div>
                {stepOTP}

                <div className="d-grid mb-4">
                  <button
                    type="submit"
                    id="kt_sign_in_submit"
                    className="btn btn-primary"
                  >
                    <span
                      className={`${
                        loading ? "d-none" : "d-block"
                      } indicator-label`}
                    >
                      submit
                    </span>

                    <span
                      className={`${
                        loading ? "d-block" : "d-none"
                      } indicator-progress`}
                    >
                      Please wait...
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellCarVerify;
