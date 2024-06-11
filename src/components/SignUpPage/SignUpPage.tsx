import '../styles/LoginAndSignUp.css';
import { Box, Typography } from '@mui/material';
import SignUpForm from './SignUpForm';

const SignUpPage = () => {
  return (
    <Box className="sign-main-container">
    <Box className="left-container">
      <Box className="background-image" />
      <Box className="overlay" />
      <Box className="text-content">
        <Typography variant="h5">START YOUR JOURNEY</Typography>
      </Box>
    </Box>
    <Box className="right-container">
      <SignUpForm />
    </Box>
  </Box>
  );
};

export default SignUpPage;
