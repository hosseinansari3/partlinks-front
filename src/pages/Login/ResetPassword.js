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

function ResetPassword() {
  const navigate = useNavigate();

  const [responseData, setResponseData] = useState();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(steps.STEP_PHONE);
  const [otpNumber, setOtpNumber] = useState(null); // State to store OTP as a number
  const [authToken, setAuthToken] = useState();

  useEffect(() => {
    console.log("authToken", authToken);
  }, [authToken]);

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

  const phone = watch("phone");
  const password = watch("password");
  const passwordConfirm = watch("passwordConfirm");

  useEffect(() => {
    console.log("number", phone);
  }, [phone]);

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
        { phone_number: phone, otp: otpNumber }
      );
      console.log(response);
      setResponseData(response.data);
      if (response?.data?.result?.match) {
        if (response?.data?.result?.need_registration) {
          toast.error("you dont have an account");
        } else {
          setAuthToken(response?.data?.result?.auth_info?.token);
          setStep(steps.STEP_PASSWORD);
        }
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
          "https://partlinks.com.au/api/v1/member/auth/resend_otp",
          { phone_number: phone }
        );
        setLoading(false);
        setResponseData(response.data);
        console.log("OTPRESPONSE", response.data);
        if (response.data.result.sent) {
          toast("a code sent to your phone");
          setStep(steps.STEP_OTP);
        }

        response?.data?.error && toast.error(response?.data?.error?.message);
      } catch (error) {
        setLoading(false);

        console.log(error);
      }
    }

    if (step == steps.STEP_PASSWORD) {
      try {
        setLoading(true);
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        };
        const response = await axios.post(
          "https://partlinks.com.au/api/v1/member/reset_password",
          {
            password: password,
            password_confirmation: passwordConfirm,
          },
          config
        );
        console.log(response);
        if (response?.data?.done) {
          toast("your password was reset");
          navigate("/login");
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
    <div>
      <div className={` mb-3 fv-plugins-icon-container`}>
        <InputLabel
          sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
          required
          id="owners-manual"
        >
          Enter your new password
        </InputLabel>
        <TextInput
          {...register("password", {
            required: step == steps.STEP_PASSWORD,
          })}
          fullWidth
          type="password"
          placeholder="new password"
        />

        <div
          className={`${
            errors?.password && "d-block"
          } fv-plugins-message-container invalid-feedback`}
        >
          password is required
        </div>
      </div>
      <div className={` mb-3 fv-plugins-icon-container`}>
        <InputLabel
          sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
          required
          id="owners-manual"
        >
          Confirm your new password
        </InputLabel>
        <TextInput
          {...register("passwordConfirm", {
            required: step == steps.STEP_PASSWORD,
          })}
          fullWidth
          type="password"
          placeholder="new password confirmation"
        />

        <div
          className={`${
            errors?.password && "d-block"
          } fv-plugins-message-container invalid-feedback`}
        >
          password confirmation is required
        </div>
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
        {...register("phone", { required: true })}
        fullWidth
        placeholder="enter phone number"
      />
      <div
        className={`${
          errors?.userName && "d-block"
        } fv-plugins-message-container invalid-feedback`}
      >
        Phone number is required
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
    <>
      <div className="bg-dark w-100 h-100 position-absolute"></div>
      <div className="d-flex flex-column flex-root bg-dark">
        <div className="d-flex flex-column flex-column-fluid flex-lg-row z-3">
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
                      className={`d-flex position-relative ${
                        step == steps.STEP_PHONE
                          ? "justify-content-center"
                          : "justify-content-between"
                      } align-items-center`}
                    >
                      <div className="d-flex align-items-center justify-content-center">
                        <i
                          onClick={() => setStep(steps.STEP_PHONE)}
                          class={` ${
                            step == steps.STEP_PHONE && "d-none"
                          } bx bx-arrow-back back-btn`}
                        ></i>
                      </div>
                      <div className="d-flex align-items-center justify-content-center">
                        <h1 className="text-dark fw-bolder mb-3">
                          Reset Password
                        </h1>
                      </div>
                    </div>
                  </div>

                  {formContent}

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
                          ? "send code"
                          : step == steps.STEP_PASSWORD
                          ? "reset password"
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
