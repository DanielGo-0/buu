"use client";
import React, { useState } from "react";
import MapWithAutocomplete from "./Mapauto";
import Page from "./excel";
import { Box } from "@chakra-ui/react";
import Nav from "../Nav";

const HomePage = () => {
  const [mapCenter, setMapCenter] = useState({
    lat: -34.40128467210292,
    lng: -58.633310723280374,
  });
  return (
    <Box>
      <Nav />
      <MapWithAutocomplete mapCenter={mapCenter} />
      <Page setMapCenter={setMapCenter} />
    </Box>
  );
};

export default HomePage;
