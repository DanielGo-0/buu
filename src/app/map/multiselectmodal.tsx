import { Box, FormLabel } from "@chakra-ui/react";
import React, { useState } from "react";
import Select, { components } from "react-select";

// Options for the select dropdown
const MultiSelect = ({ handleValue, options, title }: any) => {
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  // Handle change for multi-select
  const handleChange = (selected: any) => {
    setSelectedOptions(selected);
    const formattedValues = selected.map((x: any) => x.value).toString();
    console.log(formattedValues);
    title === "Descuento"
      ? handleValue(2, formattedValues)
      : handleValue(4, formattedValues);
  };

  const handleFocus = () => {
    setMenuIsOpen(true);
  };

  const handleBlur = (event: React.FocusEvent<any>) => {
    // Delay closing the menu to allow for clicks within the menu
    setTimeout(() => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        setMenuIsOpen(false);
      }
    }, 100);
  };

  // Custom Menu Component
  const CustomMenu = (props: any) => {
    return (
      <components.Menu {...props}>
        <div
          style={{ backgroundColor: "black", color: "blue", padding: "0px" }}
        >
          {props.children}
        </div>
      </components.Menu>
    );
  };

  // Custom Option Component
  const CustomOption = (props: any) => {
    return (
      <components.Option {...props} style={{ padding: "10px" }}>
        {props.data.label}
      </components.Option>
    );
  };

  const CustomDropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <span
          onClick={() => setMenuIsOpen((prev) => !prev)} // Toggle menu open/close
          style={{
            cursor: "pointer",
            width: "20px",
            height: "30px",
            textAlign: "center",
          }}
        >
          ▼
        </span>
      </components.DropdownIndicator>
    );
  };

  return (
    <Box w="300px" minHeight={42}>
      <FormLabel color="white">{title}</FormLabel>
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        // onBlur={handleBlur}
        onFocus={handleFocus}
        menuIsOpen={menuIsOpen}
        placeholder={options[0]?.value || "Select brands"}
        closeMenuOnSelect={false}
        components={{
          Menu: CustomMenu,
          Option: CustomOption,
          DropdownIndicator: CustomDropdownIndicator,
        }}
      />
    </Box>
  );
};

export default MultiSelect;
