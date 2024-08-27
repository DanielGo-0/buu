"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Libraries,
} from "@react-google-maps/api";
import { Input } from "@chakra-ui/react";

const libraries: Libraries = ["places"];

interface MapWithAutocompleteProps {
  mapCenter: { lat: number; lng: number };
}

const MapWithAutocomplete: React.FC<MapWithAutocompleteProps> = ({
  mapCenter,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [address, setAddress] = useState<string>("");

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  useEffect(() => {
    if (isLoaded && window.google) {
      const autocompleteInstance = new window.google.maps.places.Autocomplete(
        inputRef.current!,
        {
          types: ["geocode"], // Allows a broad range of address types
        }
      );
    }
  }, [isLoaded, mapCenter]);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  return isLoaded ? (
    <div style={{ height: "500px", width: "100%", position: "relative" }}>
      <GoogleMap
        center={mapCenter}
        zoom={15}
        mapContainerStyle={{ height: "100%", width: "100%" }}
      >
        {mapCenter.lat !== 0 && mapCenter.lng !== 0 && (
          <Marker position={mapCenter} />
        )}
      </GoogleMap>
      <Input
        ref={inputRef}
        placeholder="Enter a place"
        variant="filled"
        bg="white"
        width="300px"
        mt={4}
      />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default MapWithAutocomplete;
