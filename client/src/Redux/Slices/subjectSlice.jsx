import { createSlice } from "@reduxjs/toolkit";

export const subjectSlice = createSlice({
  name: "subject",
  initialState: {
    subjectmade: false,
    loading: false,
    error: null, 
    subjectfetcherror:false ,   
      
  },
  reducers: {
    subjectmadeStart: (state)=>{
      state.loading = true;
    },
    subjectmadeSuccess: (state) =>{
      (state.subjectmade = true),
        (state.loading = false),
        (state.error = null);
    },
    subjectFailure: (state , action) => {
      (state.loading = false), (state.error = action.payload);
    }, 
      subjectfetcherror:(state ,action )=>{
        state.subjectfetcherror = true ; 
        state.error = action.payload ;
      }
    
  },
});

export const { subjectFailure, subjectmadeStart, subjectmadeSuccess , subjectfetcherror } =
  subjectSlice.actions;

export default subjectSlice.reducer;
