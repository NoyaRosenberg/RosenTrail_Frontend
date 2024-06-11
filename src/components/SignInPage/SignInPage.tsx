import { Box, Typography } from "@mui/material";
import LoginForm from "./LoginForm";
import '../../styles/Forms.css';
import '../../styles/SignInPage.css';

const SignInPage = () => {
  return (
    <Box className="form-page-main-container">
      <Box className="form-page-left-container">
        <Box className="form-page-background-image sign-in-image" />
        <Box className="form-page-overlay" />
        <Box className="form-page-text-content">
          <Typography variant="h5">CONTINUE YOUR JOURNEY</Typography>
        </Box>
      </Box>
      <Box className="form-page-right-container">
        <LoginForm />
      </Box>
    </Box>
  );
};

export default SignInPage;
