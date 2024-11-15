import React, { useCallback, useState } from "react";
import "./Complete.css";
import { Autocomplete, InputLabel, TextField } from "@mui/material";
import TextInput from "../../../components/Common/TextInput";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const STEPS = {
  STEP1: 1,
  STEP2: 2,
  STEP3: 3,
};

function Complete({ memberType }) {
  const [step, setStep] = useState(STEPS.STEP1);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const companyName = watch("companyName");
  const companyAbnAcn = watch("companyAbnAcn");
  const email = watch("email");
  const category = watch("category");
  const address = watch("address");

  const accountInfo = (
    <div class="w-100">
      <div class="pb-4 pb-lg-5">
        <h2 class="fw-bold text-dark">Account Info</h2>
      </div>

      <div class="mb-4 fv-row">
        <InputLabel
          required
          sx={{
            "& .MuiFormLabel-asterisk": { color: "red" },
          }}
          htmlFor="companyName"
        >
          Business/Company Name
        </InputLabel>
        <TextInput
          {...register("companyName", {
            required: memberType == "business",
          })}
          fullWidth
          id="companyName"
        />
      </div>
      <div class="fv-row mb-4">
        <InputLabel
          required
          sx={{
            "& .MuiFormLabel-asterisk": { color: "red" },
          }}
          htmlFor="companyName"
        >
          ABN/ACN
        </InputLabel>
        <TextInput
          {...register("companyAbnAcn", {
            required: memberType == "business",
          })}
          fullWidth
          id="companyAbnAcn"
        />
      </div>
      <div class="fv-row mb-4">
        <InputLabel
          required
          sx={{
            "& .MuiFormLabel-asterisk": { color: "red" },
          }}
          htmlFor="companyName"
        >
          Email
        </InputLabel>
        <TextInput
          {...register("email", {
            required: memberType == "business",
          })}
          fullWidth
          id="email"
        />
      </div>
      <div class="mb-0 fv-row">
        <label class="d-flex align-items-center form-label mb-5 required">
          Business/company Category
          <i
            class="fas fa-exclamation-circle ms-2 fs-7"
            data-bs-toggle="tooltip"
            aria-label="This helps us verify your account information "
            data-bs-original-title="This helps us verify your account information "
            data-kt-initialized="1"
          ></i>
        </label>

        <div class="mb-0" id="account-types-member">
          <div class="row mb-3 mt-3">
            <div class="col-12 col-sm-6">
              <div class="row mb-2">
                <div class="col-lg-12 fv-row">
                  <InputLabel
                    required
                    sx={{
                      "& .MuiFormLabel-asterisk": { color: "red" },
                    }}
                    htmlFor="model"
                  >
                    <span>Categories List</span>
                  </InputLabel>
                  <Controller
                    name="category"
                    control={control}
                    defaultValue={null}
                    render={({ field, fieldState }) => (
                      <Autocomplete
                        {...field}
                        options={["aaa", "rrrr", "www", "oooo", "nnnn"]}
                        sx={{
                          "label + &": {
                            marginTop: "8px",
                          },
                          "& .MuiOutlinedInput-root": {
                            padding: "3px 12px", // Set your desired padding here
                          },
                        }}
                        disablePortal
                        onChange={(_, value) => field.onChange(value)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Select a category..."
                            InputProps={{
                              ...params.InputProps,
                              sx: {
                                "& .MuiAutocomplete-input": {
                                  padding: "10px 12px", // Set your desired padding here
                                },
                              },
                            }}
                          />
                        )}
                      />
                    )}
                    rules={{ required: memberType == "business" }} // Add validation rules if needed
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const addressDetails = (
    <div class="w-100">
      <div class="pb-10 pb-lg-15">
        <h2 class="fw-bold text-dark">Address Details</h2>
      </div>

      <div class="d-flex flex-column mb-7 fv-row">
        <div class="row">
          <div class="col-md-12 col-sm-12 col-lg-12">
            <input type="hidden" name="lat" id="lat" value="-33.8117998" />
            <input type="hidden" name="lng" id="lng" value="151.2017803" />
            <div class="row mb-3">
              <div class="col-sm-12 mb-3">
                <div class="fv-row mb-0">
                  <InputLabel
                    required
                    sx={{
                      "& .MuiFormLabel-asterisk": { color: "red" },
                    }}
                    htmlFor="address"
                  >
                    Enter location
                  </InputLabel>

                  <textarea
                    {...register("address", {
                      required: step == STEPS.STEP2,
                    })}
                    name="address"
                    id="address"
                    placeholder=""
                    class="form-control form-control-lg pac-target-input"
                    rows="3"
                    autocomplete="off"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const completed = (
    <div class="w-100">
      <div class="mb-5">
        <h2 class="fw-bold text-dark">Your almost there!</h2>
        <h5 class="text-dark">
          Make sure your information is correct before you continue.{" "}
        </h5>
      </div>

      <div class="fs-6 text-gray-600 mb-5">
        If you need to change Your Information you can use the Previous button.
        To continue press Done.
      </div>

      <div class="row mt-20">
        <div class="col-12">
          <h2>Your Information</h2>
          <hr class="bg-dark text-dark w-100 mw-200px w-md-200px w-lg-200px h-3px opacity-100" />
        </div>
      </div>
      <div class="mb-10 fv-row row">
        <div class="col-12">
          <span class="form-label mb-3 ">Full Name:</span>
          <b class="ms-2">Test1 n Test1 f</b>
        </div>
        <div class="col-12 ">
          <span class="form-label mb-3 ">Mobile:</span>
          <b class="ms-2">61444488890</b>
        </div>
        <div class="col-12 ">
          <span class="form-label mb-3 ">Email:</span>
          <b class="ms-2">hosseinansari6@gmail.com</b>
        </div>
        <br />
        <br />
        <div class="col-12  ">
          <span class="form-label mb-3 ">Business/Company Name:</span>
          <b class="ms-2">sdfs</b>
        </div>
        <div class="col-12 ">
          <span class="form-label mb-3 ">ABN/ACN:</span>
          <b class="ms-2">31665398381</b>
        </div>
        <div class="col-12 ">
          <span class="form-label mb-3 ">Selected Category:</span>
          <b class="ms-2">Panel Beater</b>
        </div>
        <div class="col-12">
          <span class="form-label mb-3 ">Address:</span>
          <b class="ms-2">4 Scott St, Willoughby NSW 2068, Australia</b>
        </div>
      </div>
    </div>
  );

  const formContentBusiness =
    step == STEPS.STEP1
      ? accountInfo
      : step == STEPS.STEP2
      ? addressDetails
      : step == STEPS.STEP3
      ? completed
      : null;

  const formContentPrivate =
    step == STEPS.STEP1
      ? addressDetails
      : step == STEPS.STEP2
      ? completed
      : null;

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onError = (e) => {
    for (let field in errors) {
      toast.error(`${field} is required`);
    }
  };

  const onSubmit = (e) => {
    console.log("Onsubmit", step);

    if (step !== STEPS.STEP3) {
      return onNext();
    }
  };

  return (
    <div className="d-flex flex-column flex-lg-row flex-column-fluid stepper stepper-pills stepper-column stepper-multistep">
      <div className="d-flex flex-column flex-lg-row-auto w-lg-250px w-xl-350px ">
        <div
          className="d-flex flex-column position-lg-fixed top-0 bottom-0 w-lg-250px w-xl-350px aside bgi-size-cover bgi-position-center"
          style={{
            backgroundImage:
              "url('https://partlinks.com.au/panel/media/misc/auth-bg.png')",
          }}
        >
          <div className="d-flex justify-content-center align-items-center py-4 py-lg-5 mt-lg-5">
            <a href="https://partlinks.com.au">
              <img
                alt="Logo"
                src="https://partlinks.com.au/panel/media/logos/custom-1.png"
              />
            </a>
          </div>

          <div class="d-flex flex-row-fluid justify-content-center p-4">
            <div class="stepper-nav">
              <div
                class={`stepper-item ${step == STEPS.STEP1 && "current"} ${
                  memberType != "business" && "d-none"
                } `}
                data-kt-stepper-element="nav"
              >
                <div class="stepper-wrapper">
                  <div class="stepper-icon rounded-3">
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">1</span>
                  </div>

                  <div class="stepper-label">
                    <h3 class="stepper-title fs-4">Account Info</h3>
                    <div class="stepper-desc fw-normal">
                      Setup your account settings
                    </div>
                  </div>
                </div>

                <div class="stepper-line h-40px"></div>
              </div>
              <div
                class={`stepper-item ${
                  (step == STEPS.STEP2 &&
                    memberType == "business" &&
                    "current") ||
                  (step == STEPS.STEP1 && memberType == "private" && "current")
                } `}
              >
                <div class="stepper-wrapper">
                  <div class="stepper-icon">
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">2</span>
                  </div>

                  <div class="stepper-label">
                    <h3 class="stepper-title">Address Details</h3>
                    <div class="stepper-desc fw-normal">Setup your address</div>
                  </div>
                </div>

                <div class="stepper-line h-40px"></div>
              </div>
              <div
                class={`stepper-item ${
                  (step == STEPS.STEP3 &&
                    memberType == "business" &&
                    "current") ||
                  (step == STEPS.STEP2 && memberType == "private" && "current")
                } `}
                data-kt-stepper-element="nav"
              >
                <div class="stepper-wrapper">
                  <div class="stepper-icon">
                    <i class="stepper-check fas fa-check"></i>
                    <span class="stepper-number">3</span>
                  </div>

                  <div class="stepper-label">
                    <h3 class="stepper-title">Completed</h3>
                    <div class="stepper-desc fw-normal">
                      Your account is created
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="aside-footer d-flex justify-content-center align-items.center flex-wrap px-2 py-4">
            <div class="d-flex fw-normal">
              <a href="https://partlinks.com.au" class="px-2" target="_blank">
                Terms
              </a>
              <a href="https://partlinks.com.au" class="px-2" target="_blank">
                Plans
              </a>
              <a href="https://partlinks.com.au" class="px-2" target="_blank">
                Contact Us
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
          <div class="form-container p-4 mx-auto">
            <form
              class="my-auto pb-5"
              id="kt_create_account_form_step_1"
              onSubmit={handleSubmit(onSubmit, onError)}
            >
              <div class="current">
                {memberType == "business"
                  ? formContentBusiness
                  : memberType == "private"
                  ? formContentPrivate
                  : null}
              </div>

              <div class="d-flex justify-content-between align-items-center pt-5">
                <div class={`mr-2`}>
                  <button
                    type="button"
                    class={`${
                      step == STEPS.STEP1 && "d-none"
                    } btn btn-sm btn-primary me-3`}
                    onClick={onBack}
                  >
                    <span class="indicator-label">Previous</span>
                    <span class="indicator-progress d-none">
                      Please wait...
                      <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  </button>
                </div>
                <div>
                  <button
                    type="submit"
                    class={` ${
                      (step == STEPS.STEP3 && memberType == "business") ||
                      (step == STEPS.STEP2 && memberType == "private")
                        ? "btn-success"
                        : "btn-primary"
                    } btn btn-sm px-3`}
                  >
                    <span class="indicator-label">
                      {(step == STEPS.STEP3 && memberType == "business") ||
                      (step == STEPS.STEP2 && memberType == "private") ? (
                        <div>
                          <i class="bx bx-check"></i>
                          <span className="ms-1">Done</span>
                        </div>
                      ) : (
                        "Continue"
                      )}
                    </span>
                    <span class="indicator-progress d-none">
                      Please wait...
                      <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Complete;
