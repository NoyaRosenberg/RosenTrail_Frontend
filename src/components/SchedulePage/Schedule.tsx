import {Box, Grid2} from '@mui/material';
import DailySchedule from "./DailySchedule";
import {useState} from "react";
import {Location} from "../../services/google-maps.service";
import Map from "../ActivitiesPage/Map";

const containerStyle = {
    height: '100vh',
    overflow: 'hidden',
    padding: 4,
    backgroundColor: '#f5f5f5',
}

const Schedule = () => {
    const [destinationLocation] = useState<Location>({
        position: {lat: 48.8584, lng: 2.2945},
        region: 'FR'
    });

    return (
        <Grid2 container columnSpacing={8} sx={containerStyle}>
            <Grid2 size={5} height="100%">
                <DailySchedule/>
            </Grid2>
            <Grid2 size={7} height="100%" overflow='hidden'>
                <Box height="100%" width="100%" display="flex"
                     flexDirection="column"
                     overflow='hidden' borderRadius={2}>
                    <Map location={destinationLocation} showAutoComplete={false}></Map>
                </Box>
            </Grid2>
        </Grid2>
    );
};

export default Schedule;
