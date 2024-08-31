import {Grid} from "@mui/material";
import PlaceCard from "../../PlaceCard";
import {Place} from "../PlaceDetails";

export interface RecommendationsGrisProps {
    recommendations: Place[];
    onRecommendationClick: (recommendation: Place) => void;
}

const RecommendationsGrid = ({recommendations, onRecommendationClick}: RecommendationsGrisProps) => {
    return (
        <Grid container spacing={2} sx={{paddingLeft: "2px", paddingBottom: "5px", paddingRight: "10px"}}>
            {recommendations.map((rec, index) => (
                <Grid item xs={12} sm={6} md={6} key={index} sx={{display: "flex"}}>
                    <PlaceCard
                        name={rec.name}
                        description={rec.description}
                        image={rec.imageUrl}
                        isCommunityTrips={false}
                        onCardClick={() => onRecommendationClick(rec)}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default RecommendationsGrid;
