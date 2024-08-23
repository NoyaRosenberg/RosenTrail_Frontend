import {Location} from "../../services/geocoding.service";
import {Card, CardContent, CardMedia, Typography} from "@mui/material";

export interface Place {
    name: string;
    location: Location;
    photoUrl?: string;
}

interface PlaceDetailsProps {
    place: Place
}

const PlaceDetails = ({place}: PlaceDetailsProps) => {
    return (
        <Card>
            {place.photoUrl && (
                <CardMedia
                    component="img"
                    image={place.photoUrl}
                    alt={place.name}
                    style={{ height: 100 }}
                />
            )}
            <CardContent>
                <Typography gutterBottom sx={{fontSize: '18px'}}>
                    {place.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    place details goes here
                </Typography>
            </CardContent>
        </Card>
    )
};

export default PlaceDetails;

