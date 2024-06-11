import { Box, Typography, ButtonGroup, Button } from "@mui/material"
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <Box className="nav-bar">
        <Typography variant="h5">
          WonderPlan
        </Typography>
        <ButtonGroup variant="text" aria-label="Basic button group">
          <Button component={Link} to="/createTrip">
            Create Trip
          </Button>
          <Button component={Link} to="/community">
            Community Trips
          </Button>
          <Button component={Link} to="/signin">
            Login
          </Button>
          <Button component={Link} to="/register">
            Sign Up
          </Button>
        </ButtonGroup>
      </Box>
    )
}

export default Navbar