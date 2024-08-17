import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Rating,
  Box,
  Typography
} from '@mui/material';
import { toast } from 'react-toastify';
import ReviewService, { Review } from '../../services/review.service';

interface AddReviewDialogProps {
  open: boolean;
  onClose: () => void;
  tripId: string;
  onReviewAdded: (newReview: Review) => void;
}

const AddReviewDialog: React.FC<AddReviewDialogProps> = ({ open, onClose, tripId, onReviewAdded }) => {
  const [userName, setUserName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState<number | null>(null);

  const handleSubmit = async () => {
    if (!userName || !comment || rating === null) {
      toast.error('Please fill in all fields and provide a rating.');
      return;
    }

    try {
      const newReview: Omit<Review, '_id'> = {
        tripId,
        date: new Date(),
        userName,
        comment,
        rating
      };

      const addedReview = await ReviewService.addReview(newReview as Review);
      if (addedReview) {
        onReviewAdded(addedReview);
        onClose();
        toast.success('Review added successfully!');
      }
    } catch (error) {
      console.error('Failed to add review:', error);
      toast.error('Failed to add review. Please try again.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a Review</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Your Name"
          type="text"
          fullWidth
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Your Review"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Box mt={2}>
          <Typography component="legend">Rating</Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose} 
          color="primary" 
          variant="outlined"
          sx={{ mr: 1 }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          color="primary" 
          variant="contained"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddReviewDialog;