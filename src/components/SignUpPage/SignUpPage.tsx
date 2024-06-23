import { Box, Typography } from '@mui/material';
import SignUpForm from './SignUpForm';
import '../../styles/Forms.css';
import '../../styles/SignUpPage.css';
import React from 'react';

const SignUpPage = () => {
  return (
    <Box className="form-page-main-container">
    <Box className="form-page-left-container">
      <Box className="form-page-background-image sign-up-image" />
      <Box className="form-page-overlay" />
      <Box className="form-page-text-content">
        <Typography variant="h5">START YOUR JOURNEY</Typography>
      </Box>
    </Box>
    <Box className="form-page-right-container">
      <SignUpForm />
    </Box>
  </Box>
  );
};

export default SignUpPage;
