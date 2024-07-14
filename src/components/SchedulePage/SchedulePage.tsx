import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Container,
  Stack,
  Typography,
  Button,
  IconButton,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import "../../styles/Forms.css";
import '../../styles/TripDialog.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useActivities } from '../../contexts/ActivityProvider';
import { Activity } from '../../services/activity.service';
import { Trip } from '../../services/trip.service';
import CreateActivityPage from '../CreateActivityPage/CreateActivityPage';

const TripSchedulePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { trip } = location.state as { trip: Trip };
  const { activities, loading, error, fetchActivities } = useActivities();
  const [page, setPage] = useState(1);
  const [currentActivities, setCurrentActivities] = useState<Activity[]>([]);
  const [open, setOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  useEffect(() => {
    fetchActivities(trip._id ?? '');
  }, [trip._id, fetchActivities]);

  useEffect(() => {
    if (activities.length && trip.startDate && trip.endDate) {
      const tripDuration = Math.ceil(
        (new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) /
        (1000 * 3600 * 24)
      ) + 1;

      const currentDate = new Date(trip.startDate);
      currentDate.setDate(currentDate.getDate() + page - 1);
      const activitiesForCurrentDate = activities.filter(
        (activity) =>
          new Date(activity.date).toDateString() === currentDate.toDateString()
      );

      setCurrentActivities(activitiesForCurrentDate);
    }
  }, [page, activities, trip.startDate, trip.endDate]);

  const tripDuration = trip.startDate && trip.endDate ? Math.ceil(
    (new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) /
    (1000 * 3600 * 24)
  ) + 1 : 0;

  const handleChangePage = (event: ChangeEvent<unknown>, page: number): void => {
    setPage(page);
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
    console.log("Edit activity with ID:", activity._id);
  };

  const handleClose = async () => {
    setOpen(false);
    await fetchActivities(trip._id ?? '');
  };

  const handleDelete = async (activityId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/activities/${activityId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchActivities(trip._id ?? ''); // Refresh activities list
      } else {
        console.error("Failed to delete activity");
      }
    } catch (error) {
      console.error("Failed to delete activity:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, backgroundColor: '#f5e3ce', padding: 2, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Daily Planner
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Schedule
        </Typography>
        <Box>
          <Button variant="contained" color="primary" onClick={manageBudget} sx={{ mr: 2 }}>
            Manage Budget
          </Button>
          <Button variant="contained" color="primary" onClick={addActivity}>
            Add Attractions
          </Button>
        </Box>
      </Box>
      <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" mb={2}>
        <Pagination
          count={tripDuration}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Stack>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography>Error: {error}</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ backgroundColor: '#fff', borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Time</TableCell>
                <TableCell>Activity</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Participants</TableCell>
                <TableCell>Total Cost</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentActivities.length > 0 ? (
                currentActivities.map((activity) => (
                  <TableRow key={activity._id}>
                    <TableCell component="th" scope="row">
                      <Typography fontWeight="bold">
                        {activity.startTime} - {activity.endTime}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{activity.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{activity.description}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{activity.participants}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>${activity.cost}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" onClick={() => handleEdit(activity)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleDelete(activity._id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography>No activities scheduled for this day.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
            <DialogTitle>Edit Your Activity</DialogTitle>
            <DialogContent>
              <CreateActivityPage trip={trip} activityToEdit={editingActivity} onClose={handleClose} />
            </DialogContent>
            <DialogActions>
            </DialogActions>
          </Dialog>
        </TableContainer>
      )}
    </Container>
  );
};

export default TripSchedulePage;