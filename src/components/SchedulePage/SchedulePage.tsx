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
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import "../../styles/Forms.css";
import '../../styles/TripPage.css';
import { useLocation } from 'react-router-dom';
import { useActivities } from '../../contexts/ActivityProvider';
import { Activity } from '../../services/activity.service';
import { Trip } from '../../services/trip.service';
import { useNavigate } from "react-router-dom";

const TripSchedulePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { trip } = location.state as { trip: Trip };
  const { activities, loading, error, fetchActivities } = useActivities();
  const [page, setPage] = useState(1);
  const [currentActivities, setCurrentActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetchActivities(trip._id);
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
          <Button variant="contained" color="primary" sx={{ mr: 2 }}>
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
                    <TableCell align="center">
                      <IconButton color="primary">
                        <Edit />
                      </IconButton>
                      <IconButton color="secondary">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Typography>No activities scheduled for this day.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default TripSchedulePage;
