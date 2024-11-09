import React from "react";

const FiveDayForecast = ({ forecastData }) => {
  // Safe check for forecastData and forecastData.list
  if (!forecastData || !forecastData.list) {
    return <div>Loading forecast data...</div>;
  }

  // Function to format the date into a user-friendly format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
    }).format(date);
  };

  return (
    <div
      style={{
        backgroundColor: "#89ABE3FF",
        color: "white",
        borderRadius: "0.5rem",
        width: "200px",
        padding: "15px",
      }}
    >
      {/* Display the 5-day forecast, safe checking for available forecast data */}
      {forecastData.list.slice(0, 5).map((item, index) => (
        <div
          key={index}
          style={{
            marginBottom: "15px", // Reduced margin for better spacing
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Display temperature in Celsius with rounded values */}
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>
              {Math.round(item.main.temp)}°C
            </div>
            {/* Optional: Display weather icon */}
            {item.weather && item.weather[0]?.icon && (
              <img
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
                style={{ width: "30px", height: "30px" }}
              />
            )}
          </div>

          {/* Display the formatted date */}
          <div>
            <div style={{ fontSize: "15px", fontWeight: "bold" }}>
              {formatDate(item.dt_txt)}
            </div>
          </div>

          {/* Display weather description */}
          <div style={{ fontSize: "13px", fontWeight: "lighter" }}>
            {item.weather[0].description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FiveDayForecast;
