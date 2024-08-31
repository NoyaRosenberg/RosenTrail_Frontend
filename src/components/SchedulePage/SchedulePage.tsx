import {Box, Grid2} from '@mui/material';
import Schedule from "./Schedule";
import Map from "../Map/Map";
import {Trip} from "../../services/trip.service";
import {useLocation} from "react-router-dom";
import {useActivities} from "../../contexts/ActivityProvider";
import {useEffect, useState} from "react";
import {Place} from "../Map/PlaceDetails";
import activityService, {Activity} from "../../services/activity.service";
import ActivityDialog from "../CreateActivityPage/ActivityDialog";

const mainContainerStyle = {
    height: '100vh',
    overflow: 'hidden',
    padding: 4,
    backgroundColor: '#f5f5f5',
};

const mapContainerStyle = {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: 'hidden',
    borderRadius: 2
};

const SchedulePage = () => {
    const {trip, showActions} = useLocation().state as { trip: Trip; showActions: boolean; };
    const {activities, fetchActivities} = useActivities();
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    const [placeToAdd, setPlaceToAdd] = useState<Place | null>(null);
    const [activityToEdit, setActivityToEdit] = useState<Activity | null>(null);
    const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false);

    useEffect(() => {
        fetchActivities(trip._id ?? "")
    }, [trip._id, fetchActivities, isActivityDialogOpen]);

    const showActivityOnMap = (activity: Activity) => setSelectedPlace(activity);

    const addPlaceToTrip = (place: Place) => {
        setIsActivityDialogOpen(true);
        setPlaceToAdd(place);
    };

    const editActivity = (activity: Activity) => {
        setIsActivityDialogOpen(true);
        setActivityToEdit(activity);
    };

    const deleteActivity = (activity: Activity) => {
        activityService.deleteActivity(activity).then(() => fetchActivities(trip._id ?? ""));
    };

    const handleActivityDialogClose = () => {
        setIsActivityDialogOpen(false);
        setPlaceToAdd(null);
        setActivityToEdit(null);
    };

    return (
        <>
            <Grid2 container columnSpacing={6} sx={mainContainerStyle}>
                <Grid2 size={6} height="100%">
                    <Schedule
                        trip={trip}
                        activities={activities}
                        showActions={showActions}
                        onActivityClick={showActivityOnMap}
                        onActivityEdit={editActivity}
                        onActivityDelete={deleteActivity}
                    />
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
            {isActivityDialogOpen && (
                placeToAdd ? (
                    <ActivityDialog isOpen={isActivityDialogOpen}
                                    trip={trip}
                                    placeToAdd={placeToAdd}
                                    onClose={handleActivityDialogClose}/>
                ) : activityToEdit && (
                    <ActivityDialog isOpen={isActivityDialogOpen}
                                    trip={trip}
                                    activityToEdit={activityToEdit}
                                    onClose={handleActivityDialogClose}/>
                ))}

        </>
    );
};

export default SchedulePage;
