import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import "leaflet.locatecontrol";

class MapService {
    private map!: L.Map;

    initMap(layers: L.Layer[], center: L.LatLngExpression) {
        this.map = L.map("map", {
            center: center,
            zoom: 14,
            scrollWheelZoom: true,
            layers: layers,
            zoomControl: false,
        });
    }

    removeMap() {
        this.map.remove();
    }

    addBuildInControls() {
        L.control
            .zoom({
                position: "topright",
            })
            .addTo(this.map);

        L.control
            .locate({
                position: "bottomright",
            })
            .addTo(this.map);
    }

    setView(center: L.LatLngExpression) {
        this.map.setView(center, 14);
    }

    addMarker(point: L.LatLngExpression, name: string) {
        const customIcon = L.icon({
            iconUrl: '../../public/marker-icon-red.png',
            iconSize: [42, 42],
            iconAnchor: [19, 47],
            popupAnchor: [2, -45],
        });

        L.marker(point, {icon: customIcon})
            .addTo(this.map)
            .bindPopup(name)
            .openPopup();
    }
}

export default new MapService();
