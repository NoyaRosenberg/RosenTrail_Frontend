import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Forms.css";
import FormHeader from "../Forms/FormHeader";
import ContactInfo from "../Forms/ContactInfo";

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
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
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
      <FormHeader mainTitle="Sign Up" secondaryTitle="Sign up to save your wonderful trip plans"/>
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
      <ContactInfo/>
    </Box>
  );
};

export default SignUpForm;
