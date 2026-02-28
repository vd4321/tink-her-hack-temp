"use client";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";


import { useSpots } from "@/lib/spots-context";
import type { Spot } from "@/lib/spots-context";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const TYPE_COLORS: Record<string, string> = {
  Portrait: "#e8ff47",
  Landscape: "#5bffd8",
  Street: "#ff6b35",
  Aerial: "#a78bfa",
  Astro: "#60a5fa",
  Reels: "#f472b6",
};

// ── Fly to selected spot when it changes ──
/*function FlyToSpot() {
  const { selectedSpot } = useSpots();
  const map = useMap();

  useEffect(() => {
    if (selectedSpot) {
      map.flyTo([selectedSpot.lat, selectedSpot.lng], 10, { duration: 1 });
    }
  }, [selectedSpot, map]);

  return null;
}*/
function FlyToSpot() {
  const { selectedSpot, visibleSpots, filters } = useSpots();
  const map = useMap();

  // Fly to selected pin when clicked
  useEffect(() => {
    if (selectedSpot) {
      map.flyTo([selectedSpot.lat, selectedSpot.lng], 10, { duration: 1 });
    }
  }, [selectedSpot, map]);

  // If search returns exactly 1 match → fly to it and pin it automatically
  useEffect(() => {
    if (filters.search.trim() && visibleSpots.length === 1) {
      const spot = visibleSpots[0];
      map.flyTo([spot.lat, spot.lng], 12, { duration: 1.2 });
    }
    // If search is cleared → zoom back out to world view
    if (!filters.search.trim()) {
      map.flyTo([20, 0], 2, { duration: 1 });
    }
  }, [filters.search, visibleSpots, map]);

  return null;
}



// ── Custom colored pin icon ──
function makeIcon(spot: Spot, isSelected: boolean) {
  const color = TYPE_COLORS[spot.type] ?? "#e8ff47";
  const size = isSelected ? 36 : 28;
  return L.divIcon({
    className: "",
    html: `
      <div style="
        width:${size}px;
        height:${size}px;
        border-radius:50%;
        background:${color};
        border:${isSelected ? "3px solid white" : "2px solid rgba(255,255,255,0.3)"};
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:${isSelected ? 14 : 11}px;
        font-weight:900;
        color:#090d12;
        box-shadow:0 0 ${isSelected ? 16 : 8}px ${color}88;
        cursor:pointer;
      ">${spot.type[0]}</div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export default function Map() {
  const { visibleSpots, selectedSpot, setSelectedSpot } = useSpots();

  return (
    <>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        {/* Dark map tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="©OpenStreetMap"
        />

        {/* Fly to selected spot */}
        <FlyToSpot />
        {/* Filtered spot markers */}
        {visibleSpots.map((spot) => (
          <Marker
            key={spot.id}
            position={[spot.lat, spot.lng]}
            icon={makeIcon(spot, selectedSpot?.id === spot.id)}
            eventHandlers={{
              click: () => setSelectedSpot(spot),
            }}
          >
            <Popup>
              <div style={{ fontFamily: "DM Sans, sans-serif", minWidth: "140px" }}>
                <div style={{ fontSize: "20px", marginBottom: "4px" }}>{spot.emoji}</div>
                <strong>{spot.name}</strong>
                <div style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}>
                  📍 {spot.loc}
                </div>
                <div style={{ fontSize: "12px", marginTop: "6px" }}>
                  ⭐ {spot.rating} · {spot.type}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <style>{`
        .leaflet-container {
          background: #090d12;
        }
        .leaflet-popup-content-wrapper {
          background: #111820;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: #f0f4f8;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }
        .leaflet-popup-tip {
          background: #111820;
        }
        .leaflet-popup-close-button {
          color: #6b7f92 !important;
        }
        .leaflet-control-zoom a {
          background: #111820 !important;
          color: #f0f4f8 !important;
          border-color: rgba(255,255,255,0.07) !important;
        }
        .leaflet-control-zoom a:hover {
          background: #18232e !important;
        }
      `}</style>
    </>
  );
}
