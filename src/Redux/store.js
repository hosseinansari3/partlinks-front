import { configureStore } from "@reduxjs/toolkit";
import homeDataReducer from "./homeDataSlice";

const store = configureStore({
  reducer: {
    homeData: homeDataReducer, // Add the slice reducer here
  },
});

export default store;
