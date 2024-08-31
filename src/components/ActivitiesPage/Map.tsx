import {useCallback, useEffect, useRef, useState} from 'react';
import {
    GoogleMap,
    LoadScript,
    Autocomplete,
    Marker,
    InfoWindow,
    Libraries,
} from '@react-google-maps/api';
import {StyledTextField} from '../../theme';
import {InputAdornment} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GoogleMapsService, {Location} from '../../services/google-maps.service';
import PlaceDetails, {Place} from './PlaceDetails';
import ErrorBox from "../ErrorBox";

const mapContainerStyle = {
    height: '100vh',
    width: '100%',
    padding: 8,
};

const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    fullscreenControl: true,
    mapTypeControl: false,
};

const libraries = ['places'] as Libraries;
const apiKey = "AIzaSyDC7J-IsGSicrRECRUn5H2pYhRm-DpATNo";

interface MapProps {
    area: string;
    placeToDisplay?: Place | null;
    showAutoComplete: boolean;
    onAddPlace?: (place: Place) => void;
}

const Map = ({area, placeToDisplay, showAutoComplete, onAddPlace}: MapProps) => {
    const mapRef = useRef<google.maps.Map | null>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const geocoderRef = useRef<google.maps.Geocoder | null>(null);
    const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [location, setLocation] = useState<Location>();

    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
        geocoderRef.current = new google.maps.Geocoder();
        placesServiceRef.current = new google.maps.places.PlacesService(map);
    }, []);

    useEffect(() => {
        const getLocationCoordinates = async () => {
            try {
                const response = await GoogleMapsService.getCoordinatesByAddress(area);
                setLocation(response!);
            } catch (error) {
                console.log(error);
                setError("Failed to display map");
            }
        };

        getLocationCoordinates();
    }, [area]);

    useEffect(() => {
        if (placeToDisplay && placeToDisplay.coordinates) {
            setSelectedPlace(placeToDisplay);

            mapRef.current?.panTo({
                lat: placeToDisplay.coordinates.lat,
                lng: placeToDisplay.coordinates.lng
            });

            mapRef.current?.setZoom(15);
            setIsInfoWindowOpen(true);
        }
    }, [placeToDisplay]);

    const onLoadAutocomplete = (autocomplete: google.maps.places.Autocomplete) => {
        autocompleteRef.current = autocomplete;
    };

    const handlePlaceSearch = () => {
        const place = autocompleteRef.current?.getPlace();

        if (place) {
            const newPlace = createPlace(place);

            if (newPlace && newPlace.coordinates) {
                setSelectedPlace(newPlace);
                mapRef.current?.panTo({
                    lat: newPlace.coordinates.lat,
                    lng: newPlace.coordinates.lng
                });
                mapRef.current?.setZoom(15);
                setIsInfoWindowOpen(true);
            }
        }
    };

    const handleMarkerClick = () => {
        if (selectedPlace) {
            setIsInfoWindowOpen(true);
        }
    };

    const handleMapClick = async (event: google.maps.MapMouseEvent) => {
        event.stop();

        if (event.latLng && placesServiceRef.current) {
            const request = {
                location: event.latLng,
                radius: 20
            };

            placesServiceRef.current.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
                    const bestResult = results.find(
                        (place) => place.rating && place.rating >= 1
                    );

                    if (bestResult && bestResult.place_id) {
                        getPlaceDetails(bestResult.place_id);
                    } else {
                        console.log('No suitable POI found at this location.');
                    }
                } else {
                    console.log('No POI at this location.');
                }
            });
        } else {
            setIsInfoWindowOpen(false);
        }
    };

    const getPlaceDetails = (placeId: string) => {
        if (placesServiceRef.current) {
            placesServiceRef.current.getDetails({placeId}, (placeDetails, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && placeDetails) {
                    const newPlace = createPlace(placeDetails);

                    if (newPlace) {
                        setSelectedPlace(newPlace);
                        setIsInfoWindowOpen(true);
                    }
                } else {
                    console.error('Place details not found.');
                }
            });
        }
    }

    const createPlace = (placeDetails: google.maps.places.PlaceResult): Place | undefined => {
        if (placeDetails && placeDetails.geometry && placeDetails.geometry.location) {
            const location = placeDetails.geometry?.location;

            return {
                name: placeDetails.name || 'Unknown Place',
                coordinates: {lat: location.lat(), lng: location.lng()},
                photoUrl: placeDetails.photos?.[0]?.getUrl({maxWidth: 300, maxHeight: 200}),
                address: placeDetails.formatted_address || '',
                rating: placeDetails.rating ?? 0,
                priceLevel: placeDetails.price_level
            };
        }
    }

    return (
        <>
            {location ? (
                <LoadScript
                    googleMapsApiKey={apiKey}
                    libraries={libraries}
                    language="en"
                    region={location!.region}
                >
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={location!.position}
                        zoom={12}
                        onLoad={onLoad}
                        options={mapOptions}
                        onClick={handleMapClick}
                    >
                        {showAutoComplete && (
                            <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={handlePlaceSearch}>
                                <StyledTextField
                                    className="search"
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Search an activity..."
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon/>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{width: '70%'}}
                                />
                            </Autocomplete>
                        )}

                        {selectedPlace && (
                            <>
                                <Marker
                                    position={selectedPlace.coordinates!}
                                    title={selectedPlace.name}
                                    onClick={handleMarkerClick}
                                />

                                {isInfoWindowOpen && (
                                    <InfoWindow
                                        position={selectedPlace.coordinates}
                                        onCloseClick={() => setIsInfoWindowOpen(false)}
                                    >
                                        <PlaceDetails place={selectedPlace}
                                                      onAddClick={() => onAddPlace && onAddPlace(selectedPlace)}/>
                                    </InfoWindow>
                                )}
                            </>
                        )}
                    </GoogleMap>
                </LoadScript>
            ) : (error && (
                <ErrorBox error={error}/>
            ))}
        </>
    );
};

export default Map;