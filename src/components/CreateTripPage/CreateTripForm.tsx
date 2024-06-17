import { useState } from "react";
import { Box, TextField, Button, Grid } from "@mui/material";
import ContactInfo from "../Forms/ContactInfo";
import FormHeader from "../Forms/FormHeader";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TripService from '../../services/trip.service'
import "../../styles/Forms.css";
import React from 'react';

const CreateTripForm = () => {
  const [trip, setTrip] = useState({
    startDate: new Date(),
    endDate: new Date(),
    destinations: [],
    participants: [],
    ownerId:  JSON.parse(localStorage.getItem('currentUser') || '{}')?.userId || '' ,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTrip((prevTrip) => {
      const newValue = typeof value === "string" ? value.split(",") : value;
      return {
        ...prevTrip,
        [name]: newValue,
      };
    });
  };

  const handleDateChange = (date: Date | null, name: string) => {
    setTrip((prevTrip) => ({
      ...prevTrip,
      [name]: date,
    }));
  };

  const handleSave = async () => {
    if (!trip || !trip.participants || !trip.destinations) {
      console.error("Invalid trip data:", trip);
      return;
    }
    try {
      const cleanedTrip = {
        ...trip,
        participants: trip.participants.map((participant: string) =>
          participant ? participant.trim() : ""
        ),
        destinations: trip.destinations.map((destination: string) =>
          destination ? destination.trim() : ""
        ),
      };
      await TripService.CreateTrip(cleanedTrip);
    } catch (error) {
      console.error("Failed to save trip:", error);
    }
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
              name="destinations"
              label="Destination"
              value={trip.destinations.join(",")}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          {/* <Grid item xs={6}>
            <TextField
              type="text"
              name="city"
              label="City"
              value={trip.city}
              onChange={handleChange}
              fullWidth
            />
          </Grid> */}
          <Grid item xs={12}>
            <TextField
              type="text"
              name="participants"
              label="Participants (comma separated)"
              value={trip.participants.join(",")}
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
