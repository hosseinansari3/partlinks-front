import React, { useEffect } from "react";
import "./Login.css";
import TextInput from "../../components/Common/TextInput";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function Login() {
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

  const onSubmit = (e) => {
    console.log("Onsubmit");
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
                className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
                onSubmit={handleSubmit(onSubmit, onError)}
              >
                <input
                  type="hidden"
                  name="_token"
                  value="uN7gYwMmJKf58ryRhT5OlgEbvguPj3Z7TMbbx2sz"
                />
                <div className="text-center mb-5">
                  <h1 className="text-dark fw-bolder mb-3">Sign In</h1>

                  <div className="text-gray-500 fw-normal fs-6">
                    Login to your account
                  </div>
                </div>

                <div className="separator separator-content my-5">
                  <span className="w-100 mw-300px text-gray-500 fw-normal fs-6">
                    with email or phone number
                  </span>
                </div>

                <div className="fv-row mb-3 fv-plugins-icon-container">
                  <div
                    id="mobile"
                    className={`${
                      !isNaN(userName) && !isNaN(parseFloat(userName))
                        ? "d-block"
                        : "d-none"
                    } mb-2`}
                  >
                    <img
                      className=""
                      width="20px"
                      src="https://partlinks.com.au/panel/media/flags/australia.svg"
                      alt="australia"
                    />
                    <span className="fw-bold p-2 text-warning">+61</span>
                  </div>
                  <div
                    id="email"
                    className={`${
                      (!isNaN(userName) && !isNaN(parseFloat(userName))) ||
                      userName == ""
                        ? "d-none"
                        : "d-block"
                    } mb-2`}
                  >
                    <i class="bx bx-envelope"></i>
                    <span
                      className="fw-bold p-2 text-warning"
                      style={{ width: "40px" }}
                    >
                      Email Address
                    </span>
                  </div>
                  <TextInput
                    {...register("userName", { required: true })}
                    fullWidth
                    placeholder="enter email or phone number"
                  />
                  <div
                    className={`${
                      errors?.userName && "d-block"
                    } fv-plugins-message-container invalid-feedback`}
                  >
                    Email or Phone number address is required
                  </div>
                </div>
                <div className="fv-row mb-3 fv-plugins-icon-container">
                  <TextInput
                    {...register("password", { required: true })}
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
                    <span className="indicator-label">Sign In</span>

                    <span className="indicator-progress d-none">
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
