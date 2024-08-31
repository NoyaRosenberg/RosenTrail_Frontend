import {Activity} from "../../services/activity.service";
import {Box, Card, CardContent, Typography} from "@mui/material";

const cardStyle = {
    height: "100%",
    display: 'flex',
    backgroundColor: '#f5f5f5',
    borderRadius: 2
};

const imageStyle = {
    width: 100,
    height: '100%',
    objectFit: 'cover',
    borderRadius: '0 4px 4px 0',
};

interface ActivityCardProps {
    activity: Activity;
}

const ActivityCard = ({activity}: ActivityCardProps) => {
    return (
        <Card sx={cardStyle}>
            <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" component="span">
                    {activity.name}
                </Typography>
                <Typography>{activity.description}</Typography>
            </CardContent>
            <Box
                component="img"
                sx={imageStyle}
                src={activity.imageUrl}
                alt={activity.location}
            />
        </Card>
    )
}

export default ActivityCard;