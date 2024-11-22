import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "./RegisterForm.css";
import PasswordStrength from "../../Common/PasswordStrength";
import TextInput from "../../Common/TextInput";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterForm({ accountType }) {
  const location = useLocation();
  const navigate = useNavigate();

  console.log("locationState", location.state);

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

  const [loading, setLoading] = useState(false);
  const [passwordStrengthScore, setPasswordStrengthScore] = useState();

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const password = watch("password");
  const repeatPassword = watch("repeatPassword");
  const termsAndConditions = watch("termsAndConditions");

  /* useEffect(() => {
    if (
      !/^(4|04)(\s?[0-9]{2}\s?)([0-9]{3}\s?[0-9]{3}|[0-9]{2}\s?[0-9]{2}\s?[0-9]{2})$/.test(
        mobile
      ) &&
      mobile != ""
    ) {
      setError("mobileNotValid", {
        type: "custom",
        message: "The value is not a valid mobile number",
      });
      console.log("Mobile", typeof mobile);
    } else {
      clearErrors("mobileNotValid");
    }
  }, [mobile]);

  */

  useEffect(() => {
    if (passwordStrengthScore < 5 && password !== "") {
      setError("passwordStrengthScore", {
        type: "custom",
        message: "Please enter valid password",
      });
    } else {
      clearErrors("passwordStrengthScore");
    }
  }, [passwordStrengthScore]);

  useEffect(() => {
    if (password !== repeatPassword) {
      setError("confirmNotSame", {
        type: "custom",
        message: "The password and its confirm are not the same",
      });
    }
    if (password == repeatPassword) {
      clearErrors("confirmNotSame");
    }
  }, [repeatPassword]);

  const onError = (e) => {
    if (errors) {
      toast.error("Please complete required items and try again.");
      console.log("errors", errors);
    }
  };

  const onSubmit = async (e) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://partlinks.com.au/api/v1/member/register/base_info",
        {
          name: firstName,
          family: lastName,
          password: password,
          password_confirmation: repeatPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${location?.state?.token}`,
          },
        }
      );
      console.log(response);

      if (response?.data?.done) {
        if (response?.data?.result?.business_type == "private") {
          navigate("/auth/member/private/complete", {
            state: {
              info: {
                business_info: {
                  business_type: response?.data?.result?.business_type,
                },
              },
              token: location?.state?.token,
            },
          });
        }
        if (response?.data?.result?.business_type == "business") {
          navigate("/auth/member/business/complete", {
            state: {
              info: {
                business_info: {
                  business_type: response?.data?.result?.business_type,
                },
              },
              token: location?.state?.token,
            },
          });
        }
      }

      setLoading(false);

      response?.data?.error && toast.error(response?.data?.error?.message);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

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
                onSubmit={handleSubmit(onSubmit, onError)}
                className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
                novalidate="novalidate"
                id="kt_sign_up_form"
                action="https://partlinks.com.au/auth/member/business/register/store"
                method="post"
              >
                <input
                  type="hidden"
                  name="_token"
                  value="dUW2dhCxzlp2Q3FcTbKCl1s2KZwuNkd7CkfJEWrX"
                />
                <div className="text-center mb-5">
                  <h1 className="text-dark fw-bolder mb-1">
                    Sign Up {accountType}
                  </h1>

                  <div className="text-gray-500 fw-semibold fs-6">
                    register {accountType} account
                  </div>
                </div>

                <div className="fv-row mb-4 fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid">
                  <TextInput
                    {...register("firstName", { required: true })}
                    fullWidth
                    placeholder="First Name"
                  />
                  <div
                    className={` ${
                      errors?.firstName && "d-block"
                    } fv-plugins-message-container invalid-feedback`}
                  >
                    <div>First Name is required</div>
                  </div>
                </div>

                <div className="fv-row mb-4 fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid">
                  <TextInput
                    {...register("lastName", { required: true })}
                    fullWidth
                    placeholder="Last Name"
                  />

                  <div
                    className={` ${
                      errors?.lastName && "d-block"
                    } fv-plugins-message-container invalid-feedback`}
                  >
                    <div data-field="family" data-validator="notEmpty">
                      Last Name is required
                    </div>
                  </div>
                </div>

                <div
                  className="fv-row mb-4 fv-plugins-icon-container fv-plugins-bootstrap5-row-valid"
                  data-kt-password-meter="true"
                >
                  <div className="mb-1">
                    <div className="position-relative mb-1">
                      <Controller
                        name="password"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, fieldState }) => (
                          <PasswordStrength
                            setStregthScore={setPasswordStrengthScore}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="text-muted">
                    Use 8 or more characters with a mix of uppercase and
                    lowercase letters, numbers &amp; symbols.
                  </div>
                  <div
                    className={` ${
                      errors?.password && "d-block"
                    } fv-plugins-message-container invalid-feedback`}
                  >
                    The password is required
                  </div>
                  <div
                    className={` ${
                      errors?.passwordStrengthScore && "d-block"
                    } fv-plugins-message-container invalid-feedback`}
                  >
                    {errors?.passwordStrengthScore?.message}
                  </div>
                </div>

                <div className="fv-row mb-4 fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid">
                  <TextInput
                    {...register("repeatPassword", { required: true })}
                    type="password"
                    fullWidth
                    placeholder="Repreat Password"
                  />

                  <div
                    className={` ${
                      errors?.repeatPassword && "d-block"
                    } fv-plugins-message-container invalid-feedback`}
                  >
                    The password confirmation is required
                  </div>
                  <div
                    className={` ${
                      errors?.confirmNotSame && "d-block"
                    } fv-plugins-message-container invalid-feedback`}
                  >
                    {errors?.confirmNotSame?.message}
                  </div>
                </div>

                <div className="fv-row mb-4 fv-plugins-icon-container fv-plugins-bootstrap5-row-invalid">
                  <label className="form-check form-check-inline">
                    <input
                      {...register("termsAndConditions", { required: true })}
                      className="form-check-input"
                      type="checkbox"
                      name="termsAndConditions"
                    />
                    <span className="form-check-label fw-semibold text-gray-700 fs-base ms-1">
                      I have read, understand and agree to the PartLinks{" "}
                      <a
                        target="_blank"
                        href="https://partlinks.com.au/terms-conditions"
                        className="ms-1 link-primary"
                      >
                        Terms and Conditions
                      </a>
                      , including the{" "}
                      <a
                        target="_blank"
                        href="https://partlinks.com.au/privacy-policy"
                        className="ms-1 link-primary"
                      >
                        Privacy Policy
                      </a>
                      .
                    </span>
                  </label>
                  <div
                    className={` ${
                      errors?.termsAndConditions && "d-block"
                    } fv-plugins-message-container invalid-feedback`}
                  >
                    <div data-field="toc" data-validator="notEmpty">
                      You must accept the terms and conditions
                    </div>
                  </div>
                </div>

                <div className="d-grid mb-5">
                  <button
                    type="submit"
                    id="kt_sign_up_submit"
                    className="btn btn-primary"
                  >
                    <span
                      className={`${
                        loading ? "d-none" : "d-block"
                      } indicator-label`}
                    >
                      Sign up
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
                <div className="text-gray-500 text-center fw-semibold fs-6">
                  Already have an Account?
                  <a
                    href="https://partlinks.com.au/login"
                    className="link-primary fw-semibold"
                  >
                    Sign in
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

export default RegisterForm;
