import { Box, FormLabel } from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import Select, { components } from "react-select";

// Options for the select dropdown
const MultiSelect = ({ handleValue, options, title, sent, setSent }: any) => {
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const selectRef = useRef<any>(null);

  sent && selectedOptions.length > 0
    ? setSelectedOptions([])
    : sent && selectedOptions.length === 0
    ? setSent(false)
    : null;
  // Handle change for multi-select
  const handleChange = (selected: any) => {
    setSelectedOptions(selected);
    const formattedValues = selected.map((x: any) => x.value).toString();
    if (title === "Descuento") {
      handleValue(2, formattedValues);
    } else {
      handleValue(4, formattedValues);
    }
  };

  const handleFocus = () => {
    setMenuIsOpen(true);
  };

  const handleBlur = () => {
    setMenuIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setMenuIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Custom Menu Component
  const CustomMenu = (props: any) => (
    <components.Menu {...props}>
      <div style={{ backgroundColor: "white", color: "black", padding: "0px" }}>
        {props.children}
      </div>
    </components.Menu>
  );

  // Custom Option Component
  const CustomOption = (props: any) => (
    <components.Option {...props} style={{ padding: "10px" }}>
      {props.data.label}
    </components.Option>
  );

  const CustomDropdownIndicator = (props: any) => (
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

  return (
    <Box minHeight={42} ref={selectRef}>
      <FormLabel color="white">{title}</FormLabel>
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        onBlur={handleBlur}
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
