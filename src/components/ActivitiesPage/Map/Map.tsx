import { useCallback, useRef, useState } from 'react';
import {
    GoogleMap,
    LoadScript,
    Autocomplete,
    Marker,
    InfoWindow,
    Libraries,
} from '@react-google-maps/api';
import { StyledTextField } from '../../../theme';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Location } from '../../../services/geocoding.service';
import PlaceDetails, {Place} from "../PlaceDetails";

interface MapProps {
    location: Location;
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

const Map = ({ location }: MapProps) => {
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
    const mapRef = useRef<google.maps.Map | null>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
    }, []);

    const onLoadAutocomplete = (autocomplete: google.maps.places.Autocomplete) => {
        autocompleteRef.current = autocomplete;
    };

    const onPlaceChanged = () => {
        const place = autocompleteRef.current?.getPlace();

        if (place && place.geometry && place.geometry.location) {
            const location = place.geometry.location;
            const photoUrl = place.photos?.[0]?.getUrl({ maxWidth: 300, maxHeight: 200 });

            setSelectedPlace({
                name: place.name || 'Unknown Place',
                location: {
                    position: {
                        lat: location.lat(),
                        lng: location.lng()
                    },
                    region: place.address_components?.find(component =>
                        component.types.includes('country')
                    )?.short_name ?? ''
                },
                photoUrl,
            });

            mapRef.current?.panTo({ lat: location.lat(), lng: location.lng() });
            mapRef.current?.setZoom(15);
            setIsInfoWindowOpen(true);
        }
    };

    const handleMarkerClick = () => {
        setIsInfoWindowOpen(true);
    };

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyDC7J-IsGSicrRECRUn5H2pYhRm-DpATNo"
            libraries={['places'] as Libraries}
            language="en"
            region={location.region}
        >
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={location.position}
                zoom={8}
                onLoad={onLoad}
                options={mapOptions}
            >
                <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={onPlaceChanged}>
                    <StyledTextField
                        className="search"
                        fullWidth
                        variant="outlined"
                        placeholder="Search an activity..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ width: '70%' }}
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
                                <PlaceDetails place={selectedPlace}/>
                            </InfoWindow>
                        )}
                    </>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;