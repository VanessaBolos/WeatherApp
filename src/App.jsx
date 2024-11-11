import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import MainWeatherCard from "../src/components/mainweathercard";
import FiveDayForecast from "../src/components/fiveday";
import TodayHighlights from "../src/components/todayhighlights";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// WeatherDashboard component
const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Vancouver");
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [cityTime, setCityTime] = useState(null);

  // Function to show a toast notification
  const showToast = (message) => {
    toast.info(message, {
      position: "top-center",
      autoClose: 3000, // 3 seconds
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
    });
  };

  // Function to toggle temperature unit
  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
    showToast(`Switched to ${unit === "metric" ? "Fahrenheit" : "Celsius"}`);
  };

  // Fetch data when city or unit changes
  useEffect(() => {
    if (city) {
      fetchWeatherAndForecastData(city);
      fetchCityTime(city);
    }
  }, [city, unit]);

  // Fetch city time using timezone API
  const fetchCityTime = (city) => {
    const API_KEY = import.meta.env.VITE_TIME_API_KEY;
    axios
      .get(`https://api.timezonedb.com/v2.1/get-time-zone?key=${API_KEY}&format=json&by=city&city=${city}`)
      .then((response) => setCityTime(response.data.formatted))
      .catch((error) => {
        console.error("Error fetching city time:", error);
        setCityTime("Time not available");
      });
  };

  // Function to handle user search
  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
    showToast(`Searching weather for ${searchedCity}`);
  };

  // Function to handle current location button click
  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      showToast("Fetching current location...");
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => fetchWeatherDataForCoords(latitude, longitude),
        (error) => {
          console.error("Geolocation error:", error);
          showToast("Unable to fetch current location.");
        }
      );
    } else {
      showToast("Geolocation is not supported by this browser.");
    }
  };

  // Fetch weather, air quality, and forecast data
  const fetchWeatherAndForecastData = async (city) => {
    setLoading(true);
    setError(null);
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

    try {
      const [weatherRes, forecastRes] = await Promise.all([
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`),
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`)
      ]);

      const { lat, lon } = weatherRes.data.coord;
      const airQualityRes = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);

      setWeatherData(weatherRes.data);
      setFiveDayForecast(forecastRes.data);
      setAirQualityData(airQualityRes.data.list[0]);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch weather data using coordinates
  const fetchWeatherDataForCoords = async (lat, lon) => {
    setLoading(true);
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

    try {
      const [weatherRes, forecastRes] = await Promise.all([
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`),
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`)
      ]);

      const airQualityRes = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);

      setWeatherData(weatherRes.data);
      setFiveDayForecast(forecastRes.data);
      setAirQualityData(airQualityRes.data.list[0]);
    } catch (error) {
      console.error("Error fetching data for current location:", error);
      setError("Failed to fetch current location weather data.");
      showToast("Error fetching current location data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundColor: "#ecf0f1",
      color: "black",
      display: "flex",
      flexDirection: "column",
      height: "100vh", // Full height of the screen
      padding: "0",
      overflow: "hidden",
    }}>
      <Navbar onSearch={handleSearch} toggleUnit={toggleUnit} onCurrentLocation={handleCurrentLocationClick} unit={unit} />
      <ToastContainer />
      
      {loading && <div className="spinner">Loading...</div>}
      {error && <p style={{ color: "red" }}>{error}</p>}
  
      {weatherData && airQualityData && (
        <div style={{
          display: "flex",
          flexDirection: "column", // Stack content vertically
          padding: "0 30px",
          gap: "20px",
          flex: "1", // Let the container take full available height
          justifyContent: "flex-start", // Align items at the top, making the height even
          paddingTop: "10px",
        }}>
          {/* Container for MainWeatherCard and TodayHighlights side by side */}
          <div style={{
            display: "flex",
            flex: "1",
            gap: "20px",
            justifyContent: "space-between",
            alignItems: "flex-start", // Ensures equal height between the cards
          }}>
            <MainWeatherCard weatherData={weatherData} unit={unit} />
            <TodayHighlights weatherData={weatherData} airQualityData={airQualityData} />
          </div>
  
          {/* 5-day forecast at the bottom */}
          {fiveDayForecast && <FiveDayForecast forecastData={fiveDayForecast} />}
        </div>
      )}
    </div>
  );
  
};

export default WeatherDashboard;
