import {Activity} from "../../../services/activity.service";
import {Box, Card, CardContent, Typography} from "@mui/material";

const cardStyle = {
    height: "100%",
    display: 'flex',
    backgroundColor: '#f5f5f5',
    borderRadius: 2,
    cursor: "pointer",
    transition: 'transform 0.2s, box-shadow 0.3s',
    '&:hover': {
        transform: 'scale(1.01)',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    }
};

const imageStyle = {
    width: 100,
    height: '100%',
    objectFit: 'cover',
    borderRadius: '0 4px 4px 0',
};

interface ActivityCardProps {
    activity: Activity;
    onClick: (activity: Activity) => void;
}

const ActivityCard = ({activity, onClick}: ActivityCardProps) => {
    const handleClick = () => onClick(activity);

    return (
        <Card sx={cardStyle} onClick={handleClick}>
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