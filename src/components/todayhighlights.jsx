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
            <div style={styles.titleIconContainer}>
              <p style={styles.headerTitle}>Air Quality Index</p>
              <AirIcon style={styles.icon} />
            </div>
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
            <p style={styles.headerTitle}>Sunrise and Sunset</p>
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
    color: "white",
    width: "70%",
    borderRadius: "0.5rem",
    padding: "20px",
    maxWidth: "100%",
    paddingTop: "20px",  // Add some padding to the top to ensure it doesn't touch the navbar
  },
  title: { fontSize: "30px", fontWeight: "bold" },
  row: {
    display: "flex",
    gap: "18px",
    paddingTop: "20px",
    flex: 1,  // Make sure the row uses the available space
  },
  leftCard: {
    backgroundColor: "#98989c",
    padding: "2rem",
    borderRadius: "0.5rem",
    width: "100%", // Makes the card responsive and adjusts based on available space
    maxWidth: "700px", // Set a maximum width to keep it manageable
  },
  rightCard: {
    backgroundColor: "#98989c",
    padding: "2rem",
    borderRadius: "0.5rem",
    width: "100%",
    maxWidth: "700px",
  },
  headerTitle: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "8px",
  },
  titleIconContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  airQualityStatus: {
    fontSize: "30px",
    fontWeight: "700",
    height: "30px",
    width: "100px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  airQualityDetails: { display: "flex", flexDirection: "column" },
  grid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" },
  sunTimeContainer: { display: "flex", justifyContent: "space-between", padding: "20px" },
  timeContainer: { display: "flex", alignItems: "center", gap: "10px", },
  sunIcon: { fontSize: "50px" },
  time: { fontSize: "40px" },
  highlightsContainer: { 
    display: "flex", 
    gap: "20px", 
    marginTop: "5px",
    overflowX: "auto",
    flexWrap: "wrap", // Allow items to wrap when space is tight
  },
  bold: { fontWeight: "bold" },
};

export default TodayHighlights;
