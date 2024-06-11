import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Forms.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle successful login (e.g., save token, redirect)
        console.log("Login successful:", data);
        navigate("/"); // Redirect to main page or user dashboard
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Box className="form-main-container">
      <Box className="header">
        <Typography variant="h4" component="h2" gutterBottom>
          Log in
        </Typography>
        <Typography variant="body1" gutterBottom>
          Log in and continue your wonderful trip plans
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
        <TextField
          type="email"
          label="E-mail"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box className="buttons-container">
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Log in
          </Button>
          <Button
            variant="outlined"
            className="google-login"
            fullWidth
            onClick={() => {}}
          >
            Log in with Google
          </Button>
        </Box>
        {error && (
          <Typography variant="body2" className="error">
            {error}
          </Typography>
        )}
      </Box>
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

export default LoginForm;
