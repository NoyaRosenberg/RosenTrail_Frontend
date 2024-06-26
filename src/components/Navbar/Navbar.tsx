import React from "react";
import { Box, Typography, ButtonGroup, Button } from "@mui/material";
import { Link } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import '../../styles/Navbar.css'; 

export interface NavbarProps {
  isUserLoggedIn: boolean;
}

const Navbar = ({ isUserLoggedIn }: NavbarProps) => {
  return (
    <Box className="navbar-container">
      <Typography
        variant="h5"
        component="a"
        href=""
        className="navbar-title"
      >
        WonderPlan
      </Typography>
      <div>
        {!isUserLoggedIn ? (
          <ButtonGroup variant="text" className="button-group" aria-label="Basic button group">
            <Button component={Link} to="/signin">
              Login
            </Button>
            <Button component={Link} to="/register">
              Sign Up
            </Button>
          </ButtonGroup>
        ) : (
          <AccountMenu />
        )}
      </div>
    </Box>
  );
};

export default Navbar;
