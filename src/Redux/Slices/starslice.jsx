import { createSlice } from "@reduxjs/toolkit";

export const starSlice = createSlice({
  name: "star",
  initialState: {
    stardata: [],
  },
  reducers: {
    toggleStar: (state, action) => {
      const {
        id,
        starquestionotes,
        starsubjectnotes,
        starlecandpdflink,
        stardoclink,
        data,
      } = action.payload;

      if (!Array.isArray(state.stardata)) {
        state.stardata = [];
      }
      
      const exists = state.stardata.some((item) => item._id === id);

      if (exists) {  

               
                if(data.starsubjectnotes || data.starquestionotes ||  data.starlecandpdflink || data.stardoclink){
                  state.stardata = state.stardata.filter((item) => item._id !== id);
                  state.stardata.push(data);    
                }   
        if (
          starquestionotes === false &&
          starsubjectnotes === false &&
          starlecandpdflink === false &&
          stardoclink === false
        ) {
          state.stardata = state.stardata.filter((item) => item._id !== id);
        } else {
        }
      } else {
        if (
          starquestionotes === true ||
          starsubjectnotes === true ||
          starlecandpdflink === true ||
          stardoclink === true
        ) {
          state.stardata.push(data); 

        } 
      }

    },  
    reset:(state)=>{
      state.stardata=[];
    }
  },
});

export const { toggleStar , reset } = starSlice.actions;

export default starSlice.reducer;
 