import React, { useCallback, useEffect, useState } from "react";
import "./Complete.css";
import { Autocomplete, InputLabel, TextField } from "@mui/material";
import TextInput from "../../../components/Common/TextInput";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const STEPS = {
  STEP1: 1,
  STEP2: 2,
  STEP3: 3,
};

function Complete({ memberType }) {
  const location = useLocation();
  const navigate = useNavigate();

  const businessType = location?.state?.info?.business_info?.business_type;
  const registerStep = location?.state?.info?.register_info?.register_step;

  console.log("locationState_Complete", location.state);

  const memberCategories = [
    {
      id: 1,
      title: "Mechanic Workshop",
      image:
        "/files/upload/categories/members/1/image/1713291944icon-1-order.png",
      priority: 1,
    },

    {
      id: 3,
      title: "Mobile mechanic",
      image:
        "/files/upload/categories/members/3/image/1713291975icon-1-order.png",
      priority: 5,
    },

    {
      id: 2,
      title: "Panel Beater",
      image:
        "/files/upload/categories/members/2/image/1713291959icon-1-order.png",
      priority: 10,
    },

    { id: 4, title: "Tyre Shop", image: null, priority: 20 },

    { id: 5, title: "Mobile Tyre Service", image: null, priority: 25 },

    { id: 6, title: "Used Car Dealer", image: null, priority: 30 },
    { id: 7, title: "New & Used Car Dealer", image: null, priority: 35 },
  ];

  const memberCategoriesTitles = memberCategories?.map((item) => {
    return { label: item.title, id: item.id };
  });

  console.log("memberCategoriesTitles", memberCategoriesTitles);

  const [step, setStep] = useState(STEPS.STEP1);
  const [locResults, setLocResults] = useState();
  const [locReference, setLocReference] = useState();
  const [userData, setUserData] = useState();
  const [isLocSelected, setLocSelected] = useState(false);
  const [isAddressChanged, setAddressChanged] = useState(false);

  useEffect(() => {
    registerStep == 3 && setStep(STEPS.STEP1);
    registerStep == 4 && setStep(STEPS.STEP2);
    registerStep == -1 && setStep(STEPS.STEP3);
    setUserData(location?.state?.info);
  }, []);

  useEffect(() => {
    console.log("userData", userData);
    if (userData) {
      let defaultValues = {};
      defaultValues.companyName = userData?.business_info?.company_name;
      defaultValues.companyAbnAcn = userData?.business_info?.company_abn_acn;
      defaultValues.email = userData?.base_info?.email;
      if (userData?.business_info?.category) {
        defaultValues.category = {
          label: userData?.business_info?.category?.title,
          id: userData?.business_info?.category?.id,
        };
      }
      defaultValues.address = userData?.address_info?.address;

      reset({ ...defaultValues });
    }
  }, [userData]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const companyName = watch("companyName");
  const companyAbnAcn = watch("companyAbnAcn");
  const email = watch("email");
  const category = watch("category");
  const address = watch("address");

  useEffect(() => {
    console.log("category", category);
  }, [category]);

  const accountInfo = (
    <div className="w-100">
      <div className="pb-4 pb-lg-5">
        <h2 className="fw-bold text-dark">Account Info</h2>
      </div>

      <div className="mb-4">
        <InputLabel
          required
          sx={{
            "& .MuiFormLabel-asterisk": { color: "red" },
          }}
          htmlFor="companyName"
        >
          {businessType == "business" ? "Business/Company Name" : "Alias Name"}
        </InputLabel>
        <TextInput
          {...register("companyName", {
            required: true,
          })}
          fullWidth
          id="companyName"
        />
      </div>
      <div
        className={` ${businessType == "business" ? "d-block" : "d-none"} mb-4`}
      >
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
            required: businessType == "business",
          })}
          fullWidth
          id="companyAbnAcn"
        />
      </div>
      <div className="mb-4">
        <InputLabel
          sx={{
            "& .MuiFormLabel-asterisk": { color: "red" },
          }}
          htmlFor="companyName"
        >
          Email
        </InputLabel>
        <TextInput
          {...register("email", {
            required: false,
          })}
          fullWidth
          id="email"
        />
      </div>
      <div className="mb-0 ">
        <label className="d-flex align-items-center form-label mb-5 required">
          Business/company Category
          <i
            className="fas fa-exclamation-circle ms-2 fs-7"
            data-bs-toggle="tooltip"
            aria-label="This helps us verify your account information "
            data-bs-original-title="This helps us verify your account information "
          ></i>
        </label>

        <div className="mb-0" id="account-types-member">
          <div className="row mb-3 mt-3">
            <div className="col-12 col-sm-6">
              <div className="row mb-2">
                <div className="col-lg-12 ">
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
                        options={memberCategoriesTitles}
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
                    rules={{ required: true }} // Add validation rules if needed
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
    <div className="w-100">
      <div className="pb-10 pb-lg-15">
        <h2 className="fw-bold text-dark">Address Details</h2>
      </div>

      <div className="d-flex flex-column mb-7 ">
        <div className="row">
          <div className="col-md-12 col-sm-12 col-lg-12">
            <input type="hidden" name="lat" id="lat" value="-33.8117998" />
            <input type="hidden" name="lng" id="lng" value="151.2017803" />
            <div className="row mb-3">
              <div className="col-sm-12 mb-3">
                <div className="mb-0">
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
                    className="form-control form-control-lg pac-target-input"
                    rows="3"
                    autocomplete="off"
                  ></textarea>
                </div>
                <div className={`  shadow`}>
                  <ul className="list-group">
                    {locResults?.map((item) => {
                      return (
                        <li
                          onClick={(e) => {
                            setLocReference(item.reference);
                            setValue("address", item.description);
                            setLocResults(null);
                            setLocSelected(true);
                          }}
                          className="list-group-item"
                        >
                          {item?.description}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const completed = (
    <div className="w-100">
      <div className="mb-5">
        <h2 className="fw-bold text-dark">Your almost there!</h2>
        <h5 className="text-dark">
          Make sure your information is correct before you continue.{" "}
        </h5>
      </div>

      <div className="fs-6 text-gray-600 mb-5">
        If you need to change Your Information you can use the Previous button.
        To continue press Done.
      </div>

      <div className="row mt-20">
        <div className="col-12">
          <h2>Your Information</h2>
          <hr className="bg-dark text-dark w-100 mw-200px w-md-200px w-lg-200px h-3px opacity-100" />
        </div>
      </div>
      <div className="mb-10 row">
        <div className="col-12">
          <span className="form-label mb-3 ">Full Name:</span>
          <b className="ms-2">{userData?.base_info?.full_name}</b>
        </div>
        <div className="col-12 ">
          <span className="form-label mb-3 ">Mobile:</span>
          <b className="ms-2">{userData?.base_info?.mobile}</b>
        </div>
        <div className="col-12 ">
          <span className="form-label mb-3 ">Email:</span>
          <b className="ms-2">{userData?.base_info?.email}</b>
        </div>
        <br />
        <br />
        <div className="col-12  ">
          <span className="form-label mb-3 ">Business/Company Name:</span>
          <b className="ms-2">{userData?.business_info?.company_name}</b>
        </div>
        <div className="col-12 ">
          <span className="form-label mb-3 ">ABN/ACN:</span>
          <b className="ms-2">{userData?.business_info?.company_abn_acn}</b>
        </div>
        <div className="col-12 ">
          <span className="form-label mb-3 ">Selected Category:</span>
          <b className="ms-2">{userData?.business_info?.category?.title}</b>
        </div>
        <div className="col-12">
          <span className="form-label mb-3 ">Address:</span>
          <b className="ms-2">{userData?.address_info?.address}</b>
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

  const onSubmit = async (e) => {
    if (step == STEPS.STEP1) {
      try {
        const response = await axios.post(
          "https://partlinks.com.au/api/v1/member/register/business_info",
          {
            name: companyName,
            abn_acn: companyAbnAcn,
            category_id: category.id,
            email: email,
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
          onNext();
        }

        response?.data?.error && toast.error(response?.data?.error?.message);
      } catch (error) {
        console.log(error);
      }
    }
    if (step == STEPS.STEP2) {
      if (!isAddressChanged && userData?.address_info?.address) {
        onNext();
      } else {
        try {
          const response = await axios.post(
            "https://partlinks.com.au/api/v1/member/register/address_info",
            {
              reference: locReference,
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
            onNext();
            setUserData(response?.data?.result.user_data);
          }

          response?.data?.error && toast.error(response?.data?.error?.message);
        } catch (error) {
          console.log(error);
        }
      }
    }
    if (step == STEPS.STEP3) {
      navigate("/member");
    }
  };

  const onSearch = async () => {
    try {
      const response = await axios.post(
        "https://partlinks.com.au/api/v1/member/search_location",
        {
          location: address,
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
        setLocResults(response?.data?.result?.response);
      }

      response?.data?.error && toast.error(response?.data?.error?.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("locReference", locReference);

    if (
      !isLocSelected &&
      (address !== null || address !== undefined) &&
      step == STEPS.STEP2
    ) {
      onSearch();
    } else {
      setLocSelected(false);
    }
  }, [address]);

  useEffect(() => {
    console.log("locResults", locResults);
  }, [locResults]);

  useEffect(() => {
    console.log("locReference", locReference);
  }, [locReference]);

  useEffect(() => {
    console.log("address", address);
    if (address != userData?.address_info?.address) {
      setAddressChanged(true);
    }

    if (address == "") {
      setLocResults(null);
    }
  }, [address]);

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

          <div className="d-flex flex-row-fluid justify-content-center p-4">
            <div className="stepper-nav">
              <div
                className={`stepper-item ${step == STEPS.STEP1 && "current"} `}
                data-kt-stepper-element="nav"
              >
                <div className="stepper-wrapper">
                  <div className="stepper-icon rounded-3">
                    <i className="stepper-check fas fa-check"></i>
                    <span className="stepper-number">1</span>
                  </div>

                  <div className="stepper-label">
                    <h3 className="stepper-title fs-4">Account Info</h3>
                    <div className="stepper-desc fw-normal">
                      Setup your account settings
                    </div>
                  </div>
                </div>

                <div className="stepper-line h-40px"></div>
              </div>
              <div
                className={`stepper-item ${step == STEPS.STEP2 && "current"} `}
              >
                <div className="stepper-wrapper">
                  <div className="stepper-icon">
                    <i className="stepper-check fas fa-check"></i>
                    <span className="stepper-number">2</span>
                  </div>

                  <div className="stepper-label">
                    <h3 className="stepper-title">Address Details</h3>
                    <div className="stepper-desc fw-normal">
                      Setup your address
                    </div>
                  </div>
                </div>

                <div className="stepper-line h-40px"></div>
              </div>
              <div
                className={`stepper-item ${step == STEPS.STEP3 && "current"} `}
                data-kt-stepper-element="nav"
              >
                <div className="stepper-wrapper">
                  <div className="stepper-icon">
                    <i className="stepper-check fas fa-check"></i>
                    <span className="stepper-number">3</span>
                  </div>

                  <div className="stepper-label">
                    <h3 className="stepper-title">Completed</h3>
                    <div className="stepper-desc fw-normal">
                      Your account is created
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="aside-footer d-flex justify-content-center align-items.center flex-wrap px-2 py-4">
            <div className="d-flex fw-normal">
              <a
                href="https://partlinks.com.au"
                className="px-2"
                target="_blank"
              >
                Terms
              </a>
              <a
                href="https://partlinks.com.au"
                className="px-2"
                target="_blank"
              >
                Plans
              </a>
              <a
                href="https://partlinks.com.au"
                className="px-2"
                target="_blank"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className="d-flex flex-column flex-lg-row-fluid py-5"
        id="kt_create_account_form_stepper"
      >
        <div className="d-flex justify-content-center align-items-center flex-column flex-column-fluid">
          <div className="form-container p-4 mx-auto">
            <form
              className="my-auto pb-5"
              id="kt_create_account_form_step_1"
              onSubmit={handleSubmit(onSubmit, onError)}
            >
              <div className="current">{formContentBusiness}</div>

              <div className="d-flex justify-content-between align-items-center pt-5">
                <div className={`mr-2`}>
                  <button
                    type="button"
                    className={`${
                      step == STEPS.STEP1 && "d-none"
                    } btn btn-sm btn-primary me-3`}
                    onClick={onBack}
                  >
                    <span className="indicator-label">Previous</span>
                    <span className="indicator-progress d-none">
                      Please wait...
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  </button>
                </div>
                <div>
                  <button
                    type="submit"
                    className={` ${
                      step == STEPS.STEP3 ? "btn-success" : "btn-primary"
                    } btn btn-sm px-3`}
                  >
                    <span className="indicator-label">
                      {step == STEPS.STEP3 ? (
                        <div>
                          <i className="bx bx-check"></i>
                          <span className="ms-1">Done</span>
                        </div>
                      ) : (
                        "Continue"
                      )}
                    </span>
                    <span className="indicator-progress d-none">
                      Please wait...
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
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
