import React from 'react';
import {Box} from '@mui/material';
import CreateActivityForm from './CreateActivityForm';
import {Trip} from '../../services/trip.service';
import {Activity} from '../../services/activity.service';
import '../../styles/CreateActivityPage.css';
import {Coordinates} from "../../services/google-maps.service";

export interface CreateActivityPageProps {
    activityToEdit?: Activity | null;
    location?: string;
    description?: string;
    cost?: number;
    trip: Trip;
    imageUrl?: string;
    categories?: string[];
    coordinates?: Coordinates;
    rating?: number;
    priceLevel?: number;
    onClose: () => void;
}

const CreateActivityPage: React.FC<CreateActivityPageProps> = ({
                                                                   activityToEdit,
                                                                   location,
                                                                   description,
                                                                   cost,
                                                                   trip,
                                                                   imageUrl,
                                                                   categories,
                                                                   coordinates,
                                                                   rating,
                                                                   priceLevel,
                                                                   onClose
                                                               }) => {
    return (
        <Box className="create-activity-container">
            <Box className="image-container">
                <img
                    src={imageUrl || "/createTripBackground.jpeg"}
                    alt="Activity"
                    className="activity-image"
                />
            </Box>
            <Box className="form-container">
                <CreateActivityForm
                    location={location}
                    description={description}
                    cost={cost}
                    trip={trip}
                    categories={categories}
                    imageUrl={imageUrl}
                    coordinates={coordinates}
                    rating={rating}
                    priceLevel={priceLevel}
                    activity={activityToEdit}
                    onClose={onClose}
                />
            </Box>
        </Box>
    );
};

export default CreateActivityPage;