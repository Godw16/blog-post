import React from 'react';
import { Box, Container, Typography, Link, useTheme } from '@mui/material';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: '#222831',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center" color="#EEEEEE">
          © {new Date().getFullYear()} S0ulKing Crew
        </Typography>
        <Typography variant="body2" align="center" color="#EEEEEE" sx={{ mt: 1 }}>
          <Link color="inherit" href="/">
            Terms of Service
          </Link>{' '}
          ·{' '}
          <Link color="inherit" href="/">
            Privacy Policy
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;