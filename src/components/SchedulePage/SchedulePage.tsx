import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  IconButton,
  Box,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Pagination,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Delete, Edit } from '@mui/icons-material';
import "../../styles/Forms.css";
import "../../styles/TripDialog.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useActivities } from "../../contexts/ActivityProvider";
import { Activity } from "../../services/activity.service";
import { Trip } from "../../services/trip.service";
import CreateActivityPage from "../CreateActivityPage/CreateActivityPage";

const TripSchedulePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { trip, showActions } = location.state as {
    trip: Trip;
    showActions: boolean;
  };
  const { activities, loading, error, fetchActivities } = useActivities();
  const [page, setPage] = useState(1);
  const [currentActivities, setCurrentActivities] = useState<Activity[]>([]);
  const [open, setOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  // New state for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const datesPerPage = 7;

  useEffect(() => {
    fetchActivities(trip._id ?? "");
  }, [trip._id, fetchActivities]);

  useEffect(() => {
    if (activities.length && trip.startDate && trip.endDate) {
      const currentDate = new Date(trip.startDate);
      currentDate.setDate(currentDate.getDate() + page - 1);
      const activitiesForCurrentDate = activities.filter(
        (activity) =>
          new Date(activity.date).toDateString() === currentDate.toDateString()
      ).sort((a, b) => a.startTime.localeCompare(b.startTime));

      setCurrentActivities(activitiesForCurrentDate);
    }
  }, [page, activities, trip.startDate, trip.endDate]);

  const tripDuration = trip.startDate && trip.endDate ? Math.ceil(
    (new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) /
    (1000 * 3600 * 24)
  ) + 1 : 0;

  const totalPages = Math.ceil(tripDuration / datesPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const addActivity = () => {
    navigate("/AddActivities", { state: { trip } });
  };

  const manageBudget = () => {
    navigate("/budget", { state: { trip } });
  };

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    await fetchActivities(trip._id ?? "");
  };

  const handleDelete = async (activityId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/activities/${activityId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        fetchActivities(trip._id ?? "");
      } else {
        console.error("Failed to delete activity");
      }
    } catch (error) {
      console.error("Failed to delete activity:", error);
    }
  };

  const formatDate = (startDate: string, page: number) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + page - 1);
    return date.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: '2-digit', year: '2-digit' });
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 4, backgroundColor: "#f5e3ce", padding: 2, borderRadius: 2 }}
    >
      <Typography variant="h4" gutterBottom>
        Daily Planner
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight="bold">
          Schedule
        </Typography>
        {showActions && (
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={manageBudget}
              sx={{ mr: 2 }}
            >
              Manage Budget
            </Button>
            <Button variant="contained" color="primary" onClick={addActivity}>
              Add Attractions
            </Button>
          </Box>
        )}
      </Box>
      <Box display="flex">
        <Box sx={{ minWidth: 150, mr: 4 }}>
          <List>
            {Array.from({ length: datesPerPage }).map((_, index) => {
              const currentIndex = (currentPage - 1) * datesPerPage + index + 1;
              if (currentIndex <= tripDuration) {
                return (
                  <ListItem
                    key={currentIndex}
                    button
                    selected={page === currentIndex}
                    onClick={() => setPage(currentIndex)}
                    sx={{
                      backgroundColor: page === currentIndex ? "primary" : 'transparent',
                      color: page === currentIndex ? 'white' : 'black',
                      mb: 1,
                      borderRadius: 1,
                      '&.Mui-selected': {
                        fontWeight: 'bold',
                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.5),
                      }
                    }}
                  >
                    <ListItemText
                      primary={trip.startDate ? formatDate(trip.startDate.toString(), currentIndex) : ''}
                      sx={{ textAlign: 'center' }}
                    />
                  </ListItem>
                );
              }
              return null;
            })}
          </List>
          <Pagination 
            count={totalPages} 
            page={currentPage} 
            onChange={handlePageChange} 
            color="primary" 
            sx={{ mt: 2 }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : error ? (
            <Typography>Error: {error}</Typography>
          ) : (
            <Box>
              {currentActivities.length > 0 ? (
                currentActivities.map((activity) => (
                  <Card key={activity._id} sx={{ display: 'flex', mb: 2 }}>
                    <img
                      src={activity.imageUrl}
                      alt={activity.name}
                      style={{ width: 151 }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {activity.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {activity.description}
                        </Typography>
                        <Typography component="div" variant="subtitle1" color="text.secondary" >
                          {activity.startTime} - {activity.endTime}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Participants: {activity.participants}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Cost: ${activity.cost}
                        </Typography>
                      </CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <IconButton color="primary" onClick={() => handleEdit(activity)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(activity._id)}>
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>
                  </Card>
                ))
              ) : (
                <Typography>No activities scheduled for this day.</Typography>
              )}
              <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
                <DialogTitle>Edit Your Activity</DialogTitle>
                <DialogContent>
                  <CreateActivityPage trip={trip} activityToEdit={editingActivity} onClose={handleClose} />
                </DialogContent>
                <DialogActions>
                </DialogActions>
              </Dialog>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default TripSchedulePage;