import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00ADB5',
      light: '#4DDBE3',
      dark: '#008B92',
      contrastText: '#EEEEEE',
    },
    secondary: {
      main: '#393E46',
      light: '#4A4F58',
      dark: '#2B2F35',
      contrastText: '#EEEEEE',
    },
    background: {
      default: '#EEEEEE',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#222831',
      secondary: '#393E46',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: '#222831',
    },
    h2: {
      fontWeight: 600,
      color: '#222831',
    },
    h3: {
      fontWeight: 600,
      color: '#222831',
    },
    h4: {
      fontWeight: 600,
      color: '#222831',
    },
    h5: {
      fontWeight: 600,
      color: '#222831',
    },
    h6: {
      fontWeight: 600,
      color: '#222831',
    },
    body1: {
      color: '#222831',
    },
    body2: {
      color: '#393E46',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 600,
        },
        containedPrimary: {
          backgroundColor: '#00ADB5',
          '&:hover': {
            backgroundColor: '#008B92',
          },
        },
        containedSecondary: {
          backgroundColor: '#393E46',
          '&:hover': {
            backgroundColor: '#2B2F35',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#222831',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;