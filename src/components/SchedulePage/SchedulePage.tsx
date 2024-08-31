import {Box, Grid2} from '@mui/material';
import Schedule from "./Schedule";
import Map from "../Map/Map";
import {Trip} from "../../services/trip.service";
import {useLocation} from "react-router-dom";
import {useActivities} from "../../contexts/ActivityProvider";
import {useEffect, useState} from "react";
import {Place} from "../Map/PlaceDetails";
import {Activity} from "../../services/activity.service";
import ActivityDialog from "../CreateActivityPage/ActivityDialog";

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
    const {activities, fetchActivities} = useActivities();
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false);

    useEffect(() => {
        fetchActivities(trip._id ?? "")
    }, [trip._id, fetchActivities]);

    const showActivityOnMap = (activity: Activity) => setSelectedPlace(activity);

    const addPlaceToTrip = (place: Place) => {
        setIsActivityDialogOpen(true);
        setSelectedPlace(place);
    }

    const handleActivityDialogClose = () => {
        setIsActivityDialogOpen(false);
        setSelectedPlace(null);
    };

    return (
        <>
            <Grid2 container columnSpacing={8} sx={containerStyle}>
                <Grid2 size={6} height="100%">
                    <Schedule activities={activities} trip={trip} onActivityClick={showActivityOnMap}/>
                </Grid2>
                <Grid2 size={6} height="100%" overflow='hidden'>
                    <Box sx={mapContainerStyle}>
                        <Map area={trip.destinations[0]}
                             showAutoComplete={false}
                             placeToDisplay={selectedPlace}
                             onAddPlace={addPlaceToTrip}>
                        </Map>
                    </Box>
                </Grid2>
            </Grid2>
            <ActivityDialog isOpen={isActivityDialogOpen}
                            trip={trip}
                            selectedPlace={selectedPlace!}
                            onClose={handleActivityDialogClose}/>
        </>
    );
};

export default SchedulePage;
