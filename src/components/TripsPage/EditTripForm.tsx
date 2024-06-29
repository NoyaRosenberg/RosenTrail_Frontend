import React, { useState } from "react";
import {
  Box,
  TextField,
  Grid,
  Autocomplete,
  Button,
  Typography,
} from "@mui/material";
import FormHeader from "../Forms/FormHeader";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useTrips } from "../../contexts/TripProvider";
import { Trip } from "../../services/trip.service";
import userService, { User } from "../../services/user.service";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/Forms.css";
import { toast } from "react-toastify";

interface EditTripFormProps {
  trip: Trip;
  participants: User[];
}

const EditTripForm = ({ trip, participants }: EditTripFormProps) => {
  const { updateTrip, error } = useTrips();
  const [updatedTrip, setUpdatedTrip] = useState<Trip>({ ...trip });
  const [updatedParticipants, setUpdatedParticipants] = useState<User[]>([
    ...participants,
  ]);
  const [userNotFoundError, setUserNotFoundError] = useState<string | null>(
    null
  );

  const handleChange = (name: string, value: unknown) => {
    setUpdatedTrip((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateParticipants = async (event: unknown, emails: string[]) => {
    setUserNotFoundError(null);

    try {
      const newParticipants = await getParticipantsByEmails(emails);

      setUpdatedParticipants(newParticipants);
      setUpdatedTrip((trip) => ({
        ...trip,
        participantsId: newParticipants.map((participant) => participant!._id!),
      }));
    } catch (error) {
      setUserNotFoundError(error.message);
    }
  };

  const getParticipantsByEmails = async (emails: string[]) => {
    const participants = await Promise.all(
      emails.map(async (email) => {
        const existingParticipant = updatedParticipants.find(
          (participant) => participant.email === email
        );

        if (existingParticipant) {
          return existingParticipant;
        } else {
          return await fetchParticipantByEmail(email);
        }
      })
    );

    return participants as User[];
  };

  const fetchParticipantByEmail = async (email: string) => {
    try {
      return await userService.getByEmail(email);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(updatedTrip);

    if (isTripValid())
      updateTrip(updatedTrip).then((updatedTrip) => {
        if (updatedTrip) {
          console.log("Trip Updated Successfully");
          toast.success("Trip Updated Successfully");
        }
      });
  };

  const isTripValid = () => {
    return (
      updatedTrip.destinations.length != 0 &&
      updatedTrip.startDate &&
      updatedTrip.endDate
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className="form-main-container" margin="20px">
        <FormHeader
          mainTitle={"Edit Trip To " + trip.destinations.join(", ")}
          secondaryTitle="You can edit your trip plans here"
        />
        <Grid container spacing={2} component="form" sx={{ width: "100%" }}>
          <Grid item xs={6}>
            <DatePicker
              label="Start Date"
              value={updatedTrip.startDate}
              onChange={(startDate) => handleChange("startDate", startDate)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={!updatedTrip.startDate}
                  helperText={!updatedTrip.startDate ? "Required" : ""}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="End Date"
              value={updatedTrip.endDate}
              onChange={(endDate) => handleChange("endDate", endDate)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={!updatedTrip.endDate}
                  helperText={!updatedTrip.endDate ? "Required" : ""}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              multiple
              id="tags-filled"
              freeSolo
              value={updatedTrip.destinations}
              onChange={(event, destinations) =>
                handleChange("destinations", destinations)
              }
              options={[]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  variant="outlined"
                  label="Destinations"
                  placeholder="Destinations"
                  error={updatedTrip.destinations.length == 0}
                  helperText={
                    updatedTrip.destinations.length == 0
                      ? "Must provide destination"
                      : ""
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              multiple
              id="tags-filled"
              freeSolo
              value={updatedParticipants.map(
                (participant) => participant.email
              )}
              onChange={updateParticipants}
              options={[]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Participants"
                  placeholder="Participants"
                  error={!!userNotFoundError}
                  helperText={userNotFoundError}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              multiline
              fullWidth
              rows={3}
              value={updatedTrip.description}
              onChange={(event) =>
                handleChange("description", event.target.value)
              }
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default EditTripForm;
