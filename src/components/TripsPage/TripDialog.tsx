import React from "react";
import {
  Typography,
  Button,
  IconButton,
  Box,
  Avatar,
  Grid,
  Tooltip,
  Chip,
  Dialog,
  DialogContent,
  Stack,
  Divider,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import "../../styles/Forms.css";
import "../../styles/TripPage.css";
import { Trip } from "../../services/trip.service";
import { useNavigate } from "react-router-dom";

type TripDialogProps = {
  trip: Trip;
  price: number;
  open: boolean;
  onClose: () => void;
};

const TripDialog: React.FC<TripDialogProps> = ({
  trip,
  price,
  open,
  onClose,
}) => {
  const navigate = useNavigate();

  const showSchedule = () => {
    navigate("/schedule");
  };

  const handleEdit = () => {
    // Edit logic
  };

  const handleDelete = () => {
    // Delete logic
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
              spacing={12}
              paddingTop="40px"
              paddingRight="40px"
              paddingBottom="40px"
            >
              <Stack spacing={3}>
                <Stack>
                  <Typography variant="h4" gutterBottom>
                    {trip.destinations.join(", ")}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontSize: 14, color: "#666" }}
                    gutterBottom
                  >
                    {trip.description}
                  </Typography>
                </Stack>
                <Box display="flex" alignItems="center" gap="2">
                  <Chip
                    key="participants:"
                    label="participants:"
                    color={"primary"}
                  />
                  {trip.participantsId?.map((participant, index) => (
                    <Tooltip title={participant} key={index}>
                      <Avatar className="trip-avatar">
                        {participant.charAt(0).toUpperCase()}
                      </Avatar>
                    </Tooltip>
                  ))}
                </Box>
              </Stack>
              <Stack>
                <Stack spacing={4}>
                  <Box display="flex" alignItems="center" gap="30px">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={showSchedule}
                      sx={{ width: "150px", height: "50px" }}
                    >
                      Schedule
                    </Button>
                    <Typography variant="h5" component="p">
                      {price} €
                    </Typography>
                  </Box>
                  <Stack>
                    <Divider />
                    <Box display="flex" gap={2}>
                      <Box className="icon-text">
                        <Typography variant="body2">Delete Trip</Typography>
                        <IconButton color="secondary" onClick={handleDelete}>
                          <Delete />
                        </IconButton>
                      </Box>
                      <Box className="icon-text">
                        <Typography variant="body2">Edit Trip</Typography>
                        <IconButton color="primary" onClick={handleEdit}>
                          <Edit />
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
