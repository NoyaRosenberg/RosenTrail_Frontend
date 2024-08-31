import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Stack,
    Typography
} from "@mui/material";
import {Schedule} from "@mui/icons-material";
import {useLocation, useNavigate} from "react-router-dom";
import RecommendationFilters from "./Recommendations/RecommendationFilters";
import {useEffect, useRef, useState} from "react";
import RecommendationService, {Category} from "../../services/recommendation.service";
import RecommendationsGrid from "./Recommendations/RecommendationsGrid";
import Map from './Map';
import {Place} from "./PlaceDetails";
import ErrorBox from "../ErrorBox";
import ActivityDialog from "../CreateActivityPage/ActivityDialog";

const ActivitiesPage = () => {
    const navigate = useNavigate();
    const trip = useLocation().state.trip;

    const effectRan = useRef(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [recommendations, setRecommendations] = useState<Place[]>([]);
    const [filteredRecommendations, setFilteredRecommendations] = useState<Place[]>([]);
    const [selectedRecommendation, setSelectedRecommendation] = useState<Place | null>(null);
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false);

    useEffect(() => {
        if (effectRan.current === false) {
            setLoading(true);
            setError(null);
            setSelectedRecommendation(null);

            const getRecommendations = async () => {
                try {
                    const recommendations = await RecommendationService.getRecommendationsFromAI(trip.destinations);
                    setRecommendations(recommendations!);
                    setFilteredRecommendations(recommendations!);
                } catch (error) {
                    setError("We encountered a problem while finding you the best recommendations");
                } finally {
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

    const displayRecommendationOnMap = (place: Place) => {
        if (place.coordinates) {
            setSelectedRecommendation({
                name: place.name,
                coordinates: place.coordinates,
                imageUrl: place.imageUrl,
                address: place.address,
                description: place.description,
                rating: place.rating,
                priceLevel: place.priceLevel,
                categories: place.categories,
                cost: place.cost
            });
        }
    }

    const addPlaceToTrip = (place: Place) => {
        setIsActivityDialogOpen(true);
        setSelectedPlace(place);
    }

    const handleActivityDialogClose = () => {
        setIsActivityDialogOpen(false);
        setSelectedPlace(null);
    };

    return (
        <Box height='100vh' overflow='hidden' display='flex' gap={3} padding={3}>
            <Box width="50%" height="100%" display="flex" justifyContent="center">
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
                                    ) : error && recommendations.length === 0 ? (
                                        <ErrorBox error={error}/>
                                    ) : (
                                        <Box
                                            className="scrollable"
                                            width="100%"
                                            height="100%"
                                            sx={{overflowY: "auto"}}
                                        >
                                            <RecommendationsGrid
                                                recommendations={filteredRecommendations}
                                                onRecommendationClick={displayRecommendationOnMap}
                                            />
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        </Stack>
                    </Box>
                </Box>
            </Box>
            <Box width="50%" height="100%" borderRadius={2} overflow='hidden' display="flex" flexDirection="column">
                <Map area={trip.destinations[0]} onAddPlace={addPlaceToTrip} placeToDisplay={selectedRecommendation}
                     showAutoComplete={true}/>
            </Box>
            <ActivityDialog isOpen={isActivityDialogOpen}
                            trip={trip}
                            selectedPlace={selectedPlace!}
                            onClose={handleActivityDialogClose}/>
        </Box>
    );
}

export default ActivitiesPage;