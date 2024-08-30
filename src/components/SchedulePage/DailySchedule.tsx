import {Box, Card, CardContent, CardHeader, Divider, Fab, Stack, Tooltip, Typography} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DailyScheduleTimeline from "./DailyScheduleTimeline";

const arrowStyle = {width: "35px", height: "35px"};

const DailySchedule = () => {
    return (
        <Stack height="100%" spacing={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">
                    Daily Planner
                </Typography>
                <Box display="flex" gap={1}>
                    <Tooltip title="Previous Day">
                        <Fab size="small" sx={arrowStyle}>
                            <KeyboardArrowLeftIcon/>
                        </Fab>
                    </Tooltip>
                    <Tooltip title="Next Day">
                        <Fab size="small" sx={arrowStyle}>
                            <KeyboardArrowRightIcon/>
                        </Fab>
                    </Tooltip>
                </Box>
            </Box>
            <Card sx={{ height: "100%", borderRadius: 3, display: 'flex', flexDirection: 'column' }}>
                <CardHeader title="Day 1" subheader="01/05"></CardHeader>
                <Divider />
                <CardContent className="scrollable" sx={{ flex: 1, paddingBottom: '16px !important', paddingLeft: 0, overflowY: 'auto' }}>
                    <DailyScheduleTimeline />
                </CardContent>
            </Card>
        </Stack>
    );
}

export default DailySchedule;