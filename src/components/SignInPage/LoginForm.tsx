import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactInfo from "../Forms/ContactInfo";
import FormHeader from "../Forms/FormHeader";
import authService from "../../services/auth.service";
import "../../styles/Forms.css";
import ErrorMessage from "../Forms/ErrorMessage";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(JSON.stringify({ email, password }));

    try {
      await authService.login(email, password);
      console.log("Login successful");
      navigate("/trips");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <Box className="form-main-container">
      <FormHeader
        mainTitle="Login"
        secondaryTitle="Log in and continue your wonderful trip plans"
      />
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
        <Box className="form-buttons-container">
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
      </Box>
      {error && <ErrorMessage errorMessage={error} />}
      <ContactInfo />
    </Box>
  );
};

export default LoginForm;
