import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null, 
    Usersignin :false  ,
    usersignout: false,
    usersignup: false, 
    error: null,
    loading: false, 
    GoogleUser:false  
  },
  reducers: {
    usersigninStart: (state) => {
      state.loading = true;
    },
    usersigninSuccess: (state, action) => {
      state.currentUser = action.payload;
    state.Usersignin=true , 
      state.error = null;
      state.loading = false;
    },
    usersigninFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    usersignoutStart: (state) => {
      state.loading = true;
    },
    usersignoutSuccess: (state) => {
      state.currentUser = null;
      state.Usersignin = false , 
      state.usersignout = true;
      state.error = null;
      state.loading = false;
    },
    usersignoutFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    usersignupStart: (state) => {
      state.loading = true;
    },
    usersignupSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.usersignup = true;
      state.error = null;
      state.loading = false;
    },
    usersignupFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }, 
    userupdateStart:(state,action )=>{
      state.loading = true;
    }, 
    userupdateSuccess:(state, action)=>{
      state.currentUser = action.payload;  
      state.error=false  ; 
      state.loading =false
      
    }, 
    userupdateFailure:(state, action)=>{
      state.error = action.payload; 
    state.loading = false ;
    }  ,  
      googleusersignin:(state)=>{
        state.GoogleUser = true  
      } , 
      googleusersignout:(state)=>{
        state.GoogleUser = false
      }

  },
});

export const {
  usersigninStart,
  usersigninSuccess,
  usersigninFailure,
  usersignoutStart,
  usersignoutSuccess,
  usersignoutFailure,
  usersignupStart,
  usersignupSuccess,
  usersignupFailure, 
  userupdateFailure , 
  userupdateStart , 
  userupdateSuccess ,  
  googleusersignin , 
  googleusersignout
} = userSlice.actions;

export default userSlice.reducer;
