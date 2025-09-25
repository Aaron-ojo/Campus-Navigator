import { useEffect, useRef, useState } from "react";
// import locations from "../Location"; // ✅ import locations
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// Fix default marker icons
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
let DefaultIcon = L.icon({ iconUrl, shadowUrl: iconShadow });
L.Marker.prototype.options.icon = DefaultIcon;

// Green icon for user location
const userIcon = new L.Icon({
  iconUrl: "https://maps.gstatic.com/mapfiles/ms2/micons/green-dot.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Haversine formula (distance in meters)
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in meters
};

// OAU boundaries
const oauBounds = [
  [7.49, 4.515],
  [7.525, 4.535],
];

// Routing component
const Routing = ({ userLocation, destination }) => {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (userLocation && destination) {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }

      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(userLocation.lat, userLocation.lng),
          L.latLng(destination.lat, destination.lng),
        ],
        lineOptions: { styles: [{ color: "blue", weight: 5 }] },
        addWaypoints: false,
        draggableWaypoints: false,
        routeWhileDragging: false,
        showAlternatives: false,
      }).addTo(map);
    }
  }, [userLocation, destination, map]);

  return null;
};

const MyMap = ({ locations, setSelected, selectedLocation }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);
  const [time, setTime] = useState(null); // ⏱ new state for estimated time
  const [nearestLocation, setNearestLocation] = useState(null);
  const markerRefs = useRef({});

  useEffect(() => {
    if (userLocation) {
      let closest = null;
      let minDist = Infinity;

      locations.forEach((loc) => {
        const dist = getDistance(
          userLocation.lat,
          userLocation.lng,
          loc.lat,
          loc.lng
        );
        if (dist < minDist) {
          minDist = dist;
          closest = loc;
        }
      });

      if (minDist < 50) {
        setNearestLocation(closest);
      } else {
        setNearestLocation(null);
      }
    }
  }, [userLocation, locations]);

  // Track user location
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const newLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setUserLocation(newLocation);

          if (destination) {
            const d = getDistance(
              newLocation.lat,
              newLocation.lng,
              destination.lat,
              destination.lng
            );
            const distKm = d / 1000;
            setDistance(distKm.toFixed(2)); // km

            // 🚶 Assume walking speed = 5 km/h
            const walkingSpeed = 5; // km/h
            const timeHours = distKm / walkingSpeed;
            const timeMinutes = Math.round(timeHours * 60);

            setTime(timeMinutes);
          }
        },
        (err) => {
          console.error("Geolocation error:", err);
          alert("Unable to get precise location. Using default location.");
          setUserLocation({ lat: 7.4985, lng: 4.5222 });
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [destination]);

  // Auto-open selected location popup
  useEffect(() => {
    if (selectedLocation && markerRefs.current[selectedLocation.name]) {
      // Close all other popups first
      Object.values(markerRefs.current).forEach((marker) =>
        marker.closePopup()
      );

      markerRefs.current[selectedLocation.name].openPopup();
      setDestination(selectedLocation);
    }
  }, [selectedLocation]);

  return (
    <MapContainer
      bounds={oauBounds}
      zoom={15}
      style={{ height: "100%", minHeight: "350px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* User location */}
      {userLocation && (
        <Marker position={userLocation} icon={userIcon}>
          <Popup>
            {nearestLocation
              ? `You are at ${nearestLocation.name}.`
              : "You are here 📍"}
            <br />
            {destination ? (
              <>
                Distance to {destination.name}: {distance} km
                <br />
                Estimated time: {time} mins ⏱
              </>
            ) : (
              "No destination selected"
            )}
          </Popup>
        </Marker>
      )}

      {/* Campus locations */}
      {locations.map((loc, i) => (
        <Marker
          key={i}
          position={[loc.lat, loc.lng]}
          ref={(ref) => {
            if (ref) markerRefs.current[loc.name] = ref;
          }}
          eventHandlers={{
            click: () => {
              // ✅ Close all other popups first
              Object.values(markerRefs.current).forEach((marker) =>
                marker.closePopup()
              );

              setDestination({ lat: loc.lat, lng: loc.lng, name: loc.name });
              setSelected(loc);

              if (markerRefs.current[loc.name]) {
                markerRefs.current[loc.name].openPopup();
              }
            },
          }}
        >
          <Popup autoClose={false} closeOnClick={false}>
            <h3>{loc.name}</h3>
            {loc.image && (
              <img
                src={`/images/${loc.image}`}
                alt={loc.name}
                style={{
                  width: "150px",
                  height: "auto",
                  borderRadius: "8px",
                  marginBottom: "5px",
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.5)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            )}
            <br />
            <button
              onClick={() => {
                // ✅ Also close all other popups when setting destination
                Object.values(markerRefs.current).forEach((marker) =>
                  marker.closePopup()
                );

                setDestination({ lat: loc.lat, lng: loc.lng, name: loc.name });
                setSelected(loc);

                if (markerRefs.current[loc.name]) {
                  markerRefs.current[loc.name].openPopup();
                }
              }}
            >
              Your destination
            </button>
          </Popup>
        </Marker>
      ))}

      {userLocation && destination && (
        <Routing userLocation={userLocation} destination={destination} />
      )}
    </MapContainer>
  );
};

export default MyMap;
