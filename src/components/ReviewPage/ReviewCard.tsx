import React from 'react';
import { 
  ListItem, 
  ListItemText, 
  Rating, 
  Box, 
  Typography 
} from '@mui/material';
import ReviewService, { Review } from '../../services/review.service';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <ListItem alignItems="flex-start" divider>
      <ListItemText
        primary={
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{review.userName}</Typography>
            <Rating value={review.rating} readOnly size="small" />
          </Box>
        }
        secondary={
          <Typography variant="body1" paragraph>
            {review.comment}
          </Typography>
        }
      />
    </ListItem>
  );
};

export default ReviewCard;