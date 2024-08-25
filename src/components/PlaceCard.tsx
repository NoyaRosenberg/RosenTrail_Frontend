import React, { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Rating } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export interface PlaceCardProps {
  name: string;
  description?: string;
  image?: string;
  isNew?: boolean;
  onCardClick: () => void;
  rating?: Promise<number | null>;
}

const PlaceCard = ({ name, description, image, isNew, onCardClick, rating }: PlaceCardProps) => {
  const [averageRating, setAverageRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchRating = async () => {
      if (rating) {
        const fetchedRating = await rating;
        setAverageRating(fetchedRating);
      }
    };
    fetchRating();
  }, [rating]);

  return (
    <Card
      onClick={onCardClick}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        boxShadow: 2,
        borderRadius: 2,
        cursor: "pointer",
        position: "relative",
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.01)',
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="150"
          image={image}
          alt={name}
          sx={{
            filter: isNew ? "blur(1.5px)" : "none",
            opacity: isNew ? "0.7" : "none"
          }}
          onError={(e) => {
            e.currentTarget.src = "/public/placeholder.png";
          }}
        />
        {isNew && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: "50%",
              width: 65,
              height: 65,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AddCircleIcon color="primary" sx={{ fontSize: 60 }} />
          </Box>
        )}
      </Box>
      <CardContent 
        sx={{ 
          flexGrow: 1, 
          textAlign: "center", 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between', 
          minHeight: '120px' // Adjust this value to control the height of the content area
        }}
      >
        <Typography variant="h4" sx={{ fontSize: 18, margin: 1 }}>
          {name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: 14, margin: 1, color: "#666" }}
        >
          {description}
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
          <Rating value={averageRating ?? 0} readOnly size="small" precision={0.1} />
          <Typography variant="body2" color="text.secondary" ml={1}>
            ({averageRating ? averageRating.toFixed(1) : 0})
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PlaceCard;
