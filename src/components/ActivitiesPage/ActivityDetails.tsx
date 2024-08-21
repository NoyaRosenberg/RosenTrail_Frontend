import {PlaceDetails} from "../../services/place.service";
import {Button, Card, CardActions, CardContent, CardMedia, Stack, Typography} from "@mui/material";

interface ActivityDetailsProps {
    place: PlaceDetails;
    onClose: () => void;
}

const ActivityDetails = ({place, onClose}: ActivityDetailsProps) => {
    return (
        <Card sx={{display: 'grid', gridTemplateRows: '1fr auto', height: '100%',}}>
            <CardMedia
                // TODO: replace with place image
                image="/public/categories/Parks.jpg"
                title="green iguana"
            />
            <CardContent>
                <Stack spacing={1}>
                    <Typography variant="h3" sx={{fontSize: 20, color: "#333"}}>
                        {place.name}
                    </Typography>
                    <Typography variant="body1" sx={{color: "#666"}}>
                        A wonderful spot to see and admire the view
                    </Typography>
                </Stack>
            </CardContent>
            <CardActions>
                <Button>Add To Schedule</Button>
                <Button onClick={onClose}>Close</Button>
            </CardActions>
        </Card>
    )
}

export default ActivityDetails;