import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Thunk for fetching all requests
export const fetchAllRequests = createAsyncThunk(
  "technician/fetchAllRequests",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/requests/Get_All_request", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("technicianToken")}`,
        },
      });
      return res.data; // assuming response is an array of requests
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch requests");
    }
  }
);

const technicianRequestSlice = createSlice({
  name: "technicianRequests",
  initialState: {
    requests: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchAllRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default technicianRequestSlice.reducer;
