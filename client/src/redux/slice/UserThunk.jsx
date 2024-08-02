import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import dotenv from 'dotenv'
// dotenv.config()

// const serverUrl = dotenv.process.env.server
// console.log(serverUrl)

const serverUrl = "https://email-authentication-3jjo.onrender.com";

//! Send otp
export const SendOtpHandler = createAsyncThunk(
  "SendOtpHandler",
  async (email, { rejectWithValue }) => {
    try {
      const apiResponse = await axios.post(`${serverUrl}/api/sendOtp`, {
        email,
      });
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
    const apiResponse = await axios.post(`${serverUrl}/api/register`, data);
    return apiResponse.data;
  }
);

//! Login
export const UserLoginHandler = createAsyncThunk(
  "UserLoginHandler",
  async (data, { rejectWithValue }) => {
    try {
      const apiResponse = await axios.post(`${serverUrl}/api/login`, data);
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
    const apiResponse = await axios.get(`${serverUrl}/api/logout`);
    return apiResponse.data;
  }
);

//! Verify
export const UserVerifyHandler = createAsyncThunk(
  "UserVerifyHandler",
  async () => {
    const apiResponse = await axios.get(`${serverUrl}/api/verification`);
    return apiResponse.data;
  }
);

//! Reset password request
export const UserResetPasswordRequest = createAsyncThunk(
  "UserResetPasswordRequest",
  async ({ email }) => {
    const apiResponse = await axios.post(`${serverUrl}/api/resetPassReq`, {
      email,
    });
    return apiResponse.data;
  }
);

//! Reset password
export const ResetPasswordHandler = createAsyncThunk(
  "ResetPasswordHandler",
  async (formData) => {
    const apiResponse = await axios.post(
      `${serverUrl}/api/resetPassword`,
      formData
    );
    return apiResponse.data;
  }
);
