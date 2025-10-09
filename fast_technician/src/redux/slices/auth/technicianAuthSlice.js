import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const technicianLogin = createAsyncThunk(
  "technician/login",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:5000/api/technicians/login", formData);

      localStorage.setItem("technicianToken", res.data.token);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Invalid credentials");
    }
  }
);

const technicianAuthSlice = createSlice({
  name: "technicianAuth",
  initialState: {
    technician: null,
    token: localStorage.getItem("technicianToken") || null,
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    logoutTechnician: (state) => {
      state.technician = null;
      state.token = null;
      localStorage.removeItem("technicianToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(technicianLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(technicianLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.technician = action.payload.technician;
        state.token = action.payload.token;
        state.message = "Login Successful ✅";
      })
      .addCase(technicianLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logoutTechnician } = technicianAuthSlice.actions;
export default technicianAuthSlice.reducer;
