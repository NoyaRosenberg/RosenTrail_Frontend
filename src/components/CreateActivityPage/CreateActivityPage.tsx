import { Box } from '@mui/material';
import CreateActivityForm from './CreateActivityForm';
import '../../styles/CreateTrip.css';
import '../../styles/Forms.css';
import React from 'react';
import { Trip } from '../../services/trip.service';
import { Activity } from '../../services/activity.service';

interface CreateActivityPageProps {
  // Other props...
  activityToEdit?: Activity | null;
  location?: string,
  description?: string,
  cost?: number
  trip: Trip,
  onClose: () => void,
}

const CreateActivityPage: React.FC<CreateActivityPageProps> = ({ activityToEdit, location, description, cost, trip, onClose }) => {
  
  return (
    <Box className="form-page-main-container">
    <Box className="form-page-left-container">
      <Box className="form-page-background-image create-trip-image" />
    </Box>
    <Box className="form-page-right-container">
      <CreateActivityForm location={location} description={description} cost={cost} trip={trip} onClose={onClose} activity={activityToEdit} />
    </Box>
  </Box>
  );
};

export default CreateActivityPage;