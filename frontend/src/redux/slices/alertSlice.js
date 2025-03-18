import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alerts: []
};

const alertSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      const id = Date.now();
      state.alerts.push({
        id,
        ...action.payload
      });
    },
    removeAlert: (state, action) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
    }
  }
});

export const { setAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;