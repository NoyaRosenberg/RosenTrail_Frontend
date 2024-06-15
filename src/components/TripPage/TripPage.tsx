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
    Tooltip,
    Chip,
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
            <Grid container style={{ height: '100vh' }}>
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
                                <Box sx={{ marginBottom: 10 }} textAlign={'left'}>
                                    <Typography variant="h3" component="h2" className="trip-typography">
                                        {title}
                                    </Typography>
                                    <Typography variant="h6" color="textSecondary" component="p" className="trip-typography">
                                        {description}
                                    </Typography>
                                    <Box className="trip-participants">
                                        <Chip
                                            key="participants:"
                                            label="participants:"
                                            color={"primary"}
                                            sx={{
                                                fontSize: '1rem', // Adjust the font size as needed
                                                marginRight: '10px' // Add margin for spacing
                                            }}
                                        />
                                        {participants.map((participant, index) => (
                                            <Tooltip title={participant} key={index}>
                                                <Avatar className="trip-avatar">
                                                    {participant.charAt(0).toUpperCase()}
                                                </Avatar>
                                            </Tooltip>
                                        ))}
                                    </Box>
                                    <Typography variant="h4" component="p" color="default" className="trip-typography" marginRight={10}>
                                        {price} €
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                                        <Button variant="contained" color="primary" onClick={handleSchedule} sx={{ width: '200px', height: '50px' }}>
                                            {scheduled ? 'Scheduled' : 'Schedule'}
                                        </Button>
                                    </Box>
                                </Box>
                                <Box className="trip-action-buttons">
                                    <Box className="icon-text">
                                        <Typography variant="body2">
                                            Delete Trip
                                        </Typography>
                                        <IconButton color="secondary" onClick={handleDelete}>
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                    <Box className="icon-text">
                                        <Typography variant="body2">
                                            Edit Trip
                                        </Typography>
                                        <IconButton color="primary" onClick={handleEdit}>
                                            <Edit />
                                        </IconButton>
                                    </Box>
                                    <Box className="icon-text">
                                        <Typography variant="body2">
                                            Back Home
                                        </Typography>
                                        <IconButton onClick={handleBackHome}>
                                            <Home />
                                        </IconButton>
                                    </Box>
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
