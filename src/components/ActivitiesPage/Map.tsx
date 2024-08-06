import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import 'leaflet.locatecontrol';

const MapComponent: React.FC = () => {
  useEffect(() => {
    // Maps access token
    const key = 'pk.727039195b0ffb9e6bfbad01dcb1e090';

    // Add layers that we need to the map
    const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    });

    // Initialize the map
    const map = L.map('map', {
      center: [39.73, -104.99], // Map loads with this location as center
      zoom: 14,
      scrollWheelZoom: true,
      layers: [streets],
      zoomControl: false,
    });

    // Add the 'zoom' control
    L.control.zoom({
      position: 'topright',
    }).addTo(map);

    // Add the 'scale' control
    L.control.scale().addTo(map);

    // Add the 'locate' control
    L.control.locate({
      position: 'bottomright',
    }).addTo(map);

    // Add the geocoder control using LocationIQ API directly
    const geocoderControl = L.Control.extend({
      onAdd: function () {
        const container = L.DomUtil.create('input', 'leaflet-bar leaflet-control leaflet-control-custom');
        container.type = 'text';
        container.placeholder = 'Search for an address';
        container.style.width = '200px';
        container.style.margin = '10px';

        container.onkeypress = function (e) {
          if (e.key === 'Enter') {
            fetch(`https://us1.locationiq.com/v1/search.php?key=${key}&q=${container.value}&format=json`)
              .then(response => response.json())
              .then(data => {
                if (data && data.length > 0) {
                  const result = data[0];
                  map.setView([result.lat, result.lon], 14);
                  L.marker([result.lat, result.lon]).addTo(map)
                    .bindPopup(result.display_name)
                    .openPopup();
                }
              });
          }
        };

        return container;
      },
    });

    map.addControl(new geocoderControl({ position: 'topleft' }));

    // Cleanup function to remove the map on component unmount
    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '100%' }}></div>;
};

export default MapComponent;
