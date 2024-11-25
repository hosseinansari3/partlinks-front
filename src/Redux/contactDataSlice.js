// src/features/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setLoading } from "./preloaderSlice";

// Async thunk to fetch data
export const fetchContactData = createAsyncThunk(
  "data/fetchContactData",
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      dispatch(setLoading(true));

      const response = await axios.get(
        "https://partlinks.com.au/api/v1/member/contact_us"
      );
      dispatch(setLoading(false));

      return response.data; // Return the API response
    } catch (error) {
      console.log(error);
    }
  }
);

const contactDataSlice = createSlice({
  name: "contactData",
  initialState: {
    contactData: [], // Holds the fetched data
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContactData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.contactData = action.payload; // Save fetched data in state
      })
      .addCase(fetchContactData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default contactDataSlice.reducer;
