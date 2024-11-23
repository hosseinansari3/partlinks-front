import React, { useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./MainBanner.css";

import { InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import { fetchHomeData } from "../../../Redux/homeDataSlice";
import { useDispatch, useSelector } from "react-redux";

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
  const dispatch = useDispatch();
  const { homeData, status, error } = useSelector((state) => state.homeData);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchHomeData()); // Fetch data on component mount
    }
  }, [status, dispatch]);

  useEffect(() => {
    console.log("homeData", homeData);
  }, [homeData]);

  return (
    <div className="main-banner-with-form">
      <OwlCarousel className="hero-slides owl-theme" {...options}>
        {homeData?.result?.sliders.map((item) => {
          return (
            <div className="hero-banner">
              <img src={`https://partlinks.com.au/${item}`} alt="image" />
            </div>
          );
        })}
      </OwlCarousel>
    </div>
  );
}

export default MainBanner;
