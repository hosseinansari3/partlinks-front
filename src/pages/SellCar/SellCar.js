import React from "react";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useForm } from "react-hook-form";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(1),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#F3F6F9",
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

  const state = watch("state", "");

  return (
    <div>
      <div className="container w-100 mw-900px m-auto mt-10">
        <div className="row flex-wrap-reverse flex-md-wrap mb-10">
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
                  <div className="mt-2 mb-2">
                    <div className="step-car">
                      <div className="row">
                        <div className="col-12">
                          <div className="row mb-2">
                            <div className="col-6">
                              <InputLabel htmlFor="plate-number">
                                Plate Number
                              </InputLabel>
                              <BootstrapInput
                                fullWidth
                                placeholder="Enter Plate Number"
                                id="plate-number"
                              />
                            </div>
                            <div className="col-6">
                              <InputLabel id="demo-simple-select-label">
                                State
                              </InputLabel>

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
                    <div
                      class="d-flex justify-content-between align-items-center pt-2"
                      id="info-content"
                    >
                      <div></div>
                      <div>
                        <button
                          type="button"
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
                </div>
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
    </div>
  );
}

export default SellCar;
