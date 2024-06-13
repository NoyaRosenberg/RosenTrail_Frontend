import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Forms.css";
import FormHeader from "../Forms/FormHeader";
import ContactInfo from "../Forms/ContactInfo";
import authService from "../../services/auth.service";

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
      authService.signUp(email, password);
      console.log("Registration successful");
      navigate("/signin");
    } catch (err) {
      setError((err as Error).message || "Registration failed");
    }
  };

  return (
    <Box className="form-main-container">
      <FormHeader
        mainTitle="Sign Up"
        secondaryTitle="Sign up to save your wonderful trip plans"
      />
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
      <ContactInfo />
    </Box>
  );
};

export default SignUpForm;
