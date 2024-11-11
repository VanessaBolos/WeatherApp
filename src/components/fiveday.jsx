import React from "react";

const FiveDayForecast = ({ forecastData }) => {
  // Safe check for forecastData and forecastData.list
  if (!forecastData || !forecastData.list) {
    return <div>Loading forecast data...</div>;
  }

  // Function to format the date into a user-friendly format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(navigator.language, {
      day: "2-digit",
      month: "short",
    }).format(date);
  };
  

  // Function to group data by day (first data point per day)
  const getDailyForecasts = () => {
    const dailyForecasts = [];
    let currentDay = null;

    forecastData.list.forEach((item) => {
      const forecastDate = new Date(item.dt_txt).toLocaleDateString();
      // If the day is different from the last added forecast, add it
      if (forecastDate !== currentDay) {
        dailyForecasts.push(item);
        currentDay = forecastDate;
      }
    });

    return dailyForecasts.slice(0, 5); // Get only the first 5 days
  };

  const dailyForecasts = getDailyForecasts();

  return (
    <div
      style={{
        backgroundColor: "#89ABE3FF",
        color: "white",
        borderRadius: "0.5rem",
        display: "flex", // Use flexbox for horizontal layout
        justifyContent: "space-around", // Spread out items evenly
        padding: "20px",
        overflowX: "auto", // Allow horizontal scrolling if needed
      }}
    >
      {/* Display the 5-day forecast */}
      {dailyForecasts.map((item, index) => (
        <div
          key={index}
          style={{
            margin: "10px", // Add margin for spacing
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: "0 0 auto", // Prevent items from shrinking
            width: "120px", // Control the width of each forecast card
          }}
        >
          <div style={{ fontSize: "30px", fontWeight: "bold" }}>
            {Math.round(item.main.temp)}° 
          </div>
          {/* Optional: Display weather icon */}
          {item.weather && item.weather[0]?.icon && (
            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
              style={{ width: "50px", height: "50px" }} // Icon size
            />
          )}
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>
            {formatDate(item.dt_txt)} {/* Display the formatted date */}
          </div>
          <div style={{ fontSize: "14px", fontWeight: "lighter" }}>
            {item.weather[0].description} {/* Weather description */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FiveDayForecast;
