import {Box, Card, CardContent, CardHeader, Divider, Stack, Typography} from "@mui/material";
import ActivitiesTimeline from "./ActivitiesTimeline";
import PaginationArrows from "./PaginationArrows";
import {Activity} from "../../services/activity.service";

const scheduleCardStyle = {
    height: "100%",
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'column'
};

const cardContentStyle = {
    flex: 1,
    paddingBottom: '16px !important',
    paddingLeft: 0,
    overflowY: 'auto'
};

interface DailyScheduleProps {
    activities: Activity[];
}

const DailySchedule = ({activities}: DailyScheduleProps) => {
    return (
        <Stack height="100%" spacing={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">
                    Daily Planner
                </Typography>
                <PaginationArrows/>
            </Box>
            <Card sx={scheduleCardStyle}>
                <CardHeader title="Day 1" subheader="01/05"></CardHeader>
                <Divider/>
                <CardContent className="scrollable" sx={cardContentStyle}>
                    <ActivitiesTimeline activities={activities}/>
                </CardContent>
            </Card>
        </Stack>
    );
}

export default DailySchedule;