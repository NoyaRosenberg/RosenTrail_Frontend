import React from "react";
import "../styles/MainPage.css";
import { Box, Typography } from "@mui/material";

const MainPage = () => {
  return (
    <Box className="background-box">
      <Box className="home-background-image" />
      <Box className="overlay" />
      <Box className="text-content">
        <Typography variant="h5">Welcome</Typography>
        <Typography variant="h3">THIS IS NATURE</Typography>
        <Typography variant="h6">
          All you need to start your wonderful vacation
        </Typography>
        <Typography color="white" className="sub-description">
          Plan | Cherish | Share
        </Typography>
      </Box>
    </Box>
  );
};

export default MainPage;
