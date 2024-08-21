import {PlaceDetails} from "../../services/place.service";
import {Button, Card, CardActions, CardContent, CardMedia, Stack, Typography} from "@mui/material";

interface ActivityDetailsProps {
    place: PlaceDetails;
    onAdd: () => void;
    onClose: () => void;
}

const ActivityDetails = ({place, onAdd, onClose}: ActivityDetailsProps) => {
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
                        {place.description ?? "No Description"}
                    </Typography>
                </Stack>
            </CardContent>
            <CardActions>
                <Button onClick={onAdd}>Add To Schedule</Button>
                <Button onClick={onClose}>Close</Button>
            </CardActions>
        </Card>
    )
}

export default ActivityDetails;