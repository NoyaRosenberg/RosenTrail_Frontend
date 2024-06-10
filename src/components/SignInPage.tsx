import "../styles/SignInPage.css";
import { Box, Typography } from "@mui/material";
import LoginForm from "./LoginForm";

const SignInPage = () => {
  return (
    <Box className="sign-in-main-container">
      <Box className="left-container">
        <Box className="background-image" />
        <Box className="overlay" />
        <Box className="text-content">
          <Typography variant="h5">CONTINUE YOUR JOURNEY</Typography>
        </Box>
      </Box>
      <Box className="right-container">
        <LoginForm />
      </Box>
    </Box>
  );
};

export default SignInPage;
