import {useState} from 'react';
import PlaceService, {PlaceDetails} from '../../../services/place.service';
import SearchBar, {Suggestion} from "../../SearchBar";
import {debounce} from "@mui/material";

interface MapSearchProps {
    coordinates: {lon: number, lat: number};
    onPlacePick: (place: PlaceDetails) => void;
}

const MapSearch = ({coordinates, onPlacePick}: MapSearchProps) => {
    const [places, setPlaces] = useState<PlaceDetails[]>([]);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

    const fetchPlaces = debounce(async (searchValue: string) => {
        if (searchValue.length >= 2) {
            const results = await PlaceService.fetchPlaces(searchValue, `${coordinates.lon},${coordinates.lat}`);
            setPlaces(results);
            setSuggestions(results.map(result => {
                return {
                    id: result.id,
                    name: result.name
                }
            }).filter((suggestion, index, self) =>
                index === self.findIndex(t => t.name === suggestion.name)));
        }
    }, 100);

    const onPlaceSelection = (suggestion: Suggestion) => {
        const place = places.find(place => place.id === suggestion.id);

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
