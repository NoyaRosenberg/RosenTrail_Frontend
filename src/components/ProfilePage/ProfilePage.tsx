import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Avatar, MenuItem, Box, Typography, Snackbar, Alert, IconButton } from '@mui/material';
import { useAuth } from '../../contexts/AuthProvider';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios';
import '../../styles/ProfilePage.css';

const ProfilePage = () => {
  const { authData, setAuthData } = useAuth();
  const [userData, setUserData] = useState({
    userId: authData?.userId || '',
    username: '',
    email: '',
    phoneNumber: '',
    gender: '',
    age: '',
    imageData: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [imageDataPreview, setImageDataPreview] = useState<string>(userData.imageData || '');

  useEffect(() => {
    if (authData?.userId) {
      fetchUserData(authData.userId);
    }
  }, [authData]);

  const fetchUserData = async (userId: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      const data = response.data;
      setUserData({
        userId: data._id || '',
        username: data.username || '',
        email: data.email || '',
        phoneNumber: data.phoneNumber || '',
        gender: data.gender || '',
        age: data.age || '',
        imageData: data.imageData || ''
      });
      setImageDataPreview(data.imageData || '');
      setErrorMessage('');
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      setErrorMessage('Failed to fetch user data');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
          setUserData((prevData) => ({
            ...prevData,
            imageData: resizedDataUrl
          }));
          setImageDataPreview(resizedDataUrl);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const updatedUserData = { ...userData };
      if (!userData.userId) {
        setErrorMessage('User ID is missing');
        return;
      }

      const response = await axios.put(`http://localhost:3000/users/${userData.userId}`, updatedUserData);
      const newUserData = {
        ...authData,
        ...response.data
      };
      
      localStorage.setItem('currentUser', JSON.stringify(newUserData)); 
      setAuthData(newUserData); 
      setUserData(newUserData);
      setSuccessMessage('Profile updated successfully');
      setErrorMessage('');
    } catch (error) {
      console.error('Failed to update profile:', error);
      setErrorMessage('Failed to update profile');
    }
  };

  return (
    <Box className="profile-container">
      <Container>
        <Box className="profile-content">
          <Box className="profile-form">
            <Typography variant="h4">Profile Info</Typography>
            <TextField
              label="Username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="E-mail"
              name="email"
              value={userData.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <TextField
                label="Gender"
                name="gender"
                value={userData.gender}
                onChange={handleChange}
                select
                fullWidth
                variant="outlined"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
              <TextField
                label="Age"
                name="age"
                value={userData.age}
                onChange={handleChange}
                select
                fullWidth
                variant="outlined"
              >
                {[...Array(100).keys()].map((number) => (
                  <MenuItem key={number} value={number + 1}>
                    {number + 1}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Button
              className="save-button"
              variant="contained"
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
          <Box className="profile-avatar-container">
            <Avatar
              alt="Profile Picture"
              src={imageDataPreview || ""}
              sx={{ width: 150, height: 150 }}
            />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="icon-button-file"
              type="file"
              onChange={handleImageDataChange}
            />
            <label htmlFor="icon-button-file">
              <IconButton className="icon-button" color="primary" aria-label="upload picture" component="span">
                <PhotoCamera />
              </IconButton>
            </label>
          </Box>
        </Box>
        <Snackbar
          open={!!successMessage}
          autoHideDuration={6000}
          onClose={() => setSuccessMessage('')}
        >
          <Alert onClose={() => setSuccessMessage('')} severity="success">
            {successMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          open={!!errorMessage}
          autoHideDuration={6000}
          onClose={() => setErrorMessage('')}
        >
          <Alert onClose={() => setErrorMessage('')} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default ProfilePage;
