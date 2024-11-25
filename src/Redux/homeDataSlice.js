// src/features/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setLoading } from "./preloaderSlice";

// Async thunk to fetch data
export const fetchHomeData = createAsyncThunk(
  "data/fetchHomeData",
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      dispatch(setLoading(true));

      const response = await axios.get(
        "https://partlinks.com.au/api/v1/member/get_web_home_data"
      );
      dispatch(setLoading(false));

      return response.data; // Return the API response
    } catch (error) {
      console.log(error);
    }
  }
);

const homeDataSlice = createSlice({
  name: "homeData",
  initialState: {
    homeData: [], // Holds the fetched data
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.homeData = action.payload; // Save fetched data in state
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default homeDataSlice.reducer;
