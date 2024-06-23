import { Box, TextField, Button, Grid, Avatar, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Forms.css";
import FormHeader from "../Forms/FormHeader";
import ContactInfo from "../Forms/ContactInfo";
import authService, { AuthData } from "../../services/auth.service";
import ErrorMessage from "../Forms/ErrorMessage";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import React from "react";
import { useAuth } from "../../contexts/AuthProvider"; // import useAuth

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [imageData, setImageData] = useState<string | null>(null);
  const [imageDataPreview, setImageDataPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleImageDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const maxSize = 500; 

          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);

          const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.7); 
          setImageData(resizedDataUrl);
          setImageDataPreview(resizedDataUrl);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Submitting sign-up form");

    try {
      const authData = await authService.signUp(username, email, age, phoneNumber, password, imageData!);
      console.log('Auth data received:', authData);
      if (authData) {
        console.log(authData)
        login(authData); 
        navigate("/trips"); 
      } else {
        setError('Failed to sign up');
      }
    } catch (err) {
      setError((err as Error).message);
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
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Avatar
            src={imageDataPreview || ""}
            alt="Profile Photo"
            sx={{ width: 80, height: 80, margin: "0 auto" }}
          />
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="icon-button-file"
            type="file"
            onChange={handleImageDataChange}
          />
          <label htmlFor="icon-button-file">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </Grid>
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
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="text"
            label="Phone number"
            variant="outlined"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
        </Grid>
        <Grid item xs={12}>
          {error && <ErrorMessage errorMessage={error} />}
        </Grid>
      </Grid>
      <ContactInfo />
    </Box>
  );
};

export default SignUpForm;
