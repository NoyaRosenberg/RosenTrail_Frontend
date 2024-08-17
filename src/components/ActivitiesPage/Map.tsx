import React, {useEffect, useState} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import "leaflet.locatecontrol";
import MapService from "../../services/map.service";
import LocationIQService, {CountryCode, Location} from "../../services/locationIQ.service";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Box, debounce} from "@mui/material";
import SearchBar from "../SearchBar";

const Map: React.FC = () => {
    const [places, setPlaces] = useState<Location[]>([]);
    const [suggestions, setSuggestions] = useState<Set<string>>(new Set());

    useEffect(() => {
        MapService.initMap([L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")], [39.73, -104.99]);

        return () => {
            MapService.removeMap();
        };
    }, []);

    const handleSearch = debounce(async (searchValue: string) => {
        try {
            if (searchValue.length >= 2) {
                const results = await LocationIQService.searchLocations(searchValue, [CountryCode.FRANCE]);

                if (results && results.length > 0) {
                    setPlaces(results);
                    setSuggestions(new Set<string>(results.sort((a: Location, b: Location) =>
                        (b.popularity || 0) - (a.popularity || 0))
                        .map((result: Location) => result.shortName)));
                } else {
                    setSuggestions(new Set());
                }
            } else {
                setSuggestions(new Set());
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    }, 500);

    const handleLocationPick = (name: string) => {
        const location = places.find(place => place.shortName === name);

        if (location) {
            MapService.setView([location.lat, location.lon]);
            MapService.addMarker([location.lat, location.lon], location.shortName);
        }
    };

    return (
        <Box style={{display: "flex", width: "100%", height: "100%", zIndex: 0}}>
            <Box style={{
                width: "100%",
                height: "100%",
                position: "relative",
                display: "flex",
            }}>
                <Box id="map" style={{flex: 1}}></Box>
                <Box style={{position: "absolute", padding: "15px", width: "80%", zIndex: 1000}}>
                    <SearchBar
                        placeholder="Search for an activity..."
                        onSearch={handleSearch}
                        suggestions={[...suggestions]}
                        onSuggestionClick={handleLocationPick}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Map;
