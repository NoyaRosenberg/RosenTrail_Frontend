import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress, Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    Typography
} from "@mui/material";
import {Schedule} from "@mui/icons-material";
import {useLocation, useNavigate} from "react-router-dom";
import RecommendationFilters from "./Recommendations/RecommendationFilters";
import {useEffect, useRef, useState} from "react";
import {Category, Recommendation} from "../../services/recommendation.service";
import activityService from "../../services/activity.service";
import RecommendationsGrid from "./Recommendations/RecommendationsGrid";
import CreateActivityPage, {CreateActivityPageProps} from "../CreateActivityPage/CreateActivityPage";
import Map from './Map';
import GoogleMapsService, {Location} from "../../services/google-maps.service";
import {Place} from "./PlaceDetails";

const ActivitiesPage = () => {
    const navigate = useNavigate();
    const trip = useLocation().state.trip;

    const effectRan = useRef(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [filteredRecommendations, setFilteredRecommendations] = useState<Recommendation[]>([]);
    const [selectedRecommendation, setSelectedRecommendation] = useState<Place | null>(null);
    const [activityDialogProps, setActivityDialogProps] = useState<CreateActivityPageProps | null>(null);
    const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false);
    const [location, setLocation] = useState<Location>({position: {lat: 48.8584, lng: 2.2945}, region: 'FR'});

    useEffect(() => {
        if (effectRan.current === false) {
            setLoading(true);
            setError(null);
            setSelectedRecommendation(null);

            const getRecommendations = async () => {
                try {
                    const recommendations = await activityService.getActivitiesFromAI(trip.destinations);
                    setRecommendations(recommendations!);
                    setFilteredRecommendations(recommendations!);
                } catch (error) {
                    setError((error as Error).message);
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

    useEffect(() => {
        const getDestinationCoordinates = async () => {
            try {
                const response = await GoogleMapsService.getCoordinatesByAddress(trip.destinations[0]);
                setLocation(response!);
            } catch (error) {
                setError((error as Error).message);
            }
        };

        getDestinationCoordinates();
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

    const displayRecommendationOnMap = (recommendation: Recommendation) => {
        if (recommendation.coordinates) {
            setSelectedRecommendation({
                name: recommendation.name,
                location: {position: recommendation.coordinates},
                photoUrl: recommendation.image,
                address: recommendation.address,
                description: recommendation.description,
                rating: recommendation.rating,
                priceLevel: recommendation.priceLevel
            });
        }
    }

    const addPlaceToTrip = (place: Place) => {
        setIsActivityDialogOpen(true);
        setActivityDialogProps({
            location: place.name ?? "",
            description: "",
            cost: 0,
            trip: trip,
            imageUrl: place.photoUrl ?? "",
            categories: place.type ? [place.type] : [],
            onClose: handleActivityDialogClose
        });
    }

    const handleActivityDialogClose = () => {
        setIsActivityDialogOpen(false);
        setActivityDialogProps(null);
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
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                height: "100%",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <Typography variant="h6" color="error">
                                                Opps!
                                            </Typography>
                                            <Typography color="error">
                                                We encountered a problem while finding you the best recommendations!
                                            </Typography>
                                        </Box>
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
                <Map location={location} onAddPlace={addPlaceToTrip} placeToDisplay={selectedRecommendation}/>
            </Box>
            <Dialog open={isActivityDialogOpen} onClose={handleActivityDialogClose} maxWidth="lg" fullWidth>
                <DialogTitle>Edit Your Activity</DialogTitle>
                <DialogContent>
                    <CreateActivityPage
                        location={activityDialogProps?.location}
                        description={activityDialogProps?.description}
                        cost={activityDialogProps?.cost}
                        trip={trip}
                        imageUrl={activityDialogProps?.imageUrl}
                        categories={activityDialogProps?.categories}
                        onClose={handleActivityDialogClose}
                    />
                </DialogContent>
                <DialogActions></DialogActions>
            </Dialog>
        </Box>
    );
}

export default ActivitiesPage;