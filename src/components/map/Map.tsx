import L, { PointTuple, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef } from "react";

interface MapProps {
  timeline: Array<{
    lat: string;
    lon: string;
    timestamp: number;
    steps: string;
  }>;
}

const Map: React.FC<MapProps> = ({ timeline }) => {
  const mapRef = useRef<L.Map | null>(null);
  const polylineRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map if it doesn't exist
      const mapContainer = document.getElementById("map");
      if (mapContainer) {
        const mapInstance = L.map(mapContainer).setView([51.505, -0.09], 13);
        L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
          attribution: "Code Business",
        }).addTo(mapInstance);

        mapRef.current = mapInstance;
      }
    }

    // Remove existing markers and polyline
    mapRef.current?.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        layer.remove();
      }
    });

    // Add markers and draw a polyline
    const latLngs: LatLngExpression[] = timeline
      .filter(
        (dataPoint) =>
          !isNaN(parseFloat(dataPoint.lat)) && !isNaN(parseFloat(dataPoint.lon))
      )
      .map((dataPoint) => [
        parseFloat(dataPoint.lat),
        parseFloat(dataPoint.lon),
      ]);

    if (latLngs.length > 1) {
      const polyline = L.polyline(latLngs, { color: "blue" }).addTo(
        mapRef.current!
      );
      polylineRef.current = polyline;
    }

    timeline.forEach((dataPoint) => {
      const lat = parseFloat(dataPoint.lat);
      const lon = parseFloat(dataPoint.lon);

      if (!isNaN(lat) && !isNaN(lon)) {
        const customIcon = L.divIcon({
          className: "custom-marker",
          html: `<div>${dataPoint.steps}</div>`,
          iconSize: [20, 20] as PointTuple,
          iconAnchor: [10, 10] as PointTuple,
        });

        const marker = L.marker([lat, lon], { icon: customIcon }).addTo(
          mapRef.current!
        );
        marker.bindPopup(`Steps: ${dataPoint.steps}`).openPopup();
      } else {
        console.warn(
          `Invalid LatLng values for data point: ${JSON.stringify(dataPoint)}`
        );
      }
    });
  }, [timeline]);

  return <div id="map" style={{ height: "85vh" }}></div>;
};

export default Map;
