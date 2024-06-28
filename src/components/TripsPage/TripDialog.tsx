import React from "react";
import {
  Typography,
  Button,
  IconButton,
  Box,
  Grid,
  Dialog,
  DialogContent,
  Stack,
  Divider,
} from "@mui/material";
import { Delete, Edit, AddCircle } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import "../../styles/Forms.css";
import "../../styles/TripDialog.css";
import { Trip } from "../../services/trip.service";
import { useNavigate } from "react-router-dom";
import TripParticipants from "./TripParticipants";

type TripDialogProps = {
  trip: Trip;
  price: number;
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
};

const TripDialog: React.FC<TripDialogProps> = ({
  trip,
  price,
  open,
  onClose,
  onDelete,
}) => {
  const navigate = useNavigate();

  const showSchedule = () => {
    navigate("/schedule", { state: { trip } });
  };

  const handleAddActivity = () => {
    navigate("/AddActivities", { state: { trip } });
  }

  const handleEdit = () => {
    // Edit logic
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/trips/${trip._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        onDelete();
        onClose();
      } else {
        console.error("Failed to delete trip");
      }
    } catch (error) {
      console.error("Failed to delete trip:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: "15px",
        },
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ padding: 0, overflow: "hidden" }}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={5}>
            <img
              src={trip.imgUrl}
              alt="Placeholder"
              style={{ width: "100%", height: "100%" }}
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <Stack
              spacing={15}
              paddingTop="50px"
              paddingRight="80px"
              paddingBottom="40px"
            >
              <Stack spacing={3}>
                <Stack>
                  <Typography variant="h4" gutterBottom>
                    {trip.destinations.join(", ")}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: 16, color: "#666" }}
                    gutterBottom
                  >
                    {trip.description}
                  </Typography>
                </Stack>
                <TripParticipants tripId={trip._id!} />
              </Stack>
              <Stack>
                <Stack spacing={5}>
                  <Box display="flex" alignItems="center" gap="40px">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={showSchedule}
                      sx={{ width: "150px", height: "50px" }}
                    >
                      Schedule
                    </Button>
                    <Typography variant="h6" component="p" color="#666">
                      {price} €
                    </Typography>
                  </Box>
                  <Stack>
                    <Divider />
                    <Box display="flex" justifyContent="center" gap={2}>
                      <Box className="icon-text">
                        <Typography variant="body1">Add Activity</Typography>
                        <IconButton color="primary" onClick={handleAddActivity}>
                          <AddCircle />
                        </IconButton>
                      </Box>
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                      />
                      <Box className="icon-text">
                        <Typography variant="body1">Edit Trip</Typography>
                        <IconButton color="primary" onClick={handleEdit}>
                          <Edit />
                        </IconButton>
                      </Box>
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                      />
                      <Box className="icon-text">
                        <Typography variant="body1">Delete Trip</Typography>
                        <IconButton color="error" onClick={handleDelete}>
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default TripDialog;
