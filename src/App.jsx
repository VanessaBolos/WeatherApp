import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import MainWeatherCard from "../src/components/mainweathercard";
import FiveDayForecast from "../src/components/fiveday";
import TodayHighlights from "../src/components/todayhighlights";
import axios from "axios";

// WeatherDashboard component
const WeatherDashboard = () => {
  // Helper function to convert temperature units
const convertTemperature = (temp, unit) => {
  if (unit === 'imperial') {
    return (temp * 9/5) + 32;  // Convert Celsius to Fahrenheit
  }
  return temp;  // If it's metric, return Celsius as is
};

  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Vancouver'); // Default city is set to Vancouver
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state for better UX
  const [error, setError] = useState(null); // Added error state to handle errors gracefully
  const [unit, setUnit] = useState('metric'); // Default to Celsius (metric)
  const [cityTime, setCityTime] = useState(null); // Current city time state

  // Function to toggle the unit between metric (Celsius) and imperial (Fahrenheit)
  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  // Fetch the weather data whenever the city changes
  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
      fetchCityTime(city); // Fetch city time
    }
  }, [city, unit]); // Fetch data on city or unit change

  // Fetch the current city time (using a timezone API)
  const fetchCityTime = (city) => {
    const API_KEY = 'K8EH7KOFAWV1'; // Replace with a valid API key
    axios.get(`https://api.timezonedb.com/v2.1/get-time-zone?key=${API_KEY}&format=json&by=city&city=${city}`)
      .then(response => {
        const time = response.data.formatted;
        setCityTime(time);
      })
      .catch(error => {
        console.error('Error fetching the city time:', error);
        setCityTime("Time not available");
      });
  };

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
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data); // Set weather data
        fetchAirQualityData(data.coord.lat, data.coord.lon); // Fetch air quality data using coordinates from weather data
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`)
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

  // Function to handle current location button click
  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherDataForCoords(latitude, longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          alert("Unable to fetch current location. Please try again.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Fetch weather for current location using coordinates
  const fetchWeatherDataForCoords = (lat, lon) => {
    setLoading(true);
    const API_KEY = '1d46fcb23caf7334c7ef0c95034f4dbf'; // Replace with your OpenWeatherMap API key
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
        fetchAirQualityData(data.coord.lat, data.coord.lon);
      })
      .catch(error => {
        console.error('Error fetching current location weather data:', error);
        setError("Error fetching current location data");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ backgroundColor: "#ecf0f1", color: "black" }}> 
      <Navbar
        onSearch={handleSearch}
        toggleUnit={toggleUnit}
        onCurrentLocation={handleCurrentLocationClick}
        unit={unit}
      />
      {loading && <p>Loading...</p>} {/* Display loading message */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if there's an error */}
      {weatherData && airQualityData && (
        <div style={{ display: "flex", padding: "30px", gap: "20px" }}>
          <div style={{ flex: "1", marginRight: "10px" }}>
            <MainWeatherCard weatherData={weatherData} unit={unit} />
            <p style={{ fontWeight: "700", fontSize: "20px", marginTop: "20px" }}>5 Days Forecast</p>
            {fiveDayForecast && <FiveDayForecast forecastData={fiveDayForecast} />}
          </div>
          <div style={{ display: "flex", flexDirection: "column", flex: "0.5", gap: "20px" }}>
            <TodayHighlights weatherData={weatherData} airQualityData={airQualityData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
