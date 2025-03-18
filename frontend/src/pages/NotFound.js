import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Box, Button, Paper } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const NotFound = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
        <Typography variant="h1" component="h1" sx={{ fontWeight: 700, color: '#00ADB5', fontSize: { xs: '3rem', md: '4rem' } }}>
          404
        </Typography>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 600, color: '#222831', mb: 2 }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ color: '#393E46', mb: 4 }}>
          The page you are looking for doesn't exist or has been moved.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            startIcon={<HomeIcon />}
            sx={{ backgroundColor: '#00ADB5' }}
          >
            Back to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NotFound;