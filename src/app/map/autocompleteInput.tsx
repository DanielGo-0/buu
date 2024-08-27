"use client";
import React, { useState } from "react";
import { Box, Input, List, ListItem, FormLabel } from "@chakra-ui/react";

const AutocompleteInput = ({ options }: any) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    // Filter the options based on the input value
    const filtered = options.filter((option: any) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (option: string) => {
    setInputValue(option); // Set the input value to the clicked option
    setFilteredOptions([]); // Clear the filtered options
    setIsFocused(false); // Hide the list when an option is clicked
  };

  return (
    <Box position="relative">
      <FormLabel color="white">Marcas</FormLabel>

      <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Busca marcas..."
        bg="white"
        textColor="black"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isFocused && filteredOptions.length > 0 && (
        <List
          position="absolute"
          zIndex="1"
          bg="white"
          border="1px solid #ccc"
          width="100%"
          maxHeight="150px"
          overflowY="auto"
          onMouseDown={(e) => e.preventDefault()} // Prevents the list from closing when clicking on an option
        >
          {filteredOptions.map((option, index) => (
            <ListItem
              key={index}
              p="8px"
              cursor="pointer"
              _hover={{ backgroundColor: "gray.100" }}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default AutocompleteInput;
