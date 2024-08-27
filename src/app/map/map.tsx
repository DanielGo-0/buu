"use client";
import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const libraries = ["places"];

const Map = () => {
  const [mapCenter, setMapCenter] = useState({
    lat: 40.748817,
    lng: -73.985428,
  }); // Default to NYC
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const geocodeAddress = async (address) => {
    if (!window.google) {
      setError("Google Maps API not loaded");
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    try {
      const results = await new Promise((resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
          if (status === "OK") {
            resolve(results);
          } else {
            reject(status);
          }
        });
      });
      const { lat, lng } = results[0].geometry.location;
      setMapCenter({ lat: lat(), lng: lng() });
      setError(null);
    } catch (error) {
      setError("Failed to geocode address");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    geocodeAddress(address);
  };

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: "16px" }}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
          style={{ width: "300px", padding: "8px" }}
        />
        <button type="submit" style={{ marginLeft: "8px", padding: "8px" }}>
          Search
        </button>
      </form>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <div style={{ height: "400px", width: "100%" }}>
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          zoom={14}
          center={mapCenter}
        >
          <Marker position={mapCenter} />
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;
