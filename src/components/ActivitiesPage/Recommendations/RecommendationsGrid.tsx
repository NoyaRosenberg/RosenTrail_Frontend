import {Grid} from "@mui/material";
import PlaceCard from "../../PlaceCard";
import {Recommendation} from "../../../services/recommendation.service";

export interface RecommendationsGrisProps {
    recommendations: Recommendation[];
    onRecommendationClick: (recommendation: Recommendation) => void;
}

const RecommendationsGrid = ({recommendations, onRecommendationClick}: RecommendationsGrisProps) => {
    return (
        <Grid container spacing={2} sx={{paddingLeft: "2px", paddingBottom: "5px", paddingRight: "10px"}}>
            {recommendations.map((rec, index) => (
                <Grid item xs={12} sm={6} md={6} key={index} sx={{display: "flex"}}>
                    <PlaceCard
                        name={rec.name}
                        description={rec.description}
                        image={rec.image}
                        onCardClick={() => onRecommendationClick(rec)}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default RecommendationsGrid;
