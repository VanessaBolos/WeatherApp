import React, { useMemo } from "react";
import AirIcon from "@mui/icons-material/Air";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import HighlightBox from "../../src/components/Highlightbox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CompressIcon from "@mui/icons-material/Compress";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

// Helper function to format AQI and time
const formatTime = (timestamp) => {
  if (!timestamp) return "N/A";
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const TodayHighlights = ({ weatherData, airQualityData }) => {
  const { main, wind, visibility, sys } = weatherData || {};
  const airQualityIndex = airQualityData?.main?.aqi;
  const { co, no, no2, o3 } = airQualityData?.components || {};

  // Function to render air quality description based on AQI
  const renderAirQualityDescription = useMemo(() => {
    switch (airQualityIndex) {
      case 1: return "Good";
      case 2: return "Fair";
      case 3: return "Moderate";
      case 4: return "Poor";
      case 5: return "Very Poor";
      default: return "Unknown";
    }
  }, [airQualityIndex]);

  // Dynamic color based on AQI level
  const getAirQualityColor = (aqi) => {
    switch (aqi) {
      case 1: return "green";
      case 2: return "lightgreen";
      case 3: return "yellow";
      case 4: return "orange";
      case 5: return "red";
      default: return "grey";
    }
  };

  const highlights = [
    { title: "Humidity", value: `${main?.humidity ?? "N/A"}%`, Icon: InvertColorsIcon },
    { title: "Pressure", value: `${main?.pressure ?? "N/A"} hPa`, Icon: CompressIcon },
    { title: "Visibility", value: `${visibility ? (visibility / 1000).toFixed(1) : "N/A"} km`, Icon: VisibilityIcon },
    { title: "Feels Like", value: `${main?.feels_like ? Math.round(main.feels_like) : "N/A"}°`, Icon: DeviceThermostatIcon },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.title}>Today's Highlights</div>
      <div style={styles.row}>
        <div style={styles.leftCard}>
          <div style={styles.cardHeader}>
            <p>Air Quality Index</p>
            <div
              style={{
                ...styles.airQualityStatus,
                backgroundColor: getAirQualityColor(airQualityIndex),
              }}
            >
              {renderAirQualityDescription}
            </div>
          </div>
          <div style={styles.airQualityDetails}>
            <AirIcon style={styles.icon} />
            <div style={styles.grid}>
              <div>
                <p style={styles.bold}>CO</p>
                <p>{co ?? "N/A"} µg/m³</p>
              </div>
              <div>
                <p style={styles.bold}>NO</p>
                <p>{no ?? "N/A"} µg/m³</p>
              </div>
              <div>
                <p style={styles.bold}>NO₂</p>
                <p>{no2 ?? "N/A"} µg/m³</p>
              </div>
              <div>
                <p style={styles.bold}>O₃</p>
                <p>{o3 ?? "N/A"} µg/m³</p>
              </div>
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

const styles = {
  container: {
    backgroundColor: "#89ABE3FF",
    color: "black",
    width: "90%",
    borderRadius: "0.5rem",
    padding: "20px",
    margin: "auto",
    maxWidth: "100%",
  },
  title: { fontSize: "20px", fontWeight: "bold" },
  row: { display: "flex", gap: "18px", paddingTop:"10px" },
  leftCard: {
    backgroundColor: "#FCF6F5FF",
    padding: "1rem",
    borderRadius: "0.5rem",
    width: "370px",
  },
  rightCard: {
    backgroundColor: "#FCF6F5FF",
    padding: "1rem",
    borderRadius: "0.5rem",
    width: "385px",
  },
  airQualityStatus: {
    fontSize: "16px",
    fontWeight: "700",
    height: "20px",
    width: "70px",
    borderRadius: "6px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  airQualityDetails: { display: "flex", flexDirection: "column" },
  grid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" },
  sunTimeContainer: { display: "flex", justifyContent: "space-between", padding: "10px" },
  timeContainer: { display: "flex", alignItems: "center" },
  sunIcon: { fontSize: "40px" },
  time: { fontSize: "25px" },
  highlightsContainer: { display: "flex", gap: "4px", marginTop: "10px" },
  bold: { fontWeight: "bold" },
};

export default TodayHighlights;
