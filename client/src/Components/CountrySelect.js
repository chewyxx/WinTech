import React, { useEffect, useState } from "react";
import Select from "react-select";
const countryList = require('country-list');

const customStyles = {
    menu: (base) => ({
        ...base,
        width: "max-content",
        minWidth: "100%"
    }),
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? "#000000" : "#000000",
      backgroundColor: state.isSelected ? "#C9E0E7" : "#fff",
      fontSize: '1.5rem'
    }),

    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "#C9E0E7",
      padding: "10px",
      border: "none",
      boxShadow: "none",
      fontSize: '1.5rem',
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#000000" }),
  };

export default function CountrySelect({ onChange }) {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});

  useEffect(() => {
    const fetchCountries = async () => {
      const countryNames = countryList.getNames();
      const countryOptions = countryNames.map((name) => ({ value: name, label: name }));
      setCountries(countryOptions);
      setSelectedCountry(countryOptions[0]); // Set default selected country
    };

    fetchCountries();
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedCountry(selectedOption); // Update selected country in state
    onChange(selectedOption); // Pass selected country directly to the parent component
  };

  return (
    <Select
      styles={customStyles}
      options={countries}
      value={selectedCountry}
      onChange={handleChange}
    />    
  );
}