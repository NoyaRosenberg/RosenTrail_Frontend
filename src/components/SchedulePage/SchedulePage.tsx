import React, { useState, useEffect } from 'react';
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
import { Trip } from '../../services/trip.service';

export interface ITrip {
  _id: string;
  destinations: string[];
  startDate: Date;
  endDate: Date;
  ownerId: string;
  participantsId: string[];
  unregisteredParticipants?: string[];
  activitiesId: string[];
  imgUrl: string;
}

export interface IActivity {
  _id: string;
  tripId: string;
  name: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  cost: number;
  participantsId: string[];
  unregisteredParticipants: string[];
}

const activitiesData: IActivity[] = [
  // Example activities data
  {
    _id: '1',
    tripId: '1',
    name: 'Visit Eiffel Tower',
    date: new Date('2024-06-19'),
    startTime: '10:00 AM',
    endTime: '12:00 PM',
    location: 'Eiffel Tower',
    description: 'A visit to the Eiffel Tower.',
    cost: 20,
    participantsId: ['1'],
    unregisteredParticipants: ['John Doe']
  },
  {
    _id: '2',
    tripId: '1',
    name: 'Lunch at Cafe',
    date: new Date('2024-06-19'),
    startTime: '01:00 PM',
    endTime: '02:00 PM',
    location: 'Local Cafe',
    description: 'Lunch at a local cafe.',
    cost: 15,
    participantsId: ['1'],
    unregisteredParticipants: ['Jane Doe']
  },
  // Add more activities as needed
];

const tripData: ITrip = {
  _id: '1',
  destinations: ['Paris'],
  startDate: new Date('2024-06-19'),
  endDate: new Date('2024-06-21'),
  ownerId: '1',
  participantsId: ['1'],
  activitiesId: ['1', '2'],
  imgUrl: '/public/Paris.jpeg'
};

const TripSchedulePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [currentActivities, setCurrentActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    // Calculate the number of days in the trip
    const tripDuration = Math.ceil(
      (new Date(tripData.endDate).getTime() - new Date(tripData.startDate).getTime()) /
      (1000 * 3600 * 24)
    ) + 1;

    // Get activities for the current page (current day)
    const currentDate = new Date(tripData.startDate);
    currentDate.setDate(currentDate.getDate() + page - 1);
    const activitiesForCurrentDate = activitiesData.filter(
      (activity) =>
        new Date(activity.date).toDateString() === currentDate.toDateString()
    );

    setCurrentActivities(activitiesForCurrentDate);
  }, [page]);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const tripDuration = Math.ceil(
    (new Date(tripData.endDate).getTime() - new Date(tripData.startDate).getTime()) /
    (1000 * 3600 * 24)
  ) + 1;

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
          <Button variant="contained" color="primary">
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
    </Container>
  );
};

export default TripSchedulePage;
