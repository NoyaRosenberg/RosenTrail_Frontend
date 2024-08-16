import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.min.css";
import "leaflet.locatecontrol";
import MapService from "../../services/map.service";
import LocationIQService, {
  CountryCode,
} from "../../services/locationIQ.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "../SearchBar";
import { createRoot } from "react-dom/client";

const Map: React.FC = () => {
  useEffect(() => {
    const streets = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );

    MapService.initMap([streets], [39.73, -104.99]);
    MapService.addBuildInControls();
    addSearchBar();

    return () => {
      MapService.removeMap();
    };
  }, []);

  const addSearchBar = () => {
    const searchControl = L.Control.extend({
      onAdd: function (): HTMLElement {
        const container = L.DomUtil.create("div");
        container.style.paddingTop = "7px";
        container.style.paddingLeft = "7px";

        const root = document.createElement("div");
        container.appendChild(root);

        const handleSearch = async (searchValue: string) => {
          try {
            if (searchValue.length >= 2) {
              const suggestions = await LocationIQService.searchLocations(searchValue, [CountryCode.FRANCE]);

              if (suggestions && suggestions.length > 0) {
                const suggestion = suggestions[0];
                MapService.setView([suggestion.lat, suggestion.lon]);
                MapService.addMarker([suggestion.lat, suggestion.lon], suggestion.display_name);
              }
            }
          } catch (error) {
            toast.error((error as Error).message);
          }
        };

        createRoot(root).render(
            <SearchBar placeholder="Search for an activity..." onSearch={handleSearch} />
        );

        return container;
      }
    });

    MapService.addControl(new searchControl({ position: "topleft" }));
  };

  return (
    <div id="map" style={{ width: "100%", height: "100%", zIndex: 0 }}></div>
  );
};

export default Map;
