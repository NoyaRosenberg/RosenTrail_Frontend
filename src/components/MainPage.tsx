import "../styles/MainPage.css";
import { Box, Stack, Typography } from "@mui/material";
import Navbar from "./Navbar";

const MainPage = () => {
  return (
    <Stack className="main-container">
      <Navbar />
      <Box className="background-box">
        <Box className="background-image" />
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
    </Stack>
  );
};

export default MainPage;
