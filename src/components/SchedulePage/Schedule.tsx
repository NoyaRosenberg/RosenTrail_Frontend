import {Box, Button, Card, CardContent, CardHeader, Divider, Stack, Typography} from "@mui/material";
import DailySchedule from "./DailySchedule";
import PaginationArrows from "./PaginationArrows";
import {Activity} from "../../services/activity.service";
import {useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Trip} from "../../services/trip.service";
import EmptyDay from "./EmptyDay";

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
    trip: Trip
    activities: Activity[];
}

const Schedule = ({trip, activities}: DailyScheduleProps) => {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState<Date>(new Date(trip.startDate!));
    const [day, setDay] = useState<number>(1);

    const isFirstDay = useMemo(() =>
            new Date(currentDate).toDateString() === new Date(trip.startDate!).toDateString(),
        [currentDate, trip.startDate]);

    const isLastDay = useMemo(() =>
            new Date(currentDate).toDateString() === new Date(trip.endDate!).toDateString(),
        [currentDate, trip.endDate]);

    const currentDayActivities = useMemo(() => {
        return activities.filter(activity =>
            new Date(activity.date).toDateString() === new Date(currentDate).toDateString())
    }, [activities, currentDate]);

    const formatedDate = useMemo(() => {
        return new Date(currentDate).toLocaleDateString("en-GB", {
            weekday: "short",
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
        });
    }, [currentDate]);

    const moveToPrevDay = () => moveDate(currentDate, -1);
    const moveToNextDay = () => moveDate(currentDate, 1);

    const moveDate = (date: Date, offset: number) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + offset);
        setCurrentDate(newDate);
        setDay(prevDay => prevDay + offset);
    };

    const addAttractions = () => {
        navigate("/AddActivities", {state: {trip}});
    };

    return (
        <Stack height="100%" spacing={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">
                    Daily Planner
                </Typography>
                <PaginationArrows
                    disablePrev={isFirstDay} disableNext={isLastDay}
                    onPrevClick={moveToPrevDay} onNextClick={moveToNextDay}/>
            </Box>
            <Card sx={scheduleCardStyle}>
                <CardHeader title={"Day " + day} subheader={formatedDate}></CardHeader>
                <Divider/>
                <CardContent className="scrollable" sx={cardContentStyle}>
                    {currentDayActivities.length ? (
                        <>
                            <DailySchedule activities={currentDayActivities}/>
                            <Box display="flex" justifyContent="center">
                                <Button variant="contained" onClick={addAttractions}>Add more attractions</Button>
                            </Box>
                        </>
                        ) : (<EmptyDay onClick={addAttractions}/>)}
                </CardContent>
            </Card>
        </Stack>
    );
}

export default Schedule;