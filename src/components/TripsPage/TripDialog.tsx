import React, { useEffect, useState } from "react";
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
  Chip,
  Rating,
} from "@mui/material";
import { Delete, Edit, AddCircle } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import "../../styles/Forms.css";
import "../../styles/TripDialog.css";
import tripService, { Trip } from "../../services/trip.service";
import { useNavigate } from "react-router-dom";
import TripParticipants from "./TripParticipants";
import EditTripDialog from "./EditTripDialog";
import { User } from "../../services/user.service";
import dayjs from "dayjs";
import reviewService, { Review } from "../../services/review.service";

type TripDialogProps = {
  trip: Trip;
  price: number;
  open: boolean;
  showActions: boolean;
  onClose: () => void;
  onDelete: () => void;
};

const TripDialog: React.FC<TripDialogProps> = ({
  trip,
  price,
  open,
  showActions,
  onClose,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [participants, setParticipants] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [participantsData, reviewsData] = await Promise.all([
          tripService.getTripParticipants(trip._id!),
          reviewService.getTripReviews(trip._id!),
        ]);
        setParticipants(participantsData!);
        setReviews(reviewsData);
        
        if (reviewsData.length > 0) {
          const avgRating = reviewsData.reduce((sum, review) => sum + review.rating, 0) / reviewsData.length;
          setAverageRating(Number(avgRating.toFixed(1)));
        }
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchData();
  }, [trip]);

  const showSchedule = () => {
    navigate("/schedule", { state: { trip, showActions } });
  };

  const handleAddActivity = () => {
    navigate("/AddActivities", { state: { trip } });
  };

  const showReviews = () => {
    navigate("/reviews", { state: { trip } });
  };

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const onEditDialogClose = () => {
    setIsEditDialogOpen(false);
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

  const formatDate = (date: string | number | Date | dayjs.Dayjs | null | undefined) => {
    return dayjs(date).format("DD/MM/YYYY");
  };

  return (
    <>
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
                spacing={9}
                paddingTop="50px"
                paddingRight="80px"
                paddingBottom="40px"
              >
                <Stack spacing={5}>
                  <Stack spacing={1}>
                    <Stack>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography variant="h4" gutterBottom>
                          {trip.destinations.join(", ")}
                        </Typography>
                        <Chip
                          key="accessMode"
                          label={trip.isPublic ? "public" : "private"}
                          color="default"
                          sx={{ marginBottom: "0.35em" }}
                        />
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: 16, color: "#666" }}
                        gutterBottom
                      >
                        {trip.description}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: 16, color: "#a4a2a2", marginTop: "5px" }}
                    >
                      {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                    </Typography>
                  </Stack>
                  {error ? (
                    <Typography>Failed To fetch participants</Typography>
                  ) : (
                    <TripParticipants participants={participants} />
                  )}
                </Stack>
                <Stack>
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
                        {!showActions && (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={showReviews}
                            sx={{ width: "150px", height: "50px" }}
                          >
                            Reviews
                          </Button>
                        )}
                        <Typography variant="h6" component="p" color="#666">
                          {price} €
                        </Typography>
                      </Box>
                      { !showActions && (
                        <Box display="flex" alignItems="center" gap={1}>
                          <Rating value={averageRating ?? 0} readOnly size="small" precision={0.1} />
                          <Typography variant="body2" color="text.secondary">
                            ({averageRating ? averageRating.toFixed(1) : 0})
                          </Typography>
                        </Box>
                      )}
                      {showActions && (
                        <Stack>
                          <Divider />
                          <Box display="flex" justifyContent="center" gap={2}>
                            <Box className="icon-text">
                              <Typography variant="body1">
                                Add Activity
                              </Typography>
                              <IconButton
                                color="primary"
                                onClick={handleAddActivity}
                              >
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
                              <Typography variant="body1">
                                Delete Trip
                              </Typography>
                              <IconButton color="error" onClick={handleDelete}>
                                <Delete />
                              </IconButton>
                            </Box>
                          </Box>
                        </Stack>
                      )}
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      {isEditDialogOpen && (
        <EditTripDialog
          open={isEditDialogOpen}
          onClose={onEditDialogClose}
          trip={trip}
          participants={participants}
        />
      )}
    </>
  );
};

export default TripDialog;