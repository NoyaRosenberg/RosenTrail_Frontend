import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import CreateActivityPage from "./CreateActivityPage";
import {Place} from "../Map/PlaceDetails";
import {Trip} from "../../services/trip.service";

interface ActivityDialogProps {
    isOpen: boolean;
    trip: Trip;
    selectedPlace: Place;
    onClose: () => void;
}

const ActivityDialog = ({isOpen, trip, selectedPlace, onClose}: ActivityDialogProps) => {
    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>Edit Your Activity</DialogTitle>
            <DialogContent>
                <CreateActivityPage
                    location={selectedPlace?.name}
                    description={selectedPlace?.description}
                    cost={selectedPlace?.cost}
                    trip={trip}
                    imageUrl={selectedPlace?.imageUrl}
                    categories={selectedPlace?.categories}
                    coordinates={selectedPlace?.coordinates}
                    priceLevel={selectedPlace?.priceLevel}
                    rating={selectedPlace?.rating}
                    onClose={onClose}
                />
            </DialogContent>
            <DialogActions></DialogActions>
        </Dialog>
    );
}

export default ActivityDialog;