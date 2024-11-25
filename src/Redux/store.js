import { configureStore } from "@reduxjs/toolkit";
import homeDataReducer from "./homeDataSlice";
import contactDataReducer from "./contactDataSlice";
import aboutDataReducer from "./aboutDataSlice";

const store = configureStore({
  reducer: {
    homeData: homeDataReducer,
    contactData: contactDataReducer, // Add the slice reducer here
    aboutData: aboutDataReducer,
  },
});

export default store;
