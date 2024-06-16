import { useState } from "react";
import { Box, TextField, Button, Grid } from "@mui/material";
import ContactInfo from "../Forms/ContactInfo";
import FormHeader from "../Forms/FormHeader";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "../../styles/Forms.css";
import React from 'react';

const CreateTripForm = () => {
  const [trip, setTrip] = useState({
    startDate: new Date(),
    endDate: new Date(),
    destination: "",
    city: "",
    participants: [],
  });

  const handleChange = (e: { target: { name: string; value: unknown } }) => {
    const { name, value } = e.target;
    setTrip({
      ...trip,
      [name]: value,
    });
  };

  const handleDateChange = (date: Date | null, name: string) => {
    setTrip({
      ...trip,
      [name]: date,
    });
  };

  const handleSave = () => {
    console.log("Trip details saved:", trip);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className="form-main-container">
        <FormHeader
          mainTitle="Create Trip"
          secondaryTitle="Enter your next journey details"
        />
        <Grid
          container
          spacing={2}
          component="form"
          onSubmit={handleSave}
          sx={{ width: "100%" }}
        >
          <Grid item xs={6}>
            <DatePicker
              label="Start Date"
              value={trip.startDate}
              onChange={(date) => handleDateChange(date, "startDate")}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="End Date"
              value={trip.endDate}
              onChange={(date) => handleDateChange(date, "endDate")}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="text"
              name="destination"
              label="Destination"
              value={trip.destination}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="text"
              name="city"
              label="City"
              value={trip.city}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="text"
              name="participants"
              label="Participants"
              value={trip.participants}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Trip
            </Button>
          </Grid>
        </Grid>
        <ContactInfo />
      </Box>
    </LocalizationProvider>
  );
};

export default CreateTripForm;
