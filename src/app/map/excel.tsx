"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { useJsApiLoader, Libraries } from "@react-google-maps/api";

const tabName = "Hoja 2";
const range = "A1:E1000";

interface PageProps {
  setMapCenter: (center: { lat: number; lng: number }) => void;
}

const Page: React.FC<PageProps> = ({ setMapCenter }) => {
  const [data, setData] = useState<string[][] | null>(null);
  const [newData, setNewData] = useState<string[]>(["", "", "", ""]);
  const [errors, setErrors] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function fetchData() {
    try {
      const response = await axios.get(
        "https://zapas-back.vercel.app/api/sheet-data",
        {
          params: {
            tabName,
            range,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching Google Sheets data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (index: number, value: string) => {
    const updatedData = [...newData];
    updatedData[index] = value;
    setNewData(updatedData);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const nextRow = data ? data.length + 1 : 1;
      const rangeToUpdate = `A${nextRow}:D${nextRow}`;

      await axios.post("https://zapas-back.vercel.app/api/update-sheet-data", {
        tabName,
        range: rangeToUpdate,
        values: [newData],
      });
      setNewData(["", "", "", ""]);
      setErrors([]);
      fetchData(); // Refresh the data after submission
    } catch (error) {
      console.error("Error adding data to Google Sheets:", error);
    }
  };

  const handleClearRange = async (rangeToClear: string) => {
    try {
      await axios.post("https://zapas-back.vercel.app/api/clear-range", {
        tabName,
        range: rangeToClear,
      });
      fetchData(); // Refresh the data after clearing the range
    } catch (error) {
      console.error("Error clearing range in Google Sheets:", error);
    }
  };

  const parseData = (dataArray: string[][]) => {
    return dataArray
      .map((row, index) => {
        const [name, price, m1, measures, img] = row;

        if (row.length === 3) {
          return { name, price, m1, measures: "", index };
        }
        if (row.length === 4) {
          return { name, price, m1, measures, index };
        }
        if (row.length === 5) {
          return { name, price, m1, measures, index, img };
        }

        return null;
      })
      .filter((item) => item !== null);
  };

  const chunkArray = (array: any[], chunkSize: number) => {
    const result: any[] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const parsedData = data ? parseData(data) : [];
  const chunkedData = chunkArray(parsedData, 4);

  const [address, setAddress] = useState("");
  const libraries: Libraries = ["places"];
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
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

      autocompleteInstance.addListener("place_changed", () => {
        const place = autocompleteInstance.getPlace();
        if (place.geometry && place.geometry.location) {
          const location = place.geometry.location;
          setMapCenter({
            lat: location.lat(),
            lng: location.lng(),
          });
          // Get the address and set it to both local state and parent state
          const formattedAddress = place.formatted_address || "";
          setAddress(formattedAddress);
        }
      });
    }
  }, [isLoaded, setMapCenter]);

  return (
    <Box
      style={{
        height: "100vh",
        backgroundColor: "black",
        padding: "0 auto",
        position: "relative",
        width: "100%",
        display: "flex",
      }}
      flexDir={{ base: "column", md: "row" }}
    >
      <form style={{ padding: "40px 0" }} onSubmit={handleSubmit}>
        {["Direccion", "Tienda"].map((label, index) => (
          <div style={{ padding: "10px 0" }} key={index}>
            <label style={{ color: "white" }}>{label}</label>
            <Input
              ref={label === "Direccion" ? inputRef : null}
              mt="5px"
              placeholder={label}
              bg="white"
              variant="filled"
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
        >
          <option value="10">10 %</option>
          <option value="20">20 %</option>
          <option value="30">30 %</option>
          <option value="40">40 %</option>
          <option value="50">50 %</option>
        </Select>
        <Box m="20px 0">
          <label style={{ color: "white" }}>Modelos</label>
          <Input mt="5px" bg="white" variant="filled" type="text" />
        </Box>
        <Select
          isRequired
          backgroundColor="white"
          placeholder="Marca"
          onChange={(e) => handleChange(3, e.target.value)}
          value={newData[3]}
        >
          <option value="Adidas">Adidas</option>
          <option value="Nike">Nike</option>
          <option value="Puma">Puma</option>
          <option value="Topper">Topper</option>
          <option value="Reebok">Reebok</option>
        </Select>

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
      <Box color="white" w="60%" textAlign="center">
        <Text color="red" mb={50} fontSize="lg">
          --DATABASE--
        </Text>
        {data
          ? data.map((x, i) => (
              <Box display="flex" justifyContent="center" key={i}>
                <Text fontWeight="600">Fila {i} </Text>
                <Text ml={2}>{x.join(", ")}</Text>
              </Box>
            ))
          : ""}
      </Box>
    </Box>
  );
};

export default Page;
