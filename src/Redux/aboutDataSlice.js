// src/features/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setLoading } from "./preloaderSlice";

// Async thunk to fetch data
export const fetchAboutData = createAsyncThunk(
  "data/fetchAboutData",
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      dispatch(setLoading(true));

      const response = await axios.get(
        "https://partlinks.com.au/api/v1/member/about_us"
      );
      dispatch(setLoading(false));

      return response.data; // Return the API response
    } catch (error) {
      console.log(error);
    }
  }
);

const aboutDataSlice = createSlice({
  name: "aboutData",
  initialState: {
    aboutData: [], // Holds the fetched data
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAboutData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.aboutData = action.payload; // Save fetched data in state
      })
      .addCase(fetchAboutData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default aboutDataSlice.reducer;
