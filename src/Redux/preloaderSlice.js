import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false, // Global loading indicator
};

const preloaderSlice = createSlice({
  name: "preloader",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload; // Payload should be true or false
    },
  },
});

export const { setLoading } = preloaderSlice.actions;

export default preloaderSlice.reducer;
