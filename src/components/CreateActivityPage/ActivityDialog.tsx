import {Box, Button, Dialog, DialogActions, DialogContent} from "@mui/material";
import {Place} from "../Map/PlaceDetails";
import {Trip} from "../../services/trip.service";
import {Activity} from "../../services/activity.service";
import CreateActivityForm from "./CreateActivityForm";
import Divider from "@mui/material/Divider";

interface ActivityDialogProps {
    isOpen: boolean;
    trip: Trip;
    placeToAdd?: Place;
    activityToEdit?: Activity;
    onClose: () => void;
}

const ActivityDialog = ({isOpen, trip, placeToAdd, activityToEdit, onClose}: ActivityDialogProps) => {

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogContent sx={{display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden'}}>
                <Box
                    component="img"
                    src={activityToEdit?.imageUrl ||
                        placeToAdd?.imageUrl ||
                        "/createTripBackground.jpeg"}
                    alt="Activity"
                    sx={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "4px 4px 0 0",
                    }}
                />
                <Box sx={{overflowY: 'auto'}}>
                    {activityToEdit ? (
                        <CreateActivityForm
                            trip={trip}
                            activityToEdit={activityToEdit}
                            onClose={onClose}
                        />
                    ) : (
                        <CreateActivityForm
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
                </Box>
            </DialogContent>
            <Divider/>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ActivityDialog;