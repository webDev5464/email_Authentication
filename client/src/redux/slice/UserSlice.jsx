/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import {
  RegisterValidation,
  ResetPasswordHandler,
  UserLoginHandler,
  UserLogoutHandler,
  UserResetPasswordRequest,
  UserVerifyHandler,
} from "./UserThunk";

const initialState = {
  loading: false,
  resMessage: "",
  process: null,
  userData: null,
  validUser: false,
  reqProcess: false,
  otpProcess: false,
};

const Slice = createSlice({
  name: "userSlice",
  initialState,

  reducers: {
    resetMessage: (state) => {
      state.resMessage = "";
      state.process = null;
      return state;
    },

    resetReqProcess: (state) => {
      state.reqProcess = false;
      return state;
    },

    resetOtpProcess: (state, action) => {
      state.otpProcess = action.payload;
      return state;
    },
  },

  extraReducers: (builder) => {
    //! Register Validation
    builder
      .addCase(RegisterValidation.pending, (state) => {
        state.loading = true;
      })
      .addCase(RegisterValidation.fulfilled, (state, action) => {
        const { process, msg } = action.payload;
        state.loading = false;
        state.resMessage = msg;
        // state.reqProcess = process;
        if (process) {
          state.otpProcess = true;
        }
        state.process = process;
      })
      .addCase(RegisterValidation.rejected, (state, action) => {
        const { process, msg } = action.payload;
        state.loading = false;
        state.resMessage = msg;
        // state.reqProcess = process;
        state.process = process;
      });

    //! Login
    builder
      .addCase(UserLoginHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(UserLoginHandler.fulfilled, (state, action) => {
        const { msg, process, UserData } = action.payload;
        state.loading = false;
        state.resMessage = msg;
        state.process = process;
        state.userData = UserData;
        state.validUser = process;
      })
      .addCase(UserLoginHandler.rejected, (state, action) => {
        const { msg } = action.payload;
        state.loading = false;
        state.resMessage = msg;
      });

    //! logout
    builder
      .addCase(UserLogoutHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(UserLogoutHandler.fulfilled, (state, action) => {
        const { msg, process } = action.payload;
        state.loading = false;
        state.resMessage = msg;
        state.process = process;
        if (process) {
          state.userData = null;
          state.validUser = false;
        }
      });

    //! verification
    builder
      .addCase(UserVerifyHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(UserVerifyHandler.fulfilled, (state, action) => {
        const { msg, process, UserData } = action.payload;
        state.loading = false;
        // state.resMessage = msg;
        if (process) {
          state.validUser = process;
          state.userData = UserData;
        } else {
          state.validUser = process;
          state.userData = null;
        }
        state.validUser = process;
      })
      .addCase(UserVerifyHandler.rejected, (state, action) => {
        state.loading = false;
      });

    //! Reset password request
    builder
      .addCase(UserResetPasswordRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(UserResetPasswordRequest.fulfilled, (state, action) => {
        const { process, msg } = action.payload;
        state.loading = false;
        state.process = process;
        state.resMessage = msg;
      });

    //! Password reset
    builder
      .addCase(ResetPasswordHandler.pending, (state) => {
        state.loading = true;
      })
      .addCase(ResetPasswordHandler.fulfilled, (state, action) => {
        const { process, msg } = action.payload;
        state.loading = false;
        state.process = process;
        state.resMessage = msg;
      });
  },
});

export const UserSlice = Slice.reducer;
export const { resetMessage, resetReqProcess, resetOtpProcess } = Slice.actions;
