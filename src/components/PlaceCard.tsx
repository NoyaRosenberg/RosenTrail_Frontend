import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React from "react";

export interface PlaceCardProps {
  name: string;
  description?: string;
  image?: string;
  isNew?: boolean;
  onCardClick: () => void;
}

const PlaceCard = ({ name, description, image, isNew, onCardClick }: PlaceCardProps) => {
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
          src={image}
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
      <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontSize: 18, margin: 1 }}>
          {name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: 14, margin: 1, color: "#666" }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PlaceCard;
