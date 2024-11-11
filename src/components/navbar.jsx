import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import FilterDramaTwoToneIcon from "@mui/icons-material/FilterDramaTwoTone";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';


const Navbar = ({ onSearch, toggleUnit, onCurrentLocation, unit }) => {
  const [searchedCity, setSearchedCity] = useState("");

  // Handle input change
  const handleSearchInputChange = (e) => {
    setSearchedCity(e.target.value);
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchedCity.trim() !== "") {
      onSearch(searchedCity.trim());
      setSearchedCity(""); // Clear the input after searching
    }
  };

  // Handle Enter key press for search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    }
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 30px",
        backgroundColor: "#f7f7f7",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        flexWrap: "wrap",
      }}
    >
      {/* Logo Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <FilterDramaTwoToneIcon fontSize="large" />
        <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold" }}>
          Weather
        </h1>
      </div>

      {/* Search Input and Button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexGrow: 1,
          marginTop: "10px",
          marginLeft: "20px",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search city, e.g., 'Toronto'"
          size="small"
          value={searchedCity}
          onChange={handleSearchInputChange}
          onKeyDown={handleKeyDown}
          style={{
            width: "100%",
            maxWidth: "250px",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          inputProps={{
            maxLength: 50,
            "aria-label": "Search city input",
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchSubmit}
          disabled={!searchedCity.trim()} // Disable if input is empty
          style={{
            borderRadius: "5px",
            backgroundColor: searchedCity.trim() ? "#89ABE3FF" : "#bdc3c7",
            cursor: searchedCity.trim() ? "pointer" : "not-allowed",
            marginLeft: "10px",
            flexShrink: 0,
          }}
        >
          Search
        </Button>
      </div>

      {/* Button Group for Unit Toggle and Current Location */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginTop: "10px",
          justifyContent: "flex-end",
          flexGrow: 1,
          flexWrap: "wrap",
        }}
      >
        {/* Temperature Unit Toggle Button */}
        <button
          onClick={() => {
            toggleUnit();
          }}
          style={{
            backgroundColor: "#89ABE3FF",
            color: "white",
            padding: "10px 12px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            minWidth: "90px",
            marginBottom: "10px",
          }}
        >
          <DeviceThermostatIcon style={{ marginRight: "8px" }} />
          {unit === "metric" ? "°C" : "°F"}
        </button>

        {/* Current Location Button */}
        <button
          onClick={() => {
            onCurrentLocation();
          }}
          style={{
            backgroundColor: "#89ABE3FF",
            color: "white",
            padding: "10px 12px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            minWidth: "120px",
            marginBottom: "10px",
          }}
        >
          <GpsFixedIcon style={{ marginRight: "8px" }} />
          Current Location
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
