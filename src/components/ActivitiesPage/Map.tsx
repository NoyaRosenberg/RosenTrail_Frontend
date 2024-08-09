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
    const geocoderControl = L.Control.extend({
      onAdd: function () {
        const container = L.DomUtil.create("input", "leaflet-bar leaflet-control leaflet-control-custom");
        container.type = "text";
        container.placeholder = "Search for an activity...";
        container.style.width = "200px";
        container.style.margin = "10px";

        container.onkeydown = async function (e) {
          if (e.key === "Enter") {
            try {
              const response = await LocationIQService.searchLocations(container.value, [CountryCode.FRANCE]);

              if (response && response.length > 0) {
                const location = response[0];
                MapService.setView([location.lat, location.lon]);
                MapService.addMarker([location.lat, location.lon], location.display_name);
              }
            } catch (error: unknown) {
              toast.error((error as Error).message);
            }
          }
        };

        return container;
      },
    });

    MapService.addControl(new geocoderControl({ position: "topleft" }));
  };

  return (
    <div id="map" style={{ width: "100%", height: "100%", zIndex: 0 }}></div>
  );
};

export default Map;
