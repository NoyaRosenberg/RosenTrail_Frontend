import {useEffect} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import "leaflet.locatecontrol";
import MapService from "../../../services/map.service";
import "react-toastify/dist/ReactToastify.css";
import {Box} from "@mui/material";
import MapSearch from './MapSearch';
import {PlaceDetails} from "../../../services/place.service";

interface MapProps {
    coordinates: { lon: number, lat: number };
}

// TODO: Replace with actual trip destination coordinates
const Map = ({coordinates}: MapProps) => {
    useEffect(() => {
        MapService.initMap([L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=tu0LMTgmkVGftApMVIOA#0.9/-4.26133/-41.45004', {
            maxZoom: 20,
            attribution: '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        })], [coordinates.lon, coordinates.lat]);

        return () => {
            MapService.removeMap();
        };
    }, [coordinates]);

    const displayPlaceOnMap = (place: PlaceDetails) => {
        if (place.coordinates) {
            MapService.setView([place.coordinates.lat, place.coordinates.lon]);
            MapService.addMarker([place.coordinates.lat, place.coordinates.lon], place.name);
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
                <Box style={{position: "absolute", padding: "15px", width: "75%", zIndex: 1000}}>
                    <MapSearch coordinates={coordinates} onPlacePick={displayPlaceOnMap}/>
                </Box>
            </Box>
        </Box>
    );
};

export default Map;
