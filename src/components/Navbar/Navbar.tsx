import { Box, Typography, ButtonGroup, Button } from "@mui/material";
import { Link } from "react-router-dom";
import AccountMenu from "./AccountMenu";
import React from "react";

export interface NavbarProps {
  isUserLoggedIn: boolean;
}

const Navbar = ({ isUserLoggedIn }: NavbarProps) => {
  return (
    <Box
      sx={{
        padding: "1rem",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h5"
        component="a"
        href=""
        sx={{ textDecoration: "none", color: "black", cursor: "pointer"}}
      >
        WonderPlan
      </Typography>
      <div>
        {!isUserLoggedIn ? (
          <ButtonGroup variant="text" aria-label="Basic button group">
            <Button component={Link} to="/signin" sx={{ fontWeight: "bold" }}>
              Login
            </Button>
            <Button component={Link} to="/register" sx={{ fontWeight: "bold" }}>
              Sign Up
            </Button>
          </ButtonGroup>
        ) : (
          <AccountMenu/>
        )}
      </div>
    </Box>
  );
};

export default Navbar;
