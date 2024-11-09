import React from "react";
import OwlCarousel from "react-owl-carousel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./MainBanner.css";

import { InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    textAlign: "left",
    borderRadius: 0,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
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
      borderStyle: "none",
      borderRadius: 0,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

const options = {
  loop: true,
  nav: true,
  dots: false,
  autoplayHoverPause: true,
  items: 1,
  smartSpeed: 100,
  autoplay: false,
  navText: [
    "<i class='bx bx-chevrons-left'></i>",
    "<i class='bx bx-chevrons-right'></i>",
  ],
};

function MainBanner() {
  return (
    <div className="main-banner-with-form">
      <OwlCarousel className="hero-slides owl-theme" {...options}>
        <div className="hero-banner">
          <img
            src="https://theme.partlinks.com.au/assets/img/main-banner1.jpg"
            alt="Slide 1"
          />
        </div>
        <div className="hero-banner">
          <img
            src="https://theme.partlinks.com.au/assets/img/main-banner1.jpg"
            alt="Slide 2"
          />
        </div>
        <div className="hero-banner">
          <img
            src="https://theme.partlinks.com.au/assets/img/main-banner1.jpg"
            alt="Slide 3"
          />
        </div>
      </OwlCarousel>
      <div className="main-banner-content">
        <h1>Search Parts For Your Vehicle</h1>
        <b>Best Automobile Parts Shop</b>

        <div className="main-search-wrap">
          <form>
            <div className="row justify-content-center">
              <div className="col-lg-3 col-md-6">
                <FormControl sx={{ marginBottom: "10px" }} fullWidth>
                  <Select
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          borderRadius: 0, // Customize border-radius here
                        },
                      },
                      MenuListProps: {
                        sx: {
                          p: 0, // Customize padding here; `p` sets padding on all sides
                        },
                      },
                    }}
                    input={<BootstrapInput />}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={20}
                    //value={age}
                    //onChange={handleChange}
                  >
                    <MenuItem
                      sx={{
                        minHeight: 40,
                        "&.Mui-selected": {
                          backgroundColor: "#d31531", // Background color for selected item
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#d31531", // Optional hover color when selected
                          },
                        },
                      }}
                      value={10}
                    >
                      Ten
                    </MenuItem>
                    <MenuItem
                      sx={{
                        minHeight: 40,
                        "&.Mui-selected": {
                          backgroundColor: "#d31531", // Background color for selected item
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#d31531", // Optional hover color when selected
                          },
                        },
                      }}
                      value={20}
                    >
                      Twenty
                    </MenuItem>
                    <MenuItem
                      sx={{
                        minHeight: 40,
                        "&.Mui-selected": {
                          backgroundColor: "#d31531", // Background color for selected item
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#d31531", // Optional hover color when selected
                          },
                        },
                      }}
                      value={30}
                    >
                      Thirty
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="col-lg-3 col-md-6">
                <FormControl sx={{ marginBottom: "10px" }} fullWidth>
                  <Select
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          borderRadius: 0, // Customize border-radius here
                        },
                      },
                      MenuListProps: {
                        sx: {
                          p: 0, // Customize padding here; `p` sets padding on all sides
                        },
                      },
                    }}
                    input={<BootstrapInput />}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={20}
                    //value={age}
                    //onChange={handleChange}
                  >
                    <MenuItem
                      sx={{
                        minHeight: 40,
                        "&.Mui-selected": {
                          backgroundColor: "#d31531", // Background color for selected item
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#d31531", // Optional hover color when selected
                          },
                        },
                      }}
                      value={10}
                    >
                      Ten
                    </MenuItem>
                    <MenuItem
                      sx={{
                        minHeight: 40,
                        "&.Mui-selected": {
                          backgroundColor: "#d31531", // Background color for selected item
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#d31531", // Optional hover color when selected
                          },
                        },
                      }}
                      value={20}
                    >
                      Twenty
                    </MenuItem>
                    <MenuItem
                      sx={{
                        minHeight: 40,
                        "&.Mui-selected": {
                          backgroundColor: "#d31531", // Background color for selected item
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#d31531", // Optional hover color when selected
                          },
                        },
                      }}
                      value={30}
                    >
                      Thirty
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="col-lg-3 col-md-6">
                <FormControl sx={{ marginBottom: "10px" }} fullWidth>
                  <Select
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          borderRadius: 0, // Customize border-radius here
                        },
                      },
                      MenuListProps: {
                        sx: {
                          p: 0, // Customize padding here; `p` sets padding on all sides
                        },
                      },
                    }}
                    input={<BootstrapInput />}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={20}
                    //value={age}
                    //onChange={handleChange}
                  >
                    <MenuItem
                      sx={{
                        minHeight: 40,
                        "&.Mui-selected": {
                          backgroundColor: "#d31531", // Background color for selected item
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#d31531", // Optional hover color when selected
                          },
                        },
                      }}
                      value={10}
                    >
                      Ten
                    </MenuItem>
                    <MenuItem
                      sx={{
                        minHeight: 40,
                        "&.Mui-selected": {
                          backgroundColor: "#d31531", // Background color for selected item
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#d31531", // Optional hover color when selected
                          },
                        },
                      }}
                      value={20}
                    >
                      Twenty
                    </MenuItem>
                    <MenuItem
                      sx={{
                        minHeight: 40,
                        "&.Mui-selected": {
                          backgroundColor: "#d31531", // Background color for selected item
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#d31531", // Optional hover color when selected
                          },
                        },
                      }}
                      value={30}
                    >
                      Thirty
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="main-search-btn">
                  <button type="submit" className="search-btn">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MainBanner;
