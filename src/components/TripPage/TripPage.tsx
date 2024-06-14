import React, { useState } from 'react';
import {
    Container,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    IconButton,
    Box,
    Avatar,
} from '@mui/material';
import { Delete, Edit, Home } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const PREFIX = 'TripDetails';
const classes = {
    container: `${PREFIX}-container`,
    card: `${PREFIX}-card`,
    media: `${PREFIX}-media`,
    actionButtons: `${PREFIX}-actionButtons`,
    participants: `${PREFIX}-participants`,
    avatar: `${PREFIX}-avatar`,
};

const Root = styled('div')(({ theme }) => ({
    [`& .${classes.container}`]: {
        padding: '20px',
    },
    [`& .${classes.card}`]: {
        maxWidth: 600,
        margin: '0 auto',
    },
    [`& .${classes.media}`]: {
        height: 400,
    },
    [`& .${classes.actionButtons}`]: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    [`& .${classes.participants}`]: {
        display: 'flex',
        marginTop: '10px',
    },
    [`& .${classes.avatar}`]: {
        marginRight: '10px',
    },
}));

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
        <Root>
            <Container className={classes.container}>
                <Card className={classes.card}>
                    <CardMedia className={classes.media} image={imageUrl} title={title} />
                    <CardContent>
                        <Typography variant="h4" component="h2">
                            {title}
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            {description}
                        </Typography>
                        <Typography variant="h5" component="p" color="primary">
                            {price} €
                        </Typography>
                        <Box className={classes.participants}>
                            {participants.map((participant, index) => (
                                <Avatar key={index} className={classes.avatar}>
                                    {participant.charAt(0).toUpperCase()}
                                </Avatar>
                            ))}
                        </Box>
                        <Box className={classes.actionButtons}>
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
            </Container>
        </Root>
    );
};

const App = () => {
    const tripData = {
        title: 'Paris',
        description: 'Trip plan to Paris\nVisiting the Eiffel Tower, Museums, Disneyland and more',
        price: 399,
        imageUrl: '/public/Paris.jpeg',
        participants: ['noyaro@gmail.com', 'skediya@gmail.com'],
    };

    return <TripDetails {...tripData} />;
};

export default App;