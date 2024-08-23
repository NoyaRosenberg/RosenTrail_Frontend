import {useCallback, useRef, useState} from 'react';
import {
    GoogleMap,
    LoadScript,
    Autocomplete,
    Marker,
    Libraries
} from '@react-google-maps/api';
import {StyledTextField} from "../../../theme";
import {InputAdornment} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Place {
    name: string;
    position: {
        lat: number;
        lng: number;
    };
}

const libraries = ['places'] as Libraries;

const mapContainerStyle = {
    height: '100vh',
    width: '100%',
    padding: 8
};

interface MapProps {
    center: { lat: number, lng: number };
}

const Map = ({center}: MapProps) => {
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
    const mapRef = useRef<google.maps.Map | null>(null);

    const onLoad = useCallback((map: google.maps.Map) => {
        mapRef.current = map;
    }, []);

    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    const onLoadAutocomplete = (autocomplete: google.maps.places.Autocomplete) => {
        autocompleteRef.current = autocomplete;
    };

    const onPlaceChanged = () => {
        const place = autocompleteRef.current?.getPlace();
        if (place && place.geometry && place.geometry.location) {
            const location = place.geometry.location;

            setSelectedPlace({
                name: place.name || 'Unknown Place',
                position: {
                    lat: location.lat(),
                    lng: location.lng(),
                },
            });

            mapRef.current?.panTo({lat: location.lat(), lng: location.lng()});
        }
    };

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyDC7J-IsGSicrRECRUn5H2pYhRm-DpATNo"
            libraries={libraries}
        >
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={8}
                onLoad={onLoad}
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
                                    <SearchIcon/>
                                </InputAdornment>
                            ),
                        }}
                        sx={{width: "70%"}}
                    />
                </Autocomplete>

                {selectedPlace && (
                    <Marker position={selectedPlace.position} title={selectedPlace.name}/>
                )}
            </GoogleMap>
        </LoadScript>
    )
        ;
};

export default Map;
