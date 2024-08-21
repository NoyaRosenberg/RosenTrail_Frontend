import {Box, Chip} from "@mui/material";
import {useEffect} from "react";
import {useState} from "react";
import recommendationService, {
    Category,
} from "../../../services/recommendation.service";

interface RecommendationFiltersProps {
    onFilterSelected: (filters: Category[]) => void;
}

const RecommendationFilters = ({onFilterSelected}: RecommendationFiltersProps) => {
    const [activityFilters] = useState<Category[]>(recommendationService.getCategories());
    const [selectedFilters, setSelectedFilters] = useState<Category[]>([]);

    useEffect(() => {
        onFilterSelected(selectedFilters);
    }, [selectedFilters, onFilterSelected]);

    const toggleFilter = (filter: Category) => {
        setSelectedFilters((prevFilters) =>
            prevFilters.some((category) => category.id === filter.id)
                ? prevFilters.filter((category) => category.id !== filter.id)
                : [...prevFilters, filter]
        );
    };

    return (
        <Box sx={{display: "flex", flexWrap: "wrap", gap: 1}}>
            {
                activityFilters.map((filter) => (
                    <Chip
                        key={filter.id}
                        label={filter.name}
                        clickable
                        color={selectedFilters.includes(filter) ? "primary" : "default"}
                        onClick={() => toggleFilter(filter)}
                    />
                ))
            }
        </Box>
    );
};

export default RecommendationFilters;
