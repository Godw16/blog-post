import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import postReducer from './slices/postSlice';
import alertReducer from './slices/alertSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    alerts: alertReducer
  }
});

export default store;