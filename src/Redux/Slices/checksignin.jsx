import { createSlice } from "@reduxjs/toolkit";

export const checkSlice = createSlice({
  name: "check",
  initialState: {
            signedin: false
  }  , 
  reducers: {
           checkedtrue:(state ,action)=>{
            state.signedin = true  ; 
           } ,  
           checkedfalse:(state ,action)=>{
            state.signedin = false ; 
           }
  }

}) ; 
 

export const {checkedtrue ,checkedfalse} = checkSlice.actions 
 
export default checkSlice.reducer

