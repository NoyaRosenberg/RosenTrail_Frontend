import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Rating, 
  Paper, 
  Box, 
  CircularProgress,
  Container,
  Button
} from '@mui/material';
import { format } from 'date-fns';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ReviewService, { Review } from '../../services/review.service';
import AddReviewDialog from './AddReviewDialog';
import { Trip } from '../../services/trip.service';
import ReviewCard from './ReviewCard';

const ReviewPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { trip } = location.state as {
    trip: Trip;
  };  const [isAddReviewDialogOpen, setIsAddReviewDialogOpen] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [trip._id]);

  const fetchReviews = async () => {
    if (!trip._id) {
      setError('No trip ID provided');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const fetchedReviews = await ReviewService.getTripReviews(trip._id);
      if (fetchedReviews) {
        setReviews(fetchedReviews);
      } else {
        setError('Failed to fetch reviews');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = () => {
    setIsAddReviewDialogOpen(true);
  };

  const handleCloseAddReviewDialog = () => {
    setIsAddReviewDialogOpen(false);
  };

  const handleReviewAdded = (newReview: Review) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" gutterBottom>
            Trip Reviews
          </Typography>
          <Button variant="contained" color="primary" onClick={handleAddReview}>
            Add Review
          </Button>
        </Box>
        {reviews.length === 0 ? (
          <Typography align="center">No reviews yet for this trip.</Typography>
        ) : (
        //   <List>
        //     {reviews.map((review) => (
        //       <ListItem key={review._id} alignItems="flex-start" divider>
        //         <ListItemText
        //           primary={
        //             <Box display="flex" justifyContent="space-between" alignItems="center">
        //               <Typography variant="h6">{review.userName}</Typography>
        //               <Rating value={review.rating} readOnly size="small" />
        //             </Box>
        //           }
        //           secondary={
        //             <>
        //               <Typography variant="body1" paragraph>
        //                 {review.comment}
        //               </Typography>
        //             </>
        //           }
        //         />
        //       </ListItem>
        //     ))}
        //   </List>
        <List>
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </List>
        )}
      </Paper>
      {trip._id && (
        <AddReviewDialog
          open={isAddReviewDialogOpen}
          onClose={handleCloseAddReviewDialog}
          tripId={trip._id}
          onReviewAdded={handleReviewAdded}
        />
      )}
    </Container>
  );
};

export default ReviewPage;