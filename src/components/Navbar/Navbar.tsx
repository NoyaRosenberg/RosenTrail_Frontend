import React from "react";
import { Box, Typography, ButtonGroup, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import "../../styles/Navbar.css";

export interface NavbarProps {
  isUserLoggedIn: boolean;
}

const Navbar = ({ isUserLoggedIn }: NavbarProps) => {
  const navigate = useNavigate();

  return (
    <Box className="navbar-container">
      <Typography variant="h5" component="a" href="" className="navbar-title">
        WonderPlan
      </Typography>
      <div>
        {!isUserLoggedIn ? (
          <ButtonGroup
            variant="text"
            className="button-group"
            aria-label="Basic button group"
          >
            <Button component={Link} to="/signin">
              Login
            </Button>
            <Button component={Link} to="/register">
              Sign Up
            </Button>
          </ButtonGroup>
        ) : (
          <Box display="flex" alignItems="center" gap="5">
            <Button
              variant="outlined"
              sx={{ height: "90%", paddingRight: "30px", paddingLeft: "30px" }}
              onClick={() => navigate("/trips")}
            >
              My Trips
            </Button>
            <AccountMenu />
          </Box>
        )}
      </div>
    </Box>
  );
};

export default Navbar;
