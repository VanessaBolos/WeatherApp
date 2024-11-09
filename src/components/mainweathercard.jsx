import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WbSunnyIcon from '@mui/icons-material/WbSunny'; // Hot weather icon
import AcUnitIcon from '@mui/icons-material/AcUnit'; // Cold weather icon
import CloudIcon from '@mui/icons-material/Cloud'; // Moderate weather icon

const MainWeatherCard = ({ weatherData }) => {

  const temperatureCelsius = Number(weatherData?.main?.temp) || "N/A"; // Ensure temperature is a number
  const weatherDescription = weatherData?.weather?.[0]?.description || "N/A";
  const cityName = weatherData?.name || "City not available";
  const countryName = weatherData?.sys?.country || "Country not available";
  const timestamp = weatherData?.dt || null;

  // Format current date if timestamp is available
  const currentDate = timestamp
    ? new Date(timestamp * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
      })
    : "Date not available";

  // Function to render the appropriate temperature icon
  const renderTemperatureIcon = () => {
    if (typeof temperatureCelsius === 'number') {
      if (temperatureCelsius > 23) {
        return <WbSunnyIcon style={{ marginLeft: '10px', fontSize: '3rem', color: 'orange' }} />;
      } else if (temperatureCelsius < 10) {
        return <AcUnitIcon style={{ marginLeft: '10px', fontSize: '3rem', color: 'blue' }} />;
      } else {
        return <CloudIcon style={{ marginLeft: '10px', fontSize: '3rem', color: 'gray' }} />;
      }
    }
    return null; // If temperature is "N/A", no icon
  };

  return (
    <div style={{ backgroundColor: '#89ABE3FF', color: 'white', borderRadius: '0.5rem', width: '300px', padding: '20px' }}>
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Now</div>
      <div style={{ display: 'flex', alignItems: 'center', fontSize: '35px', fontWeight: 'bold' }}>
        {temperatureCelsius !== "N/A" ? `${temperatureCelsius}°C` : "N/A"}
        {renderTemperatureIcon()}
      </div>
      <div style={{ fontSize: '15px', marginTop: '8px', fontWeight: '500' }}>
        {weatherDescription !== "N/A" ? weatherDescription : "Description not available"}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CalendarMonthIcon />
          <span style={{ marginLeft: '5px' }}>{currentDate}</span>
        </div>
        <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center' }}>
          <LocationOnIcon />
          <span style={{ marginLeft: '5px' }}>
            {cityName}, {countryName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MainWeatherCard;
