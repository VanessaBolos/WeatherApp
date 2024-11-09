import React, { useState,useEffect } from "react";
import Navbar from "./components/navbar";
import MainWeatherCard from "../src/components/mainweathercard";
import FiveDayForecast from "../src/components/fiveday";
import TodayHighlights from "../src/components/todayhighlights";

import axios from "axios";

//WeatherDashboard component
const WeatherDashboard = () => {

  //state hooks for weather,city,air quality, and 5-day forecast daata
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Vancouver'); // Default city is set to Vancouver
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state for better UX
  const [error, setError] = useState(null); // Added error state to handle errors gracefully

    // Fetch the weather data whenever the city changes
  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
    }
  }, [city]);

  // Function to fetch air quality data
  const fetchAirQualityData = (lat, lon) => {
    const API_KEY = '1d46fcb23caf7334c7ef0c95034f4dbf'; // Replace with your OpenWeatherMap API key
    axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then(response => {
        setAirQualityData(response.data.list[0]); // Set air quality data
      })
      .catch(error => {
        console.error('Error fetching the air quality data:', error);
        setError("Error fetching air quality data");
      });
  };
  // Function to fetch the weather data
  const fetchWeatherData = (city) => {
    setLoading(true); // Set loading to true when fetching data
    setError(null); // Reset error state before new request
    const API_KEY = '1d46fcb23caf7334c7ef0c95034f4dbf'; // Replace with your OpenWeatherMap API key
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data); // Set weather data
        fetchAirQualityData(data.coord.lat, data.coord.lon); // Fetch air quality data using coordinates from weather data
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`)
          .then(response => {
            setFiveDayForecast(response.data); // Set 5-day forecast data
            setLoading(false); // Set loading to false after data is fetched
          })
          .catch(error => {
            console.error('Error fetching the 5-day forecast data:', error);
            setError("Error fetching forecast data");
            setLoading(false); // Set loading to false if error occurs
          });
      })
      .catch(error => {
        console.error('Error fetching the weather data:', error);
        setError("Error fetching weather data");
        setLoading(false); // Set loading to false if error occurs
      });
  };

  // Function to handle search input (change city)
  const handleSearch = (searchedCity) => {
    setCity(searchedCity); // Update city state based on user search
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} /> {/* Navbar with search functionality */}
      {loading && <p>Loading...</p>} {/* Display loading message */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if there's an error */}
      {weatherData && airQualityData &&  (
        <div style={{ display: "flex", padding: "30px", gap: "20px" }}>
          <div style={{ flex: "1", marginRight: "10px" }}>
            <MainWeatherCard weatherData={weatherData} /> {/* Main weather card displaying current weather */}
            <p style={{ fontWeight: "700", fontSize: "20px", marginTop: "20px" }}>5 Days Forecast</p>
            {fiveDayForecast && <FiveDayForecast forecastData={fiveDayForecast} />} {/* Display 5-day forecast if data is available */}
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: "0.5", gap: "20px" }}>
            <TodayHighlights weatherData={weatherData} airQualityData={airQualityData}  /> {/* Display today’s highlights */}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;