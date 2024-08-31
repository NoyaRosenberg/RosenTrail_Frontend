import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import CreateActivityPage from "./CreateActivityPage";
import {Place} from "../Map/PlaceDetails";
import {Trip} from "../../services/trip.service";
import {Activity} from "../../services/activity.service";

interface ActivityDialogProps {
    isOpen: boolean;
    trip: Trip;
    placeToAdd?: Place;
    activityToEdit?: Activity;
    onClose: () => void;
}

const ActivityDialog = ({isOpen, trip, placeToAdd, activityToEdit, onClose}: ActivityDialogProps) => {
    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>Edit Your Activity</DialogTitle>
            <DialogContent>
                {activityToEdit ? (
                    <CreateActivityPage
                        trip={trip}
                        activityToEdit={activityToEdit}
                        onClose={onClose}
                    />
                ) : (
                    <CreateActivityPage
                        location={placeToAdd?.name}
                        description={placeToAdd?.description}
                        cost={placeToAdd?.cost}
                        trip={trip}
                        imageUrl={placeToAdd?.imageUrl}
                        categories={placeToAdd?.categories}
                        coordinates={placeToAdd?.coordinates}
                        priceLevel={placeToAdd?.priceLevel}
                        rating={placeToAdd?.rating}
                        onClose={onClose}
                    />
                )}
            </DialogContent>
            <DialogActions></DialogActions>
        </Dialog>
    );
}

export default ActivityDialog;