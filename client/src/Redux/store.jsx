import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import adminReducer from './Slices/adminSlice';
import userReducer from './Slices/userSlice';   
import subjectReducer from "./Slices/subjectSlice" 
import deleteReducer  from "./Slices/deleteSlice" 
import checkReducer  from  "./Slices/checksignin" 
import starReducer from "./Slices/starslice"


const rootReducer = combineReducers({
  admin: adminReducer,
  user: userReducer, 
  subject:subjectReducer,  
  delete:deleteReducer  , 
  check :checkReducer  , 
  star:starReducer
}); 


const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
