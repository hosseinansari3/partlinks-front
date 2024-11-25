import { configureStore } from "@reduxjs/toolkit";
import homeDataReducer from "./homeDataSlice";
import contactDataReducer from "./contactDataSlice";
import aboutDataReducer from "./aboutDataSlice";
import preloaderReducer from "./preloaderSlice";

const store = configureStore({
  reducer: {
    homeData: homeDataReducer,
    contactData: contactDataReducer, // Add the slice reducer here
    aboutData: aboutDataReducer,
    preloader: preloaderReducer,
  },
});

export default store;
