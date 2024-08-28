// components/Page.js
"use client";
import React, { useRef, useState, useEffect } from "react";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useJsApiLoader, Libraries } from "@react-google-maps/api";
import { useSheetData } from "../hooks/useSheetData";
import MultiSelect from "./multiselectmodal";
import { brandOptions, value } from "./options";

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
  const [tienda, setTienda] = useState("");
  const [direccion, setDireccion] = useState("");
  const [sent, setSent] = useState(false);
  const [modelos, setModelos] = useState("");
  const libraries: Libraries = ["places"];
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries,
  });

  const name = (ix: any, vl: any) => {
    switch (ix) {
      case 0:
        setTienda(vl);
        break;
      case 1:
        setDireccion(vl);
        break;
      case 2:
        setModelos(vl);
        break;
      default:
        break;
    }
    handleChange(ix, vl);
  };

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
          setDireccion(place.formatted_address || "");
          name(1, place.formatted_address || "");
        }
      });
    }
  }, [isLoaded, setMapCenter]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
    // Clear all inputs and selects after submission
    setSent(true);
    setTienda("");
    setDireccion("");
    setModelos("");
  };

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
      pb={{ base: "100px" }}
    >
      <form style={{ padding: "40px 0" }} onSubmit={handleFormSubmit}>
        <div style={{ padding: "10px 0" }}>
          <label style={{ color: "white" }}>Tienda</label>
          <Input
            mt="5px"
            placeholder="Tienda"
            bg="white"
            type="text"
            value={tienda}
            onChange={(e) => name(0, e.target.value)}
          />
        </div>

        <div style={{ padding: "10px 0" }}>
          <label style={{ color: "white" }}>Direccion</label>
          <Input
            ref={inputRef}
            mt="5px"
            placeholder="Direccion"
            bg="white"
            type="text"
            value={direccion}
            onChange={(e) => name(1, e.target.value)}
          />
        </div>

        <MultiSelect
          handleValue={name}
          options={value}
          title={"Descuento"}
          sent={sent}
          setSent={setSent}
        />
        <MultiSelect
          handleValue={name}
          options={brandOptions}
          title={"Marcas"}
          sent={sent}
          setSent={setSent}
        />

        <Box m="20px 0">
          <label style={{ color: "white" }}>Modelos</label>
          <Input
            isRequired
            mt="5px"
            bg="white"
            type="text"
            color="black"
            value={modelos}
            onChange={(e) => name(3, e.target.value)}
          />
        </Box>

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
