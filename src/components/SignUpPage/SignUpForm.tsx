import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Forms.css";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username, email, password, imgUrl: "" }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful registration (e.g., redirect to login)
        console.log("Registration successful:", data);
        navigate("/signin"); // Redirect to sign-in page
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Box className="form-main-container">
      <Box className="header">
        <Typography variant="h4" component="h2" gutterBottom>
          Sign Up
        </Typography>
        <Typography variant="body1" gutterBottom>
          Sign up to save your wonderful trip plans
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: "100%" }}
      >
        <Grid item xs={6}>
          <TextField
            type="text"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="email"
            label="E-mail"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="text"
            label="Age"
            variant="outlined"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            fullWidth
          />{" "}
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="text"
            label="Phone number"
            variant="outlined"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
          />{" "}
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />{" "}
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
        </Grid>
        <Grid item xs={12}>
          {error && (
            <Typography variant="body2" className="error">
              {error}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Box className="contact-info">
        <Typography variant="body2" className="contact-info">
          Need help? Contact us at:
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Wonderplan@gmail.com
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUpForm;
