import React, { useState } from 'react';
import {
    Container,
    Card,
    CardContent,
    Typography,
    Button,
    IconButton,
    Box,
    Avatar,
    Grid,
} from '@mui/material';
import { Delete, Edit, Home } from '@mui/icons-material';
import "../../styles/Forms.css";
import '../../styles/TripPage.css';

type TripProps = {
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    participants: string[];
};

const TripDetails: React.FC<TripProps> = ({ title, description, price, imageUrl, participants }) => {
    const [scheduled, setScheduled] = useState(false);

    const handleSchedule = () => {
        setScheduled(true);
    };

    const handleEdit = () => {
        // Edit logic
    };

    const handleDelete = () => {
        // Delete logic
    };

    const handleBackHome = () => {
        // Navigation logic
    };

    return (
        <Container maxWidth={false} className="form-page-main-container">
            <Grid container style={{ height: '100%' }}>
                <Grid item xs={6} style={{ display: 'flex' }}>
                    <Box
                        className="form-page-left-container"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                    ></Box>
                </Grid>
                <Grid item xs={6} style={{ display: 'flex' }}>
                    <Box className="form-page-right-container">
                        <Card className="trip-card">
                            <CardContent className="trip-content">
                                <Box>
                                    <Typography variant="h4" component="h2">
                                        {title}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" component="p">
                                        {description}
                                    </Typography>
                                    <Typography variant="h5" component="p" color="primary">
                                        {price} €
                                    </Typography>
                                    <Box className="trip-participants">
                                        {participants.map((participant, index) => (
                                            <Avatar key={index} className="trip-avatar">
                                                {participant.charAt(0).toUpperCase()}
                                            </Avatar>
                                        ))}
                                    </Box>
                                </Box>
                                <Box className="trip-action-buttons">
                                    <Button variant="contained" color="primary" onClick={handleSchedule}>
                                        {scheduled ? 'Scheduled' : 'Schedule'}
                                    </Button>
                                    <IconButton color="primary" onClick={handleEdit}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={handleDelete}>
                                        <Delete />
                                    </IconButton>
                                    <IconButton onClick={handleBackHome}>
                                        <Home />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

const App = () => {
    const tripData = {
        title: 'Paris',
        description: 'Trip plan to Paris\nVisiting the Eiffel Tower, Museums, Disneyland and more',
        price: 399,
        imageUrl: '/public/Paris.jpeg', // Use the image path accordingly
        participants: ['noyaro@gmail.com', 'skediya@gmail.com'],
    };

    return <TripDetails {...tripData} />;
};

export default App;
