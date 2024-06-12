import { Card, CardMedia, CardContent, Typography } from "@mui/material";

export interface Recommendation {
    name: string;
    description: string;
    image: string;
}

export interface RecommendationCardProps {
    recommendation: Recommendation
}

const RecommendationCard = ({ recommendation }: RecommendationCardProps) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        boxShadow: 2,
        borderRadius: 2,
        cursor: "pointer",
      }}
    >
      <CardMedia
        component="img"
        height="150"
        image={`/public/${recommendation.image}`}
        alt={recommendation.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h4" sx={{ fontSize: 18, margin: 1 }}>
          {recommendation.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: 14, margin: 1, color: "#666" }}
        >
          {recommendation.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
