import React, { useEffect, useState } from "react";
import "./Login.css";
import TextInput from "../../components/Common/TextInput";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { InputLabel } from "@mui/material";
import OtpInput from "../../components/Common/OtpInput";
import { useNavigate } from "react-router-dom";

const steps = {
  STEP_PHONE: "STEP_PHONE",
  STEP_PASSWORD: "STEP_PASSWORD",
  STEP_OTP: "SPET_OTP",
};

function Login() {
  const navigate = useNavigate();

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
          "https://partlinks.com.au/api/v1/member/auth/check_phone_number",
          { phone_number: userName }
        );
        console.log(response);
        setResponseData(response.data);
        if (response?.data?.result?.exists) {
          setStep(steps.STEP_PASSWORD);
        } else if (
          !response?.data?.result?.exists &&
          response?.data?.result !== null
        ) {
          setStep(steps.STEP_OTP);
          const response = await axios.post(
            "https://partlinks.com.au/api/v1/member/auth/resend_otp",
            { phone_number: userName }
          );
          toast("a code sent to your phone");
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

  const stepPassword = (
    <div className={` mb-3 fv-plugins-icon-container`}>
      <InputLabel
        sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
        required
        id="owners-manual"
      >
        Enter your password
      </InputLabel>
      <TextInput
        {...register("password", {
          required: responseData?.result?.exist,
        })}
        fullWidth
        type="password"
        placeholder="password"
      />

      <div
        className={`${
          errors?.password && "d-block"
        } fv-plugins-message-container invalid-feedback`}
      >
        password is required
      </div>
    </div>
  );

  const stepPhone = (
    <div className={` mb-3 fv-plugins-icon-container`}>
      <InputLabel
        sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
        required
        id="phone"
      >
        Enter your phone number
      </InputLabel>
      <TextInput
        {...register("userName", { required: true })}
        fullWidth
        placeholder="enter phone number"
      />
      <div
        className={`${
          errors?.userName && "d-block"
        } fv-plugins-message-container invalid-feedback`}
      >
        Phone number address is required
      </div>
    </div>
  );

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

  let formContent =
    step == steps.STEP_PHONE
      ? stepPhone
      : step == steps.STEP_PASSWORD
      ? stepPassword
      : step == steps.STEP_OTP
      ? stepOTP
      : null;

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
                  <div
                    className={`d-flex justify-content-center align-items-center`}
                  >
                    <i
                      onClick={() => setStep(steps.STEP_PHONE)}
                      class={` ${
                        step == steps.STEP_PHONE && "d-none"
                      } bx bx-arrow-back back-btn`}
                    ></i>
                    <h1 className="text-dark fw-bolder mb-3">
                      Sing in|Sign up
                    </h1>
                  </div>

                  <div className="text-gray-500 fw-normal fs-6">
                    Login to your account or create one
                  </div>
                </div>

                {formContent}

                <div className="fv-row mb-8">
                  <label className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="remember"
                      id="remember"
                    />
                    <span className="form-check-label fw-normal text-gray-700 fs-base ms-1">
                      Remember Me
                    </span>
                  </label>
                </div>

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3  mb-4">
                  <div></div>
                  <a
                    href="https://partlinks.com.au/password/reset"
                    className="link-primary"
                  >
                    Forgot Your Password?
                  </a>
                </div>

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
                      {step == steps.STEP_PHONE
                        ? "check"
                        : step == steps.STEP_PASSWORD
                        ? "login"
                        : "submit"}
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

                <div className="text-gray-500 text-start fw-normal fs-6">
                  Not a Member yet?
                  <br />
                  <a
                    href="https://partlinks.com.au/auth/register"
                    className="link-primary"
                  >
                    Register an account
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
