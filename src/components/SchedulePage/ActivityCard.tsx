import {Activity} from "../../services/activity.service";
import {Card, CardContent, Stack, Typography} from "@mui/material";

interface ActivityCardProps {
    activity: Activity;
}

const ActivityCard = ({activity}: ActivityCardProps) => {
    return (
        <Card
            key={activity._id}
            sx={{
                display: 'flex',
                height: '20%',
                borderRadius: 2,
                backgroundColor: '#f5f5f5'
            }}
        >
            <img
                src={activity.imageUrl}
                alt={activity.location}
                style={{objectFit: "cover"}}
                height="100%"
            />

            <CardContent sx={{height: '100%'}}>
                <Stack height='100%'>
                    <Typography>{activity.name}</Typography>
                    <Typography>{activity.description}</Typography>
                    <Typography>{activity.startTime} - {activity.endTime}</Typography>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default ActivityCard;