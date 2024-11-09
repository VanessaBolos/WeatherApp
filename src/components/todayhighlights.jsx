import React from "react";
import AirIcon from "@mui/icons-material/Air";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import HighlightBox from "../../src/components/Highlightbox";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CompressIcon from '@mui/icons-material/Compress';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';

const TodayHighlights = ({ weatherData, airQualityData }) => {
  const { main, wind, visibility, sys } = weatherData || {};
  const airQualityIndex = airQualityData?.main?.aqi; // Safe check for undefined air quality data
  const { co, no, no2, o3 } = airQualityData?.components || {};

  // Function to render air quality description based on AQI
  const renderAirQualityDescription = (aqi) => {
    switch (aqi) {
      case 1: return "Good";
      case 2: return "Fair";
      case 3: return "Moderate";
      case 4: return "Poor";
      case 5: return "Very Poor";
      default: return "Unknown";
    }
  };

  // Highlights data for easy reuse and better structure
  const highlights = [
    { title: "Humidity", value: `${main?.humidity}%`, Icon: InvertColorsIcon },
    { title: "Pressure", value: `${main?.pressure} hPa`, Icon: CompressIcon },
    { title: "Visibility", value: `${visibility / 1000} km`, Icon: VisibilityIcon },
    { title: "Feels Like", value: `${main?.feels_like}°C`, Icon: DeviceThermostatIcon },
  ];

  // Function to format the time in HH:mm AM/PM format
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>Today's Highlights</div>
      <div style={styles.row}>
        <div style={styles.leftCard}>
          <div style={styles.cardHeader}>
            <p>Air Quality Index</p>
            <div style={styles.airQualityStatus}>
              {renderAirQualityDescription(airQualityIndex)}
            </div>
          </div>
          <div style={styles.airQualityDetails}>
            <AirIcon style={styles.icon} />
            <div style={styles.grid}>
              <div><p style={styles.bold}>CO</p><p>{co} µg/m³</p></div>
              <div><p style={styles.bold}>NO</p><p>{no} µg/m³</p></div>
              <div><p style={styles.bold}>NO₂</p><p>{no2} µg/m³</p></div>
              <div><p style={styles.bold}>O₃</p><p>{o3} µg/m³</p></div>
            </div>
          </div>
        </div>

        <div style={styles.rightCard}>
          <div style={styles.cardHeader}>
            <p>Sunrise and Sunset</p>
            <div style={styles.sunTimeContainer}>
              <div style={styles.timeContainer}>
                <WbSunnyIcon style={styles.sunIcon} />
                <p style={styles.time}>{formatTime(sys?.sunrise)}</p>
              </div>
              <div style={styles.timeContainer}>
                <NightsStayIcon style={styles.sunIcon} />
                <p style={styles.time}>{formatTime(sys?.sunset)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.highlightsContainer}>
        {highlights.map((highlight, index) => (
          <HighlightBox
            key={index}
            title={highlight.title}
            value={highlight.value}
            Icon={highlight.Icon}
          />
        ))}
      </div>
    </div>
  );
};

// Styles to clean up the JSX and make it more readable
const styles = {
  container: {
    backgroundColor: "#89ABE3FF",
    color: "white",
    width: "840px",
    borderRadius: "0.5rem",
    padding: "30px",
  },
  title: { fontSize: "20px" },
  row: { display: "flex", gap: "18px" },
  leftCard: {
    backgroundColor: "#FCF6F5FF",
    color: "black",
    padding: "1rem",
    borderRadius: "0.5rem",
    marginTop: "11px",
    width: "370px",
  },
  rightCard: {
    backgroundColor: "#FCF6F5FF",
    color: "black",
    padding: "1rem",
    borderRadius: "0.5rem",
    marginTop: "11px",
    width: "385px",
  },
  cardHeader: { display: "flex", justifyContent: "space-between", fontSize: "22px" },
  airQualityStatus: {
    marginTop: "1rem",
    fontSize: "16px",
    fontWeight: "700",
    backgroundColor: "green",
    height: "20px",
    width: "45px",
    borderRadius: "6px",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  airQualityDetails: { display: "flex", flexDirection: "column" },
  grid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" },
  icon: { fontSize: "35px" },
  bold: { fontWeight: "bold" },
  sunTimeContainer: { display: "flex", justifyContent: "space-between", padding: "10px" },
  timeContainer: { display: "flex", alignItems: "center" },
  sunIcon: { fontSize: "40px" },
  time: { fontSize: "25px" },
  highlightsContainer: { display: "flex", gap: "4px", marginTop: "10px" },
};

export default TodayHighlights;
