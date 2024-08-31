import {Activity} from "../../../services/activity.service";
import {Box, Card, CardContent, Stack, Typography} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

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

const cardContentStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 4,
    flex: 1
}

const imageStyle = {
    width: 100,
    height: '100%',
    objectFit: 'cover',
    borderRadius: '0 4px 4px 0',
};

const iconStyle = {
    width: '36px',
    height: '36px'
}

interface ActivityCardProps {
    activity: Activity;
    onClick: (activity: Activity) => void;
    onEdit: (activity: Activity) => void;
    onDelete: (activity: Activity) => void;
}

const ActivityCard = ({activity, onClick, onEdit, onDelete}: ActivityCardProps) => {
    const handleClick = () => onClick(activity);
    const handleEdit = () => onEdit(activity);
    const handleDelete = () => onDelete(activity);

    return (
        <Card sx={cardStyle} onClick={handleClick}>
            <CardContent sx={cardContentStyle}>
                    <Stack>
                        <Typography variant="h6" component="span">
                            {activity.name}
                        </Typography>
                        <Typography>{activity.description}</Typography>
                    </Stack>
                    <Box display="flex">
                        <IconButton color="primary" sx={iconStyle} onClick={handleEdit}>
                            <Edit />
                        </IconButton>
                        <IconButton color="error" sx={iconStyle} onClick={handleDelete}>
                            <Delete />
                        </IconButton>
                    </Box>
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