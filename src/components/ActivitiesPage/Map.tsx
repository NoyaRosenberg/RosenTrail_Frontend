import {useCallback, useRef, useState} from 'react';
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
import {Location} from '../../services/google-maps.service';
import PlaceDetails, {Place} from './PlaceDetails';

interface MapProps {
    location: Location;
    onPlaceSelection: (place: Place) => void;
}

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

const Map = ({location, onPlaceSelection}: MapProps) => {
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
    const mapRef = useRef<google.maps.Map | null>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const geocoderRef = useRef<google.maps.Geocoder | null>(null);
    const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);

    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
        geocoderRef.current = new google.maps.Geocoder();
        placesServiceRef.current = new google.maps.places.PlacesService(map);
    }, []);

    const onLoadAutocomplete = (autocomplete: google.maps.places.Autocomplete) => {
        autocompleteRef.current = autocomplete;
    };

    const handlePlaceSearch = () => {
        const place = autocompleteRef.current?.getPlace();

        if (place) {
            const newPlace = createPlace(place);

            if (newPlace) {
                setSelectedPlace(newPlace);
                mapRef.current?.panTo({
                    lat: newPlace.location.position.lat,
                    lng: newPlace.location.position.lng
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

    const createPlace = (placeDetails: google.maps.places.PlaceResult) => {
        if (placeDetails && placeDetails.geometry && placeDetails.geometry.location) {
            const location = placeDetails.geometry?.location;
            const photoUrl = placeDetails.photos?.[0]?.getUrl({maxWidth: 300, maxHeight: 200});
            const address = placeDetails.formatted_address || '';
            const rating = placeDetails.rating;
            const priceLevel = placeDetails.price_level;
            const openHours = placeDetails.opening_hours?.weekday_text || [];
            const type = placeDetails.types ? placeDetails.types[0] : undefined;

            return {
                name: placeDetails.name || 'Unknown Place',
                location: {
                    position: {
                        lat: location.lat(),
                        lng: location.lng(),
                    },
                    region:
                        placeDetails.address_components?.find((component) =>
                            component.types.includes('country')
                        )?.short_name ?? '',
                },
                photoUrl,
                address,
                rating,
                priceLevel,
                openHours,
                type
            };
        }
    }

    return (
        <LoadScript
            googleMapsApiKey={apiKey}
            libraries={libraries}
            language="en"
            region={location.region}
        >
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={location.position}
                zoom={8}
                onLoad={onLoad}
                options={mapOptions}
                onClick={handleMapClick}
            >
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

                {selectedPlace && (
                    <>
                        <Marker
                            position={selectedPlace.location.position}
                            title={selectedPlace.name}
                            onClick={handleMarkerClick}
                        />

                        {isInfoWindowOpen && (
                            <InfoWindow
                                position={selectedPlace.location.position}
                                onCloseClick={() => setIsInfoWindowOpen(false)}
                            >
                                <PlaceDetails place={selectedPlace} onAddClick={() => onPlaceSelection(selectedPlace)}/>
                            </InfoWindow>
                        )}
                    </>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;