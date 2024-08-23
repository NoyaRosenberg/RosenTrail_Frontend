import {Location} from "../../services/geocoding.service";
import {Box, Card, CardContent, CardMedia, Chip, Rating, Typography} from "@mui/material";

export interface Place {
    name: string;
    location: Location;
    photoUrl?: string;
    description?: string;
    address?: string;
    openHours?: string[];
    rating?: number;
    priceLevel?: number;
}

interface PlaceDetailsProps {
    place: Place
}

type ChipColor = "primary" | "default" | "info" | "warning" | "error" | "secondary" | "success" | undefined;

const PriceLevel = ['Free', 'Inexpensive', 'Moderate Price', 'Expensive', 'Very Expensive'];
const PriceLevelColor = ['primary', 'default', 'info', 'warning', 'error'];

const PlaceDetails = ({place}: PlaceDetailsProps) => {
    return (
        <Card sx={{boxShadow: 'none'}}>
            {place.photoUrl && (
                <CardMedia
                    component="img"
                    image={place.photoUrl}
                    alt={place.name}
                    style={{height: 100}}
                />
            )}
            <CardContent
                sx={{display: 'flex', flexDirection: 'column', paddingTop: 2, paddingRight: 1, paddingLeft: 1}}>
                <Box display='flex' flexDirection='column' gap={2}>
                    <Box display='flex' flexDirection='column' gap={1}>
                        <Typography sx={{fontSize: '18px'}}>
                            {place.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {place.address}
                        </Typography>
                    </Box>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                        {place.rating && (
                            <Rating value={place.rating / 5} readOnly size="small"/>
                        )}
                        {place.priceLevel !== undefined && (
                            <Chip
                                key="type"
                                label={PriceLevel[place.priceLevel]}
                                color={PriceLevelColor[place.priceLevel] as ChipColor}
                                sx={{color: 'white'}}
                            />
                        )}
                    </Box>
                </Box>
                {/*{place.openHours && place.openHours.length > 0 && (*/}
                {/*    <Typography variant="body2" color="text.secondary">*/}
                {/*        <strong>Open Hours:</strong>*/}
                {/*        <ul>*/}
                {/*            {place.openHours.map((hour, index) => (*/}
                {/*                <li key={index}>{hour}</li>*/}
                {/*            ))}*/}
                {/*        </ul>*/}
                {/*    </Typography>*/}
                {/*)}*/}
            </CardContent>
        </Card>
    )
};

export default PlaceDetails;

