import {Location} from "../../services/geocoding.service";
import {Box, Button, Card, CardContent, CardMedia, Chip, Rating, Typography} from "@mui/material";

export interface Place {
    name: string;
    location: Location;
    photoUrl?: string;
    type?: string;
    address?: string;
    openHours?: string[];
    rating?: number;
    priceLevel?: number;
}

interface PlaceDetailsProps {
    place: Place,
    onAddClick: () => void,
}

type ChipColor = "primary" | "default" | "info" | "warning" | "error"
    | "secondary" | "success" | undefined;

const PriceLevel = ['Free', 'Inexpensive', 'Moderate Price', 'Expensive', 'Very Expensive'];
const PriceLevelColor = ['primary', 'default', 'info', 'warning', 'error'];

const PlaceDetails = ({place, onAddClick}: PlaceDetailsProps) => {
    return (
        <Card sx={{boxShadow: 'none', minWidth: '250px'}}>
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
                        <Box display='flex' justifyContent='space-between' alignItems='center' gap={2}>
                            <Typography sx={{fontSize: '18px'}}>
                                {place.name}
                            </Typography>
                            {place.priceLevel !== undefined && (
                                <Chip
                                    key="type"
                                    label={PriceLevel[place.priceLevel]}
                                    color={PriceLevelColor[place.priceLevel] as ChipColor}
                                    sx={{color: 'white'}}
                                />
                            )}
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            {place.address}
                        </Typography>
                        {place.rating && (
                            <Rating value={place.rating / 5} readOnly size="small"/>
                        )}
                    </Box>
                    <Button variant="outlined" sx={{width: '70%'}} onClick={onAddClick}>Add To Schedule</Button>
                </Box>
            </CardContent>
        </Card>
    )
};

export default PlaceDetails;

