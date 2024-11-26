import React, { useCallback, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
} from "@mui/material";
import TextInput from "../../components/Common/TextInput";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Controller, useForm } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import "./SellCar.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoading } from "../../Redux/preloaderSlice";

const STEPS = {
  STEP_CAR: 0,
  STEP_CAR_1: 1,
  STEP_USER: 2,
};

function SellCar() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [step, setStep] = useState(STEPS.STEP_CAR);
  const [data, setdata] = useState();
  const [models, setModels] = useState();

  const userData = JSON.parse(localStorage.getItem("userData"));
  const authToken = localStorage.getItem("authToken");

  console.log("userData", userData);
  console.log("authToken", authToken);

  useEffect(() => {
    if (userData) {
      let defaultValues = {};
      defaultValues.mobile = userData?.base_info?.mobile;

      reset({ ...defaultValues });
    }
  }, []);

  const makes = data?.makes?.map((item) => {
    return { label: item?.name, id: item?.id };
  });
  const years = data?.years?.map((item) => {
    return { label: item?.name, id: item?.id };
  });

  const plateNumber = watch("plateNumber", "");
  const state = watch("state", "");
  const vinNumber = watch("vinNumber", "");
  const make = watch("make");
  const model = watch("model", "");
  const year = watch("year", "");
  const bodyType = watch("bodyType", "");
  const transmission = watch("transmission", "");
  const fuel = watch("fuel", "");
  const cylinders = watch("cylinders", "");
  const series = watch("series", "");
  const color = watch("color", "");
  const kilometres = watch("kilometres", "");
  const numberOfKeys = watch("numberOfKeys", "");
  const ownersManual = watch("ownersManual", "");
  const serviceHistory = watch("serviceHistory", "");
  const interiorRate = watch("interiorRate");
  const exteriorRate = watch("exteriorRate");
  const tyresRate = watch("tyresRate");
  const mobile = watch("mobile", "");
  const description = watch("description", "");

  const onGetData = async () => {
    try {
      dispatch(setLoading(true));

      const response = await axios.get(
        "https://partlinks.com.au/api/v1/member/selling/get_data"
      );
      setdata(response?.data?.result);
      dispatch(setLoading(false));

      response?.data?.error && toast.error(response?.data?.error?.message);
    } catch (error) {
      dispatch(setLoading(false));

      console.log(error);
    }
  };

  const onGetModels = async () => {
    try {
      dispatch(setLoading(true));

      const response = await axios.post(
        "https://partlinks.com.au/api/v1/member/selling/get_models",
        { make_id: make?.id }
      );
      dispatch(setLoading(false));

      const models = response?.data?.result?.models?.map((item) => {
        return { label: item?.name, id: item?.id };
      });
      setModels(models);

      response?.data?.error && toast.error(response?.data?.error?.message);
    } catch (error) {
      dispatch(setLoading(true));

      console.log(error);
    }
  };

  useEffect(() => {
    if (make != null || make != undefined) {
      onGetModels();
    }
  }, [make]);

  useEffect(() => {
    onGetData();
  }, []);

  useEffect(() => {
    if (step == STEPS.STEP_CAR_1) {
      if (!/^[a-zA-Z]+$/u.test(color) && color) {
        setError("colorNotValid", {
          type: "custom",
          message: "entered color is not valid",
        });
      } else {
        clearErrors("colorNotValid");
      }
    }
  }, [color, step]);

  useEffect(() => {
    if (step == STEPS.STEP_USER) {
      if (
        !/^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/.test(
          mobile
        ) &&
        mobile
      ) {
        setError("phoneNotValid", {
          type: "custom",
          message: "entered Phone is not valid",
        });
      } else {
        clearErrors("phoneNotValid");
      }
    }
  }, [mobile, step]);

  useEffect(() => {
    console.log("interiorRate", interiorRate);
  }, [interiorRate]);

  const stepCar1 = (
    <div className="step-car">
      <div className="row">
        <div className="col-12">
          <div className="row mb-2">
            <div className="col-6">
              <InputLabel htmlFor="plate-number">Plate Number</InputLabel>
              <TextInput
                {...register("plateNumber", { required: vinNumber == "" })}
                fullWidth
                placeholder="Enter Plate Number"
                id="plate-number"
              />
            </div>
            <div className="col-6">
              <InputLabel id="state">State</InputLabel>
              <Select
                {...register("state", { required: plateNumber != "" })}
                fullWidth
                input={<TextInput />}
                labelId="state"
                id="state"
                //inputProps={{ "aria-label": "Without label" }}
                //defaultValue={0}
                displayEmpty
                value={state}
              >
                <MenuItem hidden value="">
                  <span className="custom-placeholder">Select State</span>
                </MenuItem>
                {data?.states?.map((state) => {
                  return <MenuItem value={state?.id}>{state?.name}</MenuItem>;
                })}
              </Select>
            </div>
          </div>
          <div className="d-flex flex-column mb-2">
            <label className="d-flex align-items-center fs-6 fw-semibold mb-2 mt-2">
              <b>OR</b>
            </label>
          </div>
          <div className="d-flex flex-column mb-5">
            <InputLabel htmlFor="vin-number">VIN</InputLabel>
            <TextInput
              {...register("vinNumber", {
                required: plateNumber == "",
              })}
              fullWidth
              placeholder="Enter vin number"
              id="vin-number"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const stepCar2 = (
    <div className="step-car2">
      <div className="row mb-2">
        <div className="col-6 mb-3">
          <InputLabel
            sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
            required
            htmlFor="make"
          >
            <span>Make</span>
          </InputLabel>
          <Controller
            name="make"
            control={control}
            defaultValue={null}
            render={({ field, fieldState }) => (
              <Autocomplete
                {...field}
                options={makes}
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
                    placeholder="Select a make..."
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
            rules={{ required: step == STEPS.STEP_CAR_1 }} // Add validation rules if needed
          />
        </div>
        <div className="col-6 mb-3">
          <InputLabel
            required
            sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
            htmlFor="model"
          >
            <span>Model</span>
          </InputLabel>
          <Controller
            name="model"
            control={control}
            defaultValue={null}
            render={({ field, fieldState }) => (
              <Autocomplete
                {...field}
                disabled={make == null || !models}
                options={models}
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
                    placeholder="Select a make..."
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
            rules={{ required: step == STEPS.STEP_CAR_1 }} // Add validation rules if needed
          />
        </div>
        <div className="col-6 mb-3">
          <InputLabel
            required
            sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
            htmlFor="year"
          >
            <span>Year</span>
          </InputLabel>
          <Controller
            name="year"
            control={control}
            defaultValue={null}
            render={({ field, fieldState }) => (
              <Autocomplete
                {...field}
                options={years}
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
                    placeholder="Select a make..."
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
            rules={{ required: step == STEPS.STEP_CAR_1 }} // Add validation rules if needed
          />
        </div>
        <div className="col-6 mb-3">
          <InputLabel
            sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
            required
            id="body-type"
          >
            Body Type
          </InputLabel>
          <Select
            {...register("bodyType", { required: step == STEPS.STEP_CAR_1 })}
            fullWidth
            input={<TextInput />}
            labelId="body-type"
            id="body-type"
            //inputProps={{ "aria-label": "Without label" }}
            //defaultValue={0}
            displayEmpty
            value={bodyType}
          >
            <MenuItem hidden value="">
              Select Body Type
            </MenuItem>
            {data?.body_types?.map((type) => {
              return <MenuItem value={type?.id}>{type?.name}</MenuItem>;
            })}
          </Select>
        </div>
        <div className="col-6 mb-3">
          <InputLabel
            sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
            required
            id="transmission"
          >
            Transmission
          </InputLabel>
          <Select
            {...register("transmission", {
              required: step == STEPS.STEP_CAR_1,
            })}
            fullWidth
            input={<TextInput />}
            labelId="transmission"
            id="transmission"
            //inputProps={{ "aria-label": "Without label" }}
            //defaultValue={0}
            displayEmpty
            value={transmission}
          >
            <MenuItem hidden value="">
              Select Transmission
            </MenuItem>
            {data?.transmissions?.map((item) => {
              return <MenuItem value={item?.id}>{item?.name}</MenuItem>;
            })}
          </Select>
        </div>
        <div className="col-6 mb-3">
          <InputLabel
            sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
            required
            id="fuel"
          >
            Fuel
          </InputLabel>
          <Select
            {...register("fuel", { required: step == STEPS.STEP_CAR_1 })}
            fullWidth
            input={<TextInput />}
            labelId="fuel"
            id="fuel"
            //inputProps={{ "aria-label": "Without label" }}
            //defaultValue={0}
            displayEmpty
            value={fuel}
          >
            <MenuItem hidden value="">
              Select Fuel
            </MenuItem>
            {data?.fuels?.map((item) => {
              return <MenuItem value={item?.id}>{item?.name}</MenuItem>;
            })}
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </div>
        <div className="col-6 mb-3">
          <InputLabel
            sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
            required
            htmlFor="cylinders"
          >
            <span>cylinders</span>
          </InputLabel>
          <TextInput
            {...register("cylinders", { required: step == STEPS.STEP_CAR_1 })}
            fullWidth
            id="cylinders"
          />
        </div>
        <div className="col-6 mb-3">
          <InputLabel
            sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
            required
            htmlFor="series"
          >
            <span>series</span>
          </InputLabel>
          <TextInput
            {...register("series", { required: step == STEPS.STEP_CAR_1 })}
            fullWidth
            id="series"
          />
        </div>
        <div className="col-6 mb-3">
          <InputLabel
            sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
            required
            htmlFor="color"
          >
            <span>color</span>
          </InputLabel>
          <TextInput
            {...register("color", { required: step == STEPS.STEP_CAR_1 })}
            fullWidth
            id="plate-number"
          />
        </div>
      </div>
    </div>
  );

  const stepUser = (
    <div className="step-user row mb-2">
      <div className="row mb-4 mx-auto">
        <div className="col-12">
          <h3>Car Details</h3>
        </div>
      </div>
      <div className="row mb-2 mx-auto">
        <div className="col-6 mb-3">
          <InputLabel
            sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
            required
            htmlFor="kilometres"
          >
            <span>Kilometres</span>
          </InputLabel>
          <TextInput
            {...register("kilometres", { required: step == STEPS.STEP_USER })}
            fullWidth
            id="kilometres"
          />
        </div>
        <div className="col-6 mb-3">
          <InputLabel
            sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
            required
            id="number-of-keys"
          >
            Number Of Keys
          </InputLabel>
          <Select
            {...register("numberOfKeys", { required: step == STEPS.STEP_USER })}
            fullWidth
            input={<TextInput />}
            labelId="number-of-keys"
            id="number-of-keys"
            //inputProps={{ "aria-label": "Without label" }}
            //defaultValue={0}
            displayEmpty
            value={numberOfKeys}
          >
            <MenuItem hidden value="">
              <span className="text-secondary">Select...</span>
            </MenuItem>
            {data?.number_of_keys?.map((item) => {
              return <MenuItem value={item?.id}>{item?.name}</MenuItem>;
            })}
          </Select>
        </div>
        <div className="col-6 mb-3">
          <InputLabel
            sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
            required
            id="owners-manual"
          >
            Owners Manual
          </InputLabel>
          <Select
            {...register("ownersManual", { required: step == STEPS.STEP_USER })}
            fullWidth
            input={<TextInput />}
            labelId="owners-manual"
            id="owners-manual"
            //inputProps={{ "aria-label": "Without label" }}
            //defaultValue={0}
            displayEmpty
            value={ownersManual}
          >
            <MenuItem hidden value="">
              <span className="text-secondary">Select...</span>
            </MenuItem>
            {data?.owners_manual?.map((item) => {
              return <MenuItem value={item?.id}>{item?.name}</MenuItem>;
            })}
          </Select>
        </div>
        <div className="col-6 mb-3">
          <InputLabel
            sx={{ "& .MuiFormLabel-asterisk": { color: "red" } }}
            required
            id="service-history"
          >
            Service History
          </InputLabel>
          <Select
            {...register("serviceHistory", {
              required: step == STEPS.STEP_USER,
            })}
            fullWidth
            input={<TextInput />}
            labelId="service-history"
            id="service-history"
            //inputProps={{ "aria-label": "Without label" }}
            //defaultValue={0}
            displayEmpty
            value={serviceHistory}
          >
            <MenuItem hidden value="">
              <span className="text-secondary">Select...</span>
            </MenuItem>
            {data?.service_history?.map((item) => {
              return <MenuItem value={item?.id}>{item?.name}</MenuItem>;
            })}
          </Select>
        </div>
      </div>
      <div className="row mb-2 mt-5 mx-auto">
        <div className="col-12 mb-2">
          <h6>Rate the condition of the</h6>
        </div>
        <div className="col-12 mb-2 d-flex flex-column flex-start">
          <span>Interior</span>

          <Controller
            name="interiorRate"
            control={control}
            rules={{ required: step == STEPS.STEP_USER }} // Optional: Add validation rules
            render={({ field, fieldState }) => (
              <Rating
                sx={{ padding: "6px" }}
                {...field}
                onChange={(_, value) => field.onChange(value)} // Update value on change
              />
            )}
          />
        </div>
        <div className="col-12 mb-2 d-flex flex-column flex-start">
          <span>Exterior</span>
          <Controller
            name="exteriorRate"
            control={control}
            rules={{ required: step == STEPS.STEP_USER }} // Optional: Add validation rules
            render={({ field, fieldState }) => (
              <Rating
                sx={{ padding: "6px" }}
                {...field}
                onChange={(_, value) => field.onChange(value)} // Update value on change
              />
            )}
          />
        </div>
        <div className="col-12 mb-2 d-flex flex-column flex-start">
          <span>Tyers</span>
          <Controller
            name="tyersRate"
            control={control}
            rules={{ required: step == STEPS.STEP_USER }} // Optional: Add validation rules
            render={({ field, fieldState }) => (
              <Rating
                sx={{ padding: "6px" }}
                {...field}
                onChange={(_, value) => field.onChange(value)} // Update value on change
              />
            )}
          />
        </div>
      </div>
      <div className="row mb-2 mx-auto">
        <div className="col-12 mb-2">
          <TextInput
            {...register("mobile", { required: step == STEPS.STEP_USER })}
            type="number"
            fullWidth
            disabled={userData}
            placeholder="Mobile"
            id="mobile"
          />
        </div>
        <div className="col-12">
          <div className="row mb-2">
            <InputLabel htmlFor="description">
              <span className="">Description</span>
              <small className="ms-2 text-muted">(Optional)</small>
            </InputLabel>

            <TextField
              {...register("description", { required: false })}
              id="description"
              multiline
            />
          </div>
        </div>
      </div>
    </div>
  );

  const cardContent =
    step == STEPS.STEP_CAR
      ? stepCar1
      : step == STEPS.STEP_CAR_1
      ? stepCar2
      : stepUser;

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const handleSendData = async () => {
    console.log("year.name", year.label);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      };

      let response = {};
      dispatch(setLoading(true));

      if (userData && authToken) {
        response = await axios.post(
          "https://partlinks.com.au/api/v1/member/selling/set_data",
          {
            make: make.id,
            model: model.id,
            transmission: transmission,
            kilometres: kilometres,
            number_of_keys: numberOfKeys,
            body_type: bodyType,
            series: series,
            owners_manual: ownersManual,
            service_history: serviceHistory,
            cylinders: cylinders,
            year: year.id,
            fuel: fuel,
            vin: vinNumber, // or required state
            color: color,
            mobile: mobile,
            description: description,
            tyres_star: tyresRate,
            exterior_star: exteriorRate,
            interior_star: interiorRate,
          },
          config
        );
      } else {
        response = await axios.post(
          "https://partlinks.com.au/api/v1/member/selling/set_data",
          {
            make: make.id,
            model: model.id,
            transmission: transmission,
            kilometres: kilometres,
            number_of_keys: numberOfKeys,
            body_type: bodyType,
            series: series,
            owners_manual: ownersManual,
            service_history: serviceHistory,
            cylinders: cylinders,
            year: year.id,
            fuel: fuel,
            vin: vinNumber, // or required state
            color: color,
            mobile: mobile,
          }
        );
      }
      dispatch(setLoading(false));

      console.log("FinalStepREs", response);

      if (response?.data?.done) {
        if (!response?.data?.result?.create_new_user && userData && authToken) {
          navigate("/sell-car/success", {
            state: { sellingToken: response?.data?.result?.selling_token },
          });
        }
        if (
          !userData ||
          !authToken ||
          response?.data?.result?.create_new_user
        ) {
          navigate("/sell-car/verify", {
            state: { sellingToken: response?.data?.result?.selling_token },
          });
        }
      }

      response?.data?.error && toast.error(response?.data?.error?.message);
    } catch (error) {
      console.log(error);
    }
  };

  const onError = (e) => {
    let plateNumberErr = false;
    let vinNumberErr = false;

    for (let field in errors) {
      if (field == "plateNumber") {
        plateNumberErr = true;
      } else if (field == "vinNumber") {
        vinNumberErr = true;
      } else if (field == "colorNotValid") {
        toast.error("entered color is not valid");
      } else if (field == "phoneNotValid") {
        toast.error("entered phone is not valid");
      } else {
        toast.error(`${field} is required`);
      }

      if (plateNumberErr && vinNumberErr) {
        toast.error("please Enter plate number or car vin");
      }
    }

    console.log("errors", errors);
  };

  const onSubmit = (e) => {
    console.log("Onsubmit", step);
    console.log("Errors", errors);

    if (step !== STEPS.STEP_USER) {
      return onNext();
    } else {
      handleSendData();
    }
  };

  return (
    <div className="bg-light">
      <div className="container w-100 mw-900px m-auto mt-10">
        <div className="row flex-wrap-reverse flex-md-wrap mb-5">
          <div className="col-12 col-sm-12 col-md-6 mt-5 my-slider">
            <div className="card">
              <div className="card-header">
                <div className="mt-5">
                  <h1>Receive Multiple Offers</h1>
                  <h1>
                    <span>From</span>
                    <span className="text-warning ms-2">Dealers Aus-Wide</span>
                  </h1>
                </div>
              </div>
              <div className="card-body">
                <div className="mt-5">
                  <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <div className="mt-2 mb-2">
                      {cardContent}
                      <div
                        className="d-flex justify-content-between align-items-center pt-2"
                        id="info-content"
                      >
                        <div className="mr-2">
                          <button
                            type="button"
                            onClick={onBack}
                            className={`${
                              step == STEPS.STEP_CAR && "d-none"
                            } btn btn-sm btn-warning me-3`}
                            onclick="backToShowSellingCarForm()"
                          >
                            <span className="svg-icon svg-icon-4 me-1">
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
                            Back
                          </button>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="btn btn-sm btn-primary"
                            id="continue-selling-car-btn"
                          >
                            <span className="indicator-label">
                              Continue
                              <span className="svg-icon svg-icon-4 ms-2">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    opacity="0.5"
                                    x="18"
                                    y="13"
                                    width="13"
                                    height="2"
                                    rx="1"
                                    transform="rotate(-180 18 13)"
                                    fill="currentColor"
                                  ></rect>
                                  <path
                                    d="M15.4343 12.5657L11.25 16.75C10.8358 17.1642 10.8358 17.8358 11.25 18.25C11.6642 18.6642 12.3358 18.6642 12.75 18.25L18.2929 12.7071C18.6834 12.3166 18.6834 11.6834 18.2929 11.2929L12.75 5.75C12.3358 5.33579 11.6642 5.33579 11.25 5.75C10.8358 6.16421 10.8358 6.83579 11.25 7.25L15.4343 11.4343C15.7467 11.7467 15.7467 12.2533 15.4343 12.5657Z"
                                    fill="currentColor"
                                  ></path>
                                </svg>
                              </span>
                            </span>
                            <span className="indicator-progress d-none">
                              Please wait...
                              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 text-center">
                <img
                  className="w-100 mw-300px"
                  src="https://partlinks.com.au/files/upload/sellCar/sell-car-3.png"
                  alt="sell car"
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 text-center mt-5">
            <img
              className="mw-100"
              src="https://partlinks.com.au/files/upload/sellCar/sell-car-1.png"
              alt="sell car"
            />
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="container w-100 mw-900px m-auto pt-5 pb-5">
          <div className="row">
            <div className="col-12 text-center">
              <img
                className="w-100 mw-500px"
                src="https://partlinks.com.au/files/upload/sellCar/sell-car-banner.png"
                alt="sell-car-banner"
              />
            </div>
            <div className="col-12 text-center mt-5 mb-1">
              <h1 className="fs-4">Simplified process of selling a used car</h1>
            </div>
            <div className="fs-7 col-12 d-flex flex-column flex-start  mt-2 mw-600px m-auto">
              <div className="d-flex flex-start mt-3">
                <img
                  className="w-60px h-60px"
                  src="https://partlinks.com.au/files/upload/sellCar/sell-car-icon-1.png"
                  alt="sell-car-icon-1"
                />
                <div className="d-flex flex-column">
                  <b>List and Forget</b>
                  <span>
                    List your car in 2 minutes and forget the rest, we will do
                    the running around
                  </span>
                  <span>
                    From negotiation tactics to effective marketing strategies,
                    we've got you covered.
                  </span>
                </div>
              </div>
              <div className="d-flex flex-start mt-3">
                <img
                  className="w-60px h-60px"
                  src="https://partlinks.com.au/files/upload/sellCar/sell-car-icon-2.png"
                  alt="sell-car-icon-1"
                />
                <div className="d-flex flex-column">
                  <b>No more dealing with endless enquiries </b>
                  <span>
                    We know just how time-consuming it is to sell a used car,
                    let us deal with the selling and say goodbye to phone calls,
                    text messages, responding to emails and endless inspections.
                  </span>
                </div>
              </div>
              <div className="d-flex flex-start mt-3">
                <img
                  className="w-60px h-60px"
                  src="https://partlinks.com.au/files/upload/sellCar/sell-car-icon-3.png"
                  alt="sell-car-icon-1"
                />
                <div className="d-flex flex-column">
                  <b>Collect your payment </b>
                  <span>
                    Once we are done with the negotiations, you will receive a
                    tailor made list of offers for you to choose a buyer and
                    finalise the sale.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light">
        <div className="container w-100 mw-900px m-auto mt-5 mb-5">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="fs-4 mb-1">Approved conditions</h1>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-4 col-sm-4 col-md-2 col-lg-2 mt-2">
                  <img
                    className="w-100 mw-150px bg-white"
                    src="https://partlinks.com.au/files/upload/sellCar/car-1.png"
                    alt="car-1"
                  />
                </div>
                <div className="col-4 col-sm-4 col-md-2 col-lg-2 mt-2">
                  <img
                    className="w-100 mw-150px bg-white"
                    src="https://partlinks.com.au/files/upload/sellCar/car-2.png"
                    alt="car-2"
                  />
                </div>
                <div className="col-4 col-sm-4 col-md-2 col-lg-2 mt-2">
                  <img
                    className="w-100 mw-150px bg-white"
                    src="https://partlinks.com.au/files/upload/sellCar/car-3.png"
                    alt="car-3"
                  />
                </div>
                <div className="col-4 col-sm-4 col-md-2 col-lg-2 mt-2">
                  <img
                    className="w-100 mw-150px bg-white"
                    src="https://partlinks.com.au/files/upload/sellCar/car-4.png"
                    alt="car-4"
                  />
                </div>
                <div className="col-4 col-sm-4 col-md-2 col-lg-2 mt-2">
                  <img
                    className="w-100 mw-150px bg-white"
                    src="https://partlinks.com.au/files/upload/sellCar/car-5.png"
                    alt="car-5"
                  />
                </div>
                <div className="col-4 col-sm-4 col-md-2 col-lg-2 mt-2">
                  <img
                    className="w-100 mw-150px bg-white"
                    src="https://partlinks.com.au/files/upload/sellCar/car-4.png"
                    alt="car-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="container w-100 mw-900px m-auto pt-5 pb-5">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-4 text-center">
              <img
                className="w-100 mw-200px mw-sm-300px"
                src="https://partlinks.com.au/files/upload/sellCar/sell-car-2.png"
                alt="sell-car-2"
              />
            </div>
            <div className="col-12 col-sm-12 col-md-8 p-4 p-sm-2">
              <h1>Automatic SCAM protection</h1>
              <h6 className="font-serif">
                In the used car market, protecting yourself against scammers is
                paramount. We understand the risks involved in selling your car
                and have implemented stringent measures to safeguard your
                interests. By partnering with us, you gain access to a network
                of genuine, approved Buyers vetted by our team. With PartLinks,
                you can sell your car with confidence, knowing that your
                transaction is in safe hands.
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellCar;
