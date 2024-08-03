import React, { useState } from "react";
import {
  TextField,
  Grid,
  Autocomplete,
  Button,
  Typography,
  Avatar,
  Box,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useTrips } from "../../contexts/TripProvider";
import { Trip } from "../../services/trip.service";
import userService, { User } from "../../services/user.service";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/Forms.css";
import { toast } from "react-toastify";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

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
  const [imageDataPreview, setImageDataPreview] = useState<string>(
    trip.imgUrl || ""
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

  const handleImageDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result as string;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
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

          const resizedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
          setImageDataPreview(resizedDataUrl);
          setUpdatedTrip((trip) => ({
            ...trip,
            imgUrl: resizedDataUrl,
          }));
        };
      };

      reader.readAsDataURL(file);
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
      <Grid container spacing={2} paddingTop={4} paddingBottom={4} display="flex" justifyContent="center">
      <Grid item xs={4}>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Avatar
              alt="Profile Picture"
              src={imageDataPreview || ""}
              sx={{ width: 230, height: 230 }}
            />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="icon-button-file"
              type="file"
              onChange={handleImageDataChange}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                className="icon-button"
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Box>
        </Grid>
        <Grid item xs={8} display="flex" justifyContent="center" flexWrap="inherit">
          <Grid container spacing={2} component="form" paddingTop={2} paddingLeft={4} paddingRight={6}>
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
            <FormControl fullWidth>
              <InputLabel id="public-select-label">Access Mode</InputLabel>
              <Select
                labelId="public-select-label"
                id="public-select"
                value={updatedTrip.isPublic.toString()}
                label="Access Mode"
                onChange={event => handleChange('isPublic', event.target.value === 'true')}
              >
                <MenuItem value="true">public</MenuItem>
                <MenuItem value="false">private</MenuItem>
              </Select>
            </FormControl>
          </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="tags-filled"
                freeSolo
                value={updatedParticipants.map(
                  (participant) => participant.email
                )}
                onChange={updateParticipants}
                onInputChange={() => setUserNotFoundError(null)}
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
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default EditTripForm;
