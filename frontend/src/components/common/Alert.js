import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeAlert } from '../../redux/slices/alertSlice';
import { Alert as MuiAlert, AlertTitle, Snackbar, Stack } from '@mui/material';

const Alert = () => {
  const dispatch = useDispatch();
  const alerts = useSelector(state => state.alerts.alerts);

  // Remove alerts after 5 seconds
  useEffect(() => {
    if (alerts.length > 0) {
      const timer = setTimeout(() => {
        dispatch(removeAlert(alerts[0].id));
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [alerts, dispatch]);

  if (alerts.length === 0) return null;

  return (
    <Stack spacing={2} sx={{ width: '100%', mb: 3 }}>
      {alerts.map((alert) => (
        <Snackbar
          key={alert.id}
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity={alert.type || 'info'}
            onClose={() => dispatch(removeAlert(alert.id))}
          >
            {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
            {alert.message}
          </MuiAlert>
        </Snackbar>
      ))}
    </Stack>
  );
};

export default Alert;