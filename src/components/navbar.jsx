import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import FilterDramaTwoToneIcon from "@mui/icons-material/FilterDramaTwoTone";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";

const Navbar = ({ onSearch, onCurrentLocation }) => {
  const [searchCity, setSearchCity] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Handle search field change
  const handleSearchChange = (e) => {
    const city = e.target.value;
    setSearchCity(city);
    setIsButtonDisabled(city.trim().length === 0);
  };

  // Handle search button click
  const handleSearchClick = () => {
    if (searchCity.trim()) {
      onSearch(searchCity);
      setSearchCity(""); // Clear the input field after search
      setIsButtonDisabled(true); // Disable the button after search
    }
  };

  // Trigger search on "Enter" key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isButtonDisabled) {
      handleSearchClick();
    }
  };

  // Handle current location click
  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onCurrentLocation(latitude, longitude); // Pass coordinates to parent component
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          alert("Unable to fetch current location. Please try again.");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      alert("Geolocation is not supported by this browser.");
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
      }}
    >
      {/* Logo Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <FilterDramaTwoToneIcon fontSize="large" />
        <h1 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "bold" }}>Weather</h1>
      </div>

      {/* Search Input and Button */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <TextField
          variant="outlined"
          placeholder="Search city, e.g., 'Toronto'"
          size="small"
          value={searchCity}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          style={{ width: "250px" }}
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
          onClick={handleSearchClick}
          disabled={isButtonDisabled}
          style={{ borderRadius: "5px", backgroundColor: "#1976d2" }}
        >
          Search
        </Button>
      </div>

      {/* Current Location Button */}
      <Button
        variant="outlined"
        startIcon={<GpsFixedIcon />}
        onClick={handleCurrentLocationClick}
        style={{
          borderRadius: "5px",
          color: "#1976d2",
          borderColor: "#1976d2",
        }}
      >
        Current Location
      </Button>
    </nav>
  );
};

export default Navbar;
