import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//! Send otp
export const SendOtpHandler = createAsyncThunk(
  "SendOtpHandler",
  async (email, { rejectWithValue }) => {
    try {
      const apiResponse = await axios.post("/api/sendOtp", { email });
      return apiResponse.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//! Register
export const UserRegisterHandler = createAsyncThunk(
  "UserRegisterHandler",
  async (data) => {
    const apiResponse = await axios.post("/api/register", data);
    return apiResponse.data;
  }
);

//! Login
export const UserLoginHandler = createAsyncThunk(
  "UserLoginHandler",
  async (data, { rejectWithValue }) => {
    try {
      const apiResponse = await axios.post("/api/login", data);
      return apiResponse.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

//! Logout
export const UserLogoutHandler = createAsyncThunk(
  "UserLogoutHandler",
  async () => {
    const apiResponse = await axios.get("/api/logout");
    return apiResponse.data;
  }
);

//! Verify
export const UserVerifyHandler = createAsyncThunk(
  "UserVerifyHandler",
  async () => {
    const apiResponse = await axios.get("/api/verification");
    return apiResponse.data;
  }
);

//! Reset password request
export const UserResetPasswordRequest = createAsyncThunk(
  "UserResetPasswordRequest",
  async ({ email }) => {
    const apiResponse = await axios.post("/api/resetPassReq", { email });
    return apiResponse.data;
  }
);

//! Reset password
export const ResetPasswordHandler = createAsyncThunk(
  "ResetPasswordHandler",
  async (formData) => {
    const apiResponse = await axios.post("/api/resetPassword", formData);
    return apiResponse.data;
  }
);
