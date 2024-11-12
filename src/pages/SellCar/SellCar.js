import React, { useCallback, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useForm } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";

const STEPS = {
  STEP_CAR: 0,
  STEP_CAR_1: 1,
  STEP_USER: 2,
};

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(1),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "white",
    border: "1px solid",
    borderColor: "#E0E3E7",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
      borderColor: "#2D3843",
    }),
  },
}));

function SellCar() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [step, setStep] = useState(STEPS.STEP_CAR);

  const state = watch("state", "");

  const stepUser = (
    <div className="step-user row mb-2">
      <div className="row mb-4 mx-auto">
        <div className="col-12">
          <h3>Car Details</h3>
        </div>
      </div>
      <div className="row mb-2 mx-auto">
        <div className="col-6 mb-3">
          <InputLabel htmlFor="kilometres">
            <span>Kilometres</span>
          </InputLabel>
          <BootstrapInput fullWidth id="kilometres" />
        </div>
        <div className="col-6 mb-3">
          <InputLabel id="number-of-keys">Number Of Keys</InputLabel>
          <Select
            fullWidth
            input={<BootstrapInput />}
            labelId="number-of-keys"
            id="number-of-keys"
            //inputProps={{ "aria-label": "Without label" }}
            //defaultValue={0}
            displayEmpty
            value={""}
          >
            <MenuItem hidden value="">
              <span className="text-secondary">Select...</span>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </div>
        <div className="col-6 mb-3">
          <InputLabel id="owners-manual">Owners Manual</InputLabel>
          <Select
            fullWidth
            input={<BootstrapInput />}
            labelId="owners-manual"
            id="owners-manual"
            //inputProps={{ "aria-label": "Without label" }}
            //defaultValue={0}
            displayEmpty
            value={""}
          >
            <MenuItem hidden value="">
              <span className="text-secondary">Select...</span>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </div>
        <div className="col-6 mb-3">
          <InputLabel id="service-history">Service History</InputLabel>
          <Select
            fullWidth
            input={<BootstrapInput />}
            labelId="service-history"
            id="service-history"
            //inputProps={{ "aria-label": "Without label" }}
            //defaultValue={0}
            displayEmpty
            value={""}
          >
            <MenuItem hidden value="">
              <span className="text-secondary">Select...</span>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </div>
      </div>
      <div className="row mb-2 mt-5 mx-auto">
        <div class="col-12 mb-2">
          <h6>Rate the condition of the</h6>
        </div>
        <div className="col-12 mb-2 d-flex flex-column flex-start">
          <span>Interior</span>
          <Rating
            sx={{ padding: "6px" }}
            name="simple-controlled"
            //value={value}
            //onChange={(event, newValue) => {
            //setValue(newValue);
            //}}
          />
        </div>
        <div className="col-12 mb-2 d-flex flex-column flex-start">
          <span>Exterior</span>
          <Rating
            sx={{ padding: "6px" }}
            name="simple-controlled"
            //value={value}
            //onChange={(event, newValue) => {
            //setValue(newValue);
            //}}
          />
        </div>{" "}
        <div className="col-12 mb-2 d-flex flex-column flex-start">
          <span>Tyers</span>
          <Rating
            sx={{ padding: "6px" }}
            name="simple-controlled"
            //value={value}
            //onChange={(event, newValue) => {
            //setValue(newValue);
            //}}
          />
        </div>
      </div>
      <div className="row mb-2 mx-auto">
        <div className="col-12 mb-2">
          <div class="mb-2">
            <img
              class="me-1"
              width="20px"
              src="https://partlinks.com.au/panel/media/flags/australia.svg"
              alt="australia"
            />
            <span class="fw-bold p-2" style={{ width: "40px" }}>
              +61
            </span>
            <input type="hidden" name="country" value="61" />
          </div>
          <BootstrapInput
            type="number"
            fullWidth
            placeholder="Enter Plate Number"
            id="plate-number"
          />
        </div>
        <div className="col-12">
          <div className="row mb-2">
            <InputLabel htmlFor="description">
              <span class="">Description</span>
              <small class="ms-2 text-muted">(Optional)</small>
            </InputLabel>

            <TextField id="description" multiline />
          </div>
        </div>
      </div>
    </div>
  );

  const cardContent =
    step == STEPS.STEP_CAR ? (
      <div className="step-car">
        <div className="row">
          <div className="col-12">
            <div className="row mb-2">
              <div className="col-6">
                <InputLabel htmlFor="plate-number">Plate Number</InputLabel>
                <BootstrapInput
                  fullWidth
                  placeholder="Enter Plate Number"
                  id="plate-number"
                />
              </div>
              <div className="col-6">
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                  {...register("state", { required: true })}
                  fullWidth
                  input={<BootstrapInput />}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  //inputProps={{ "aria-label": "Without label" }}
                  //defaultValue={0}
                  displayEmpty
                  value={state}
                >
                  <MenuItem hidden value="">
                    Select State
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </div>
            </div>
            <div class="d-flex flex-column mb-2">
              <label class="d-flex align-items-center fs-6 fw-semibold mb-2 mt-2">
                <b>OR</b>
              </label>
            </div>
            <div className="d-flex flex-column mb-5">
              <InputLabel htmlFor="vin-number">VIN</InputLabel>
              <BootstrapInput
                fullWidth
                placeholder="Enter vin number"
                id="vin-number"
              />
            </div>
          </div>
        </div>
      </div>
    ) : step == STEPS.STEP_CAR_1 ? (
      <div className="step-car2">
        <div className="row mb-2">
          <div className="col-6 mb-3">
            <InputLabel htmlFor="make">
              <span>Make</span>
            </InputLabel>
            <Autocomplete
              sx={{
                "label + &": {
                  marginTop: "8px",
                },
                "& .MuiOutlinedInput-root": {
                  padding: "3px 12px", // Set your desired padding here
                },
              }}
              disablePortal
              options={["aaa", "rrrr", "www", "oooo", "nnnn"]}
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
          </div>
          <div className="col-6 mb-3">
            <InputLabel htmlFor="model">
              <span>Model</span>
            </InputLabel>
            <Autocomplete
              sx={{
                "label + &": {
                  marginTop: "8px",
                },
                "& .MuiOutlinedInput-root": {
                  padding: "3px 12px", // Set your desired padding here
                },
              }}
              id="model"
              disablePortal
              options={["aaa", "rrrr", "www", "oooo", "nnnn"]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select a model..."
                  sx={{
                    "& .MuiOutlinedInput-root .MuiAutocomplete-input": {
                      padding: "10px 12px", // Set your desired padding here
                    },
                  }}
                />
              )}
            />
          </div>
          <div className="col-6 mb-3">
            <InputLabel htmlFor="year">
              <span>Year</span>
            </InputLabel>
            <Autocomplete
              sx={{
                "label + &": {
                  marginTop: "8px",
                },
                "& .MuiOutlinedInput-root": {
                  padding: "3px 12px", // Set your desired padding here
                },
              }}
              id="year"
              disablePortal
              options={["aaa", "rrrr", "www", "oooo", "nnnn"]}
              renderInput={(params) => (
                <TextField {...params} placeholder="Select Year" />
              )}
            />
          </div>
          <div className="col-6 mb-3">
            <InputLabel id="body-type">Body Type</InputLabel>
            <Select
              {...register("state", { required: true })}
              fullWidth
              input={<BootstrapInput />}
              labelId="body-type"
              id="body-type"
              //inputProps={{ "aria-label": "Without label" }}
              //defaultValue={0}
              displayEmpty
              value={state}
            >
              <MenuItem hidden value="">
                Select Body Type
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
          <div className="col-6 mb-3">
            <InputLabel id="transmission">Transmission</InputLabel>
            <Select
              {...register("state", { required: true })}
              fullWidth
              input={<BootstrapInput />}
              labelId="transmission"
              id="transmission"
              //inputProps={{ "aria-label": "Without label" }}
              //defaultValue={0}
              displayEmpty
              value={state}
            >
              <MenuItem hidden value="">
                Select Transmission
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
          <div className="col-6 mb-3">
            <InputLabel id="fuel">Fuel</InputLabel>
            <Select
              {...register("state", { required: true })}
              fullWidth
              input={<BootstrapInput />}
              labelId="fuel"
              id="fuel"
              //inputProps={{ "aria-label": "Without label" }}
              //defaultValue={0}
              displayEmpty
              value={state}
            >
              <MenuItem hidden value="">
                Select Fuel
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </div>
          <div className="col-6 mb-3">
            <InputLabel htmlFor="cylinders">
              <span>cylinders</span>
            </InputLabel>
            <BootstrapInput fullWidth id="cylinders" />
          </div>
          <div className="col-6 mb-3">
            <InputLabel htmlFor="series">
              <span>series</span>
            </InputLabel>
            <BootstrapInput fullWidth id="series" />
          </div>
          <div className="col-6 mb-3">
            <InputLabel htmlFor="color">
              <span>color</span>
            </InputLabel>
            <BootstrapInput fullWidth id="plate-number" />
          </div>
        </div>
      </div>
    ) : (
      stepUser
    );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = (e) => {
    console.log("Onsubmit", step);
    if (step !== STEPS.STEP_USER) {
      return onNext();
    }
  };

  return (
    <div className="bg-light">
      <div className="container w-100 mw-900px m-auto mt-10">
        <div className="row flex-wrap-reverse flex-md-wrap mb-5">
          <div className="col-12 col-sm-12 col-md-6 mt-5 my-slider">
            <div className="card">
              <div class="card-header">
                <div class="mt-5">
                  <h1>Receive Multiple Offers</h1>
                  <h1>
                    <span>From</span>
                    <span class="text-warning ms-2">Dealers Aus-Wide</span>
                  </h1>
                </div>
              </div>
              <div className="card-body">
                <div className="mt-5">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-2 mb-2">
                      {cardContent}
                      <div
                        class="d-flex justify-content-between align-items-center pt-2"
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
                            Back
                          </button>
                        </div>
                        <div>
                          <button
                            type="submit"
                            class="btn btn-sm btn-primary"
                            id="continue-selling-car-btn"
                          >
                            <span class="indicator-label">
                              Continue
                              <span class="svg-icon svg-icon-4 ms-2">
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
                            <span class="indicator-progress d-none">
                              Please wait...
                              <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-12 text-center">
                <img
                  class="w-100 mw-300px"
                  src="https://partlinks.com.au/files/upload/sellCar/sell-car-3.png"
                  alt="sell car"
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 text-center mt-5">
            <img
              class="mw-100"
              src="https://partlinks.com.au/files/upload/sellCar/sell-car-1.png"
              alt="sell car"
            />
          </div>
        </div>
      </div>
      <div class="bg-white">
        <div class="container w-100 mw-900px m-auto pt-5 pb-5">
          <div class="row">
            <div class="col-12 text-center">
              <img
                class="w-100 mw-500px"
                src="https://partlinks.com.au/files/upload/sellCar/sell-car-banner.png"
                alt="sell-car-banner"
              />
            </div>
            <div class="col-12 text-center mt-5">
              <h1>Simplified process of selling a used car</h1>
            </div>
            <div class="col-12 d-flex flex-column flex-start m-auto mt-5 mw-600px m-auto">
              <div class="d-flex flex-start mt-5">
                <img
                  class="w-60px h-60px"
                  src="https://partlinks.com.au/files/upload/sellCar/sell-car-icon-1.png"
                  alt="sell-car-icon-1"
                />
                <div class="d-flex flex-column">
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
              <div class="d-flex flex-start mt-5">
                <img
                  class="w-60px h-60px"
                  src="https://partlinks.com.au/files/upload/sellCar/sell-car-icon-2.png"
                  alt="sell-car-icon-1"
                />
                <div class="d-flex flex-column">
                  <b>No more dealing with endless enquiries </b>
                  <span>
                    We know just how time-consuming it is to sell a used car,
                    let us deal with the selling and say goodbye to phone calls,
                    text messages, responding to emails and endless inspections.
                  </span>
                </div>
              </div>
              <div class="d-flex flex-start mt-5">
                <img
                  class="w-60px h-60px"
                  src="https://partlinks.com.au/files/upload/sellCar/sell-car-icon-3.png"
                  alt="sell-car-icon-1"
                />
                <div class="d-flex flex-column">
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
      <div class="bg-light">
        <div class="container w-100 mw-900px m-auto mt-5 mb-5">
          <div class="row">
            <div class="col-12 text-center">
              <h1>Approved conditions</h1>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-4 col-sm-4 col-md-2 col-lg-2 mt-2">
                  <img
                    class="w-100 mw-150px bg-white"
                    src="https://partlinks.com.au/files/upload/sellCar/car-1.png"
                    alt="car-1"
                  />
                </div>
                <div class="col-4 col-sm-4 col-md-2 col-lg-2 mt-2">
                  <img
                    class="w-100 mw-150px bg-white"
                    src="https://partlinks.com.au/files/upload/sellCar/car-2.png"
                    alt="car-2"
                  />
                </div>
                <div class="col-4 col-sm-4 col-md-2 col-lg-2 mt-2">
                  <img
                    class="w-100 mw-150px bg-white"
                    src="https://partlinks.com.au/files/upload/sellCar/car-3.png"
                    alt="car-3"
                  />
                </div>
                <div class="col-4 col-sm-4 col-md-2 col-lg-2 mt-2">
                  <img
                    class="w-100 mw-150px bg-white"
                    src="https://partlinks.com.au/files/upload/sellCar/car-4.png"
                    alt="car-4"
                  />
                </div>
                <div class="col-4 col-sm-4 col-md-2 col-lg-2 mt-2">
                  <img
                    class="w-100 mw-150px bg-white"
                    src="https://partlinks.com.au/files/upload/sellCar/car-5.png"
                    alt="car-5"
                  />
                </div>
                <div class="col-4 col-sm-4 col-md-2 col-lg-2 mt-2">
                  <img
                    class="w-100 mw-150px bg-white"
                    src="https://partlinks.com.au/files/upload/sellCar/car-4.png"
                    alt="car-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white">
        <div class="container w-100 mw-900px m-auto pt-5 pb-5">
          <div class="row">
            <div class="col-12 col-sm-12 col-md-4 text-center">
              <img
                class="w-100 mw-200px mw-sm-300px"
                src="https://partlinks.com.au/files/upload/sellCar/sell-car-2.png"
                alt="sell-car-2"
              />
            </div>
            <div class="col-12 col-sm-12 col-md-8 p-10 p-sm-5">
              <h1>Automatic SCAM protection</h1>
              <h6 class="">
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
