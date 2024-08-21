import {useState} from 'react';
import PlaceService, {PlaceDetails} from '../../../services/place.service';
import SearchBar from "../../SearchBar";
import {debounce} from "@mui/material";

interface MapSearchProps {
    coordinates: {lon: number, lat: number};
    onPlacePick: (place: PlaceDetails) => void;
}

const MapSearch = ({coordinates, onPlacePick}: MapSearchProps) => {
    const [places, setPlaces] = useState<PlaceDetails[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const fetchPlaces = debounce(async (searchValue: string) => {
        if (searchValue.length >= 2) {
            const results = await PlaceService.fetchPlaces(searchValue, `${coordinates.lon},${coordinates.lat}`);
            setPlaces(results);
            setSuggestions(results.map(result => result.name)
                .filter((suggestion, index, self) =>
                    index === self.findIndex(t => t === suggestion)));
        }
    }, 100);

    const onPlaceSelection = (suggestion: string) => {
        const place = places.find(place => place.name === suggestion);

        if (place) {
            onPlacePick(place);
        }
    };

    return (
        <SearchBar
            placeholder="Search for an activity..."
            onSearch={fetchPlaces}
            suggestions={suggestions}
            onSuggestionClick={onPlaceSelection}
        />
    );
};

export default MapSearch;
