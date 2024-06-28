import React, { useState } from "react";
import { Box, TextField, Grid, Autocomplete, Button } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormHeader from "../Forms/FormHeader";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom";
import { useTrips } from "../../contexts/TripProvider";
import "../../styles/Forms.css";
import tripService, { Trip } from "../../services/trip.service";

interface EditTripFormProps {
  trip: Trip;
}

const EditTripForm = ({ trip }: EditTripFormProps) => {
  const { fetchTrips } = useTrips();
  const [updatedTrip, setUpdatedTrip] = useState({ ...trip });
  const navigate = useNavigate();

  const handleDateChange = (date: Date | null, name: string) => {
    setUpdatedTrip((prevTrip) => ({
      ...prevTrip,
      [name]: date,
    }));
  };

  const updateParticipants = (event: unknown, newVal: string[]) => {
    setUpdatedTrip((prevTrip) => ({
      ...prevTrip,
      participants: newVal,
    }));
  };

  const updateDestinations = (event: unknown, newVal: string[]) => {
    setUpdatedTrip((prevTrip) => ({
      ...prevTrip,
      destinations: newVal,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !updatedTrip ||
      !updatedTrip.participantsId ||
      !updatedTrip.destinations
    ) {
      console.error("Invalid trip data:", updatedTrip);
      return;
    }

    try {
      const cleanedTrip = {
        ...updatedTrip,
        participants: updatedTrip.participantsId.map((participant: string) =>
          participant ? participant.trim() : ""
        ),
        destinations: updatedTrip.destinations.map((destination: string) =>
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
      <Box className="form-main-container" margin="20px">
        <FormHeader
          mainTitle={"Edit Trip To " + trip.destinations.join(", ")}
          secondaryTitle="You can edit your trip plans here"
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
              value={updatedTrip.startDate}
              onChange={(date) => handleDateChange(date!, "startDate")}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="End Date"
              value={updatedTrip.endDate}
              onChange={(date) => handleDateChange(date!, "endDate")}
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
                  variant="outlined"
                  label="Destinations"
                  placeholder="Destinations"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              multiple
              id="tags-filled"
              freeSolo
              onChange={updateParticipants}
              options={[]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Participants"
                  placeholder="Participants"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Description" multiline fullWidth rows={3} value={updatedTrip.description}/>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default EditTripForm;
