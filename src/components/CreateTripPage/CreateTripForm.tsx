import React, { useState } from 'react';
import { Box, TextField, Button, Grid, Autocomplete } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactInfo from "../Forms/ContactInfo";
import FormHeader from "../Forms/FormHeader";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom";
import { useTrips } from "../../contexts/TripProvider";
import "../../styles/Forms.css";
import tripService from '../../services/trip.service';

const CreateTripForm: React.FC = () => {
  const { fetchTrips } = useTrips();
  const [trip, setTrip] = useState({
    startDate: new Date(),
    endDate: new Date(),
    destinations: [] as string[],
    participants: [] as string[],
    ownerId: JSON.parse(localStorage.getItem('currentUser') || '{}')?.userId || '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTrip((prevTrip) => ({
      ...prevTrip,
      [name]: value.split(","),
    }));
  };

  const handleDateChange = (date: Date | null, name: string) => {
    setTrip((prevTrip) => ({
      ...prevTrip,
      [name]: date,
    }));
  };

  const updateParticipants = (event: any, newVal: string[]) => {
    setTrip((prevTrip) => ({
      ...prevTrip,
      participants: newVal,
    }));
  };

  const updateDestinations = (event: any, newVal: string[]) => {
    setTrip((prevTrip) => ({
      ...prevTrip,
      destinations: newVal,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
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
      await tripService.createTrip(cleanedTrip);
      toast.success("Trip created successfully");
      fetchTrips(); 
      navigate("/trips");
    } catch (error) {
      toast.error("Failed to create trip");
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
            <Autocomplete
              multiple
              id="tags-filled"
              freeSolo
              onChange={updateDestinations}
              options={[]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label="Destinations"
                  placeholder="Destinations"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="tags-filled"
              freeSolo
              onChange={updateParticipants}
              options={[]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label="Participants"
                  placeholder="Participants"
                />
              )}
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
