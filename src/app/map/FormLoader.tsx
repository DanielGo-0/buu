// components/Page.js
"use client";
import React, { useRef, useState, useEffect } from "react";
import { Box, Button, Input, Select, Text } from "@chakra-ui/react";
import { useJsApiLoader, Libraries } from "@react-google-maps/api";
import { useSheetData } from "../hooks/useSheetData";
import AutocompleteInput from "./autocompleteInput";

const Page = ({ setMapCenter }: any) => {
  const tabName = "Hoja 2" as any;
  const range = "A1:E1000" as any;
  const {
    data,
    newData,
    errors,
    handleChange,
    handleSubmit,
    handleClearRange,
  } = useSheetData(tabName, range);

  const inputRef = useRef(null);
  const [address, setAddress] = useState("");
  const libraries: Libraries = ["places"];
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });
  function name(ix: any, vl: any) {
    handleChange(4, vl);
  }

  useEffect(() => {
    if (isLoaded && window.google) {
      const autocompleteInstance = new window.google.maps.places.Autocomplete(
        inputRef.current!,
        {
          types: ["geocode"],
        }
      );

      autocompleteInstance.addListener("place_changed", () => {
        const place = autocompleteInstance.getPlace();
        if (place.geometry && place.geometry.location) {
          const location = place.geometry.location;
          setMapCenter({
            lat: location.lat(),
            lng: location.lng(),
          });
          setAddress(place.formatted_address || "");
        }
      });
    }
  }, [isLoaded, setMapCenter]);

  const options = [
    "ADDNICE",
    "ADIDAS",
    "ALPINE SKATE",
    "ARGOLF",
    "ASICS",
    "ATHIX",
    "ATOMIK",
    "BABOLAT",
    "BEST SOX",
    "BODY",
    "CAPSLAB",
    "CARTAGO",
    "CHAMPION",
    "CONVERSE",
    "CROCS",
    "DAK",
    "DIADORA",
    "DRB",
    "FILA",
    "FLASH",
    "FOOTY",
    "HAVAIANAS",
    "HEAD",
    "HIFEL",
    "IPANEMA",
    "JACK LEE",
    "JOHN FOOS",
    "KAPPA",
    "LA DOLFINA",
    "LA GEAR",
    "LACOSTE",
    "LECOQ",
    "MARISA",
    "MITRE",
    "MONTAGNE",
    "NEW BALANCE",
    "NIKE",
    "OLYMPIKUS",
    "OPORTUNIDADES",
    "PENALTY",
    "PONY",
    "PROCER",
    "PROFIT",
    "PUMA",
    "QUIKSILVER",
    "REEBOK",
    "REEF",
    "REUSCH",
    "REVES",
    "SNAUWAERT",
    "SPORT COMPLEMENT",
    "SPORT SERVICES",
    "TOPPER",
    "UMBRO",
    "UNDER ARMOUR",
    "VANS",
    "WILSON",
  ];

  return (
    <Box
      style={{
        backgroundColor: "black",
        position: "relative",
        width: "100%",
        display: "flex",
      }}
      flexDir={{ base: "column", md: "row" }}
      justifyContent={{ base: "center", md: "space-around" }}
      paddingX={{ base: "80px" }}
      pt={{ base: "100px", md: "40px" }}
    >
      <form
        style={{ padding: "40px 0" }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {["Direccion", "Tienda"].map((label, index) => (
          <div style={{ padding: "10px 0" }} key={index}>
            <label style={{ color: "white" }}>{label}</label>
            <Input
              ref={label === "Direccion" ? inputRef : null}
              mt="5px"
              placeholder={label}
              bg="white"
              type="text"
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        ))}
        <Select
          variant="outlined"
          backgroundColor="white"
          m="20px 0"
          placeholder="Oferta %"
          onChange={(e) => handleChange(2, e.target.value)}
          value={newData[2]}
          isRequired
        >
          <option value="10%">10 %</option>
          <option value="20%">20 %</option>
          <option value="30%">30 %</option>
          <option value="40%">40 %</option>
          <option value="50%">50 %</option>
        </Select>
        <Box m="20px 0">
          <label style={{ color: "white" }}>Modelos</label>
          <Input
            isRequired
            mt="5px"
            bg="white"
            type="text"
            color="black"
            onChange={(e) => handleChange(3, e.target.value)}
          />
        </Box>
        <AutocompleteInput options={options} handleValue={name} />

        <Button mt="25px" type="submit" colorScheme="red" w="full">
          Añadir Item
        </Button>
        {errors.length > 0 && (
          <ul style={{ color: "red" }}>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </form>
      <Box
        display="flex"
        flexDir="column"
        justifyContent="center"
        color="white"
        w={{ base: "100%", md: "60%" }}
        textAlign="center"
        border="1px solid red"
      >
        <Text color="red" mb={50} fontSize="lg">
          --DATABASE--
        </Text>
        {data &&
          data.map((x: any, i) => (
            <Box display="flex" justifyContent="center" key={i}>
              <Text fontWeight="600">Fila {i} </Text>
              <Text ml={2}>{x.join(", ")}</Text>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default Page;
