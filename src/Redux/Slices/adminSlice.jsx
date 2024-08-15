import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    currentAdmin: null,
    signin: false,
    signout: false,
    error: null,
    loading: false,
  },
  reducers: {
    adminsigninStart: (state) => {
      state.loading = true;
    },
    adminsigninSuccess: (state, action) => {
      state.currentAdmin = action.payload;
      state.loading = false;
      state.error = null;
      state.signin = true;
    },
    adminsigninFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    adminsignoutStart: (state) => {
      state.loading = true;
    },
    adminsignoutSuccess: (state) => {
      state.currentAdmin = null;
      state.loading = false;
      state.error = null;
      state.signin = false;
      state.signout = true;
    },
    adminsignoutFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    adminupdateStart: (state, action) => {
      state.loading = true;
    },
    adminupdateSuccess: (state, action) => {
      state.currentAdmin = action.payload;
      state.error = false;
      state.loading = false;
    },
    adminupdateFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  adminsigninStart,
  adminsigninSuccess,
  adminsigninFailure,
  adminsignoutStart,
  adminsignoutSuccess,
  adminsignoutFailure,
  adminupdateFailure,
  adminupdateStart,
  adminupdateSuccess,
} = adminSlice.actions;

export default adminSlice.reducer;
