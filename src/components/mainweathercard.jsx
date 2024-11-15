import React, { useEffect, useState, useMemo } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import CloudIcon from '@mui/icons-material/Cloud';
import axios from 'axios';

const MainWeatherCard = ({ weatherData, unit }) => {
  const [cityTime, setCityTime] = useState("");
  const [timezone, setTimezone] = useState(null);
  const [temperature, setTemperature] = useState(null);

  const API_KEY = import.meta.env.VITE_TIME_API_KEY;

  // Get temperature from the API (assumed to be in Kelvin or Fahrenheit for imperial, Celsius for metric)
  const temperatureFromAPI = weatherData?.main?.temp || null;
  const weatherDescription = weatherData?.weather?.[0]?.description || "N/A";
  const cityName = weatherData?.name || "City not available";
  const countryName = weatherData?.sys?.country || "Country not available";
  const timestamp = weatherData?.dt || null;
  const iconCode = weatherData?.weather?.[0]?.icon || null; // Icon code from weather API

  // Convert Fahrenheit to Celsius
  const convertToCelsius = (tempFahrenheit) => {
    return (tempFahrenheit - 32) * (5 / 9);
  };

  // Convert Celsius to Fahrenheit
  const convertToFahrenheit = (tempCelsius) => {
    return (tempCelsius * 9 / 5) + 32;
  };

  // UseEffect to update the temperature based on the unit
  useEffect(() => {
    if (temperatureFromAPI !== null) {
      let newTemperature;

      if (unit === "imperial") {
        if (weatherData?.main?.temp_min) {
          if (weatherData.main.temp === temperatureFromAPI) {
            newTemperature = temperatureFromAPI; // It's already in Fahrenheit, so no need to convert.
          } else {
            newTemperature = convertToFahrenheit(temperatureFromAPI);
          }
        }
      } else if (unit === "metric") {
        newTemperature = temperatureFromAPI; // It's already in Celsius, so no need to convert.
      }

      console.log("Updated Temperature:", newTemperature); // Debugging line
      setTemperature(newTemperature);
    }
  }, [unit, temperatureFromAPI, weatherData]);

  // Render temperature in the selected unit
  const renderTemperature = () => {
    if (temperature !== null) {
      if (unit === "imperial") {
        return `${temperature.toFixed(1)}°F`; // Render Fahrenheit
      } else if (unit === "metric") {
        return `${temperature.toFixed(1)}°C`; // Render Celsius
      }
    }
    return "N/A";
  };

  // Fetch city time based on latitude and longitude
  const getTimeForCity = async (lat, lon) => {
    try {
      const res = await axios.get(`https://api.ipgeolocation.io/timezone?apiKey=${API_KEY}&lat=${lat}&long=${lon}`);
      setTimezone(res.data.timezone);
      const localTime = new Date(res.data.date_time).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
      setCityTime(localTime);
    } catch (error) {
      console.error("Failed to fetch time data", error);
      setCityTime("Time not available");
    }
  };

  // Trigger fetching time when `weatherData` changes and contains valid latitude/longitude
  useEffect(() => {
    if (weatherData && weatherData.coord) {
      getTimeForCity(weatherData.coord.lat, weatherData.coord.lon);
    }
  }, [weatherData]);

  // Formatting current date based on timestamp
  const currentDate = useMemo(() => {
    return timestamp
      ? new Date(timestamp * 1000).toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "short",
        })
      : "Date not available";
  }, [timestamp]);

  // Display appropriate icon based on temperature
  const renderTemperatureIcon = () => {
    if (temperature !== null) {
      if (temperature > 23) {
        return <WbSunnyIcon style={{ fontSize: '3rem', color: 'orange' }} />;
      } else if (temperature < 5) {
        return <AcUnitIcon style={{ fontSize: '3rem', color: 'white' }} />;
      } else {
        return <CloudIcon style={{ fontSize: '3rem', color: 'white' }} />;
      }
    }
    return null;
  };

  return (
    <div style={{ 
      backgroundColor: '#89ABE3FF', 
      color: '#fff', 
      borderRadius: '0.5rem', 
      width: '100%',
      maxWidth: '400px',
      padding: '20px',
      height: '550px',
      boxSizing:'border-box' }}>
      
      <div style={{ fontSize: '30px', fontWeight: 'bold' }}>Now</div>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        fontSize: '50px', 
        fontWeight: 'bold',
        justifyContent: 'space-between' }}>
        
        {renderTemperature()} {/* Render temperature */}        
        {renderTemperatureIcon()} {/* Render appropriate temperature icon */}
        
      </div>
      {iconCode && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <img
            src={`http://openweathermap.org/img/wn/${iconCode}@4x.png`}
            alt={weatherDescription}
            style={{ width: '200px', height: '200px' }} // Make the icon large
          />
        </div>
      )}
      <div style={{ fontSize: '20px', marginTop: '8px', fontWeight: '500' }}>
        {weatherDescription !== "N/A" ? weatherDescription : "Description not available"}
      </div>
      
      <div style={{ marginTop: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CalendarMonthIcon />
          <span style={{ marginLeft: '10px' }}>{currentDate}</span>
        </div>
        
        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
          <LocationOnIcon />
          <span style={{ marginLeft: '5px' }}>
            {cityName}, {countryName}
          </span>
        </div>
        
        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
          <span style={{ marginLeft: '5px', fontSize: '25px', fontStyle: 'italic' }}>
            {timezone ? `Current Time (${timezone}):` : "Loading Time..."} {cityTime || "Loading..."}
          </span>
        </div>
      </div>

      {/* Weather icon at the bottom of the card */}
      
    </div>
  );
};

export default MainWeatherCard;
