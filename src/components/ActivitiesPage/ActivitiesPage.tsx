import React, {useEffect, useRef, useState} from "react";
import {Schedule} from "@mui/icons-material";
import {
    Box, Container, Stack, Typography, Button, Card, CardContent, CircularProgress
} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import RecommendationsGrid from "./RecommendationsGrid";
import ActivityFilters from "./ActivityFilters";
import {
    Category, Recommendation,
} from "../../services/recommendation.service";
import activityService from "../../services/activity.service";
import Map from "./Map/Map";
import "../../styles/ActivitiesPage.css";

const ActivitiesPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const trip = location.state.trip;

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [filteredRecommendations, setFilteredRecommendations] = useState<Recommendation[]>([]);

    const effectRan = useRef(false);

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

    const goBackToSchedule = () => {
        navigate("/schedule", {state: {trip, showActions: true}});
    };

    return (
        <Box sx={{display: 'flex', height: '100vh', overflow: 'hidden', paddingTop: "20px", paddingBottom: "10px"}}>
            <Box sx={{width: '65%', height: '100%'}}>
                <Container>
                    <Stack spacing={4}>
                        <Stack spacing={3}>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Typography variant="h3" sx={{fontSize: 20, color: "#333"}}>
                                    Search For Attractions In {trip.destinations}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Schedule/>}
                                    onClick={goBackToSchedule}
                                >
                                    Trip Schedule
                                </Button>
                            </Box>
                            <ActivityFilters onFilterSelected={applyFilters}/>
                        </Stack>
                        <Stack spacing={2} sx={{alignItems: "flex-start", width: "100%"}}>
                            <Stack>
                                <Typography variant="h3" sx={{fontSize: 20, color: "#333"}}>
                                    Recommendations For Attractions
                                </Typography>
                                <Typography variant="body1" sx={{color: "#666"}}>
                                    Click an activity to add it to your trip!
                                </Typography>
                            </Stack>
                            <Card sx={{
                                width: '100%',
                                height: "44vh",
                                borderRadius: 2,
                                backgroundColor: 'rgba(0, 0, 0, 0.05)'
                            }}>
                                <CardContent>
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
                                        <Box className="scrollable"
                                             sx={{width: "100%", height: "40vh", overflowY: "auto"}}>
                                            <RecommendationsGrid
                                                recommendations={filteredRecommendations}
                                                trip={trip}
                                            />
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>

                        </Stack>
                    </Stack>
                </Container>
            </Box>
            <Box sx={{width: '35%', height: '100%', paddingRight: '20px'}}>
                <Map coordinates={{lon: 40.7128, lat: -74.0060}}/>
            </Box>
        </Box>
    );
};

export default ActivitiesPage;
