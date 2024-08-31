import {Box, Grid2} from '@mui/material';
import Schedule from "./Schedule";
import Map from "../ActivitiesPage/Map";
import {Trip} from "../../services/trip.service";
import {useLocation} from "react-router-dom";
import {useActivities} from "../../contexts/ActivityProvider";
import {useEffect} from "react";

const containerStyle = {
    height: '100vh',
    overflow: 'hidden',
    padding: 4,
    backgroundColor: '#f5f5f5',
}

const mapContainerStyle = {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: 'hidden',
    borderRadius: 2
}

const SchedulePage = () => {
    const {trip} = useLocation().state as { trip: Trip; showActions: boolean; };
    const { activities, fetchActivities } = useActivities();

    useEffect(() => {
        fetchActivities(trip._id ?? "")
    }, [trip._id, fetchActivities]);

    return (
        <Grid2 container columnSpacing={8} sx={containerStyle}>
            <Grid2 size={6} height="100%">
                <Schedule activities={activities} trip={trip} />
            </Grid2>
            <Grid2 size={6} height="100%" overflow='hidden'>
                <Box sx={mapContainerStyle}>
                    <Map area={trip.destinations[0]} showAutoComplete={false}></Map>
                </Box>
            </Grid2>
        </Grid2>
    );
};

export default SchedulePage;
