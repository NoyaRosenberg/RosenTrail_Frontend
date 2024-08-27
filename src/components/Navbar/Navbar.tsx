import React, { useEffect } from "react";
import { Box, Typography, ButtonGroup, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import "../../styles/Navbar.css";

export interface NavbarProps {
  isUserLoggedIn: boolean;
}

const Navbar = ({ isUserLoggedIn }: NavbarProps) => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [location.pathname]);

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
            <Button component={Link} to="/communityTrips">
              Community Trips
            </Button>
            <Button component={Link} to="/signin">
              Login
            </Button>
            <Button component={Link} to="/register">
              Sign Up
            </Button>
          </ButtonGroup>
        ) : (
          <Box display="flex" alignItems="center" gap="5">
            <ButtonGroup variant="outlined" aria-label="Basic button group">
              <Button component={Link} to="/communityTrips">
                Community Trips
              </Button>
              <Button component={Link} to="/trips">My Trips</Button>
            </ButtonGroup>
            <AccountMenu />
          </Box>
        )}
      </div>
    </Box>
  );
};

export default Navbar;
