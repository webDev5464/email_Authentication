import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const serverUrl = "https://email-authentication-3jjo.onrender.com";
// const serverUrl = "http://localhost:1919";

//! Register validation with otp
export const RegisterValidation = createAsyncThunk(
  "RegisterValidation",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const apiResponse = await axios.post(
        `${serverUrl}/api/registerValidation`,
        data
      );
      return apiResponse.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//! Register successfully
export const RegisterSuccessfullyHandler = createAsyncThunk(
  "RegisterSuccessfullyHandler",
  async (otpWithFormData, { rejectWithValue }) => {
    try {
      const apiResponse = await axios.post(
        `${serverUrl}/api/registerSuccessfully`,
        otpWithFormData
      );
      return apiResponse.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//! Login
export const UserLoginHandler = createAsyncThunk(
  "UserLoginHandler",
  async (data, { rejectWithValue }) => {
    try {
      const apiResponse = await axios.post(`${serverUrl}/api/login`, data);
      return apiResponse.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
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
  async ({ rejectWithValue }) => {
    try {
      const apiResponse = await axios.get(`${serverUrl}/api/verification`);
      return apiResponse.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err);
    }
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
