import {Box, Button, Card, CardContent, CircularProgress, Stack, Typography} from "@mui/material";
import {Schedule} from "@mui/icons-material";
import {useLocation, useNavigate} from "react-router-dom";
import RecommendationFilters from "./Recommendations/RecommendationFilters";
import {useEffect, useMemo, useRef, useState} from "react";
import {Category, Recommendation} from "../../services/recommendation.service";
import activityService from "../../services/activity.service";
import RecommendationsGrid from "./Recommendations/RecommendationsGrid";
import Map from "./Map/Map";

const ActivitiesPage = () => {
    const navigate = useNavigate();
    const trip = useLocation().state.trip;
    const effectRan = useRef(false);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [filteredRecommendations, setFilteredRecommendations] = useState<Recommendation[]>([]);
    const stableCoordinates = useMemo(() => ({lon: 40.7128, lat: -74.0060}), []);

    useEffect(() => {
        if (effectRan.current === false) {
            const getRecommendations = async () => {
                try {
                    const recommendations = await activityService.getActivitiesFromAI(trip.destinations);
                    setRecommendations(recommendations!);
                    setFilteredRecommendations(recommendations!);
                    setLoading(false);
                } catch (error) {
                    setError((error as Error).message);
                    setLoading(false);
                }
            };

            getRecommendations();

            return () => {
                effectRan.current = true;
            };
        }
    }, [trip.destinations]);

    const goBackToSchedule = () => {
        navigate("/schedule", {state: {trip, showActions: true}});
    };

    const applyFilters = (filters: Category[]) => {
        let newFilteredRecommendations = recommendations;

        if (filters.length > 0) {
            const filtersNames = filters.map((filter) => filter.name);
            newFilteredRecommendations = newFilteredRecommendations.filter((rec) =>
                filtersNames.some((name) => rec.categories?.includes(name))
            );
        }

        setFilteredRecommendations(newFilteredRecommendations);
    };

    return (
        <Box height='100vh' overflow='hidden' display='flex' gap={3} padding={3}>
            <Box width="60%" height="100%" display="flex">
                <Box width="100%" height="100%">
                    <Box height="100%" display="flex" flexDirection="column" justifyContent="space-between">
                        <RecommendationFilters onFilterSelected={applyFilters}/>
                        <Stack spacing={2} sx={{alignItems: "flex-start", width: "100%", height: "75%"}}>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                width="100%"
                            >
                                <Stack>
                                    <Typography variant="h3" sx={{fontSize: 20, color: "#333"}}>
                                        Recommendations For Attractions
                                    </Typography>
                                    <Typography variant="body1" sx={{color: "#666"}}>
                                        Click an activity to add it to your trip!
                                    </Typography>
                                </Stack>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Schedule/>}
                                    onClick={goBackToSchedule}
                                >
                                    Trip Schedule
                                </Button>
                            </Box>
                            <Card sx={{
                                width: "100%",
                                height: '100%',
                                borderRadius: 2,
                                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                            }}>
                                <CardContent sx={{height: "100%"}}>
                                    {loading ? (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                height: "100%",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <CircularProgress/>
                                            <Typography sx={{marginTop: 2}}>
                                                Getting recommendations, it might take a minute...
                                            </Typography>
                                        </Box>
                                    ) : error ? (
                                        <Typography color="error">
                                            Failed To Fetch recommendations
                                        </Typography>
                                    ) : (
                                        <Box
                                            className="scrollable"
                                            width="100%"
                                            height="100%"
                                            sx={{overflowY: "auto"}}
                                        >
                                            <RecommendationsGrid
                                                recommendations={filteredRecommendations}
                                                trip={trip}
                                            />
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        </Stack>
                    </Box>
                </Box>
            </Box>
            <Box width="40%" height="100%" borderRadius={2} overflow='hidden' display="flex" flexDirection="column">
                <Map coordinates={stableCoordinates}/>
            </Box>
        </Box>
    );
}

export default ActivitiesPage;