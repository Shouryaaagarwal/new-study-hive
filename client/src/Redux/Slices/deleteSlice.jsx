import { createSlice } from "@reduxjs/toolkit";

export const deleteSlice = createSlice({
  name: "delete",
  initialState: {
            error:null , 
            errorforcomment:null  
            
  }  , 
  reducers: {
            deleteerror:(state, action)=>{
                state.error = action.payload 
              },  
              errorforcom:(state , action)=>{
                      state.errorforcomment = action.payload
              }  , 
              commentstart:(state)=>{
                state.errorforcomment = null
              }   
             
               

  }

}) ; 
 

export const {deleteerror , errorforcom ,  commentstart} = deleteSlice.actions 
 
export default deleteSlice.reducer

