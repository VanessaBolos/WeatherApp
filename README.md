# A Simple Weather App
### It should look something like this:
![weatherapp Screenshot](./src/assets/images/weatherss.jpg)

## To start running project locally:
Download Node.Js from nodejs.org 
Clone the repository to your local machine. `https://github.com/VanessaBolos/WeatherApp.git`

Dependencies:
Run `npm i` to install all needed dependencies and `npm i axios` , `npm install react-toastify` to install axios and react-toastify respectively.

Install Material UI. `npm install @mui/icons-material @mui/material @emotion/styled @emotion/react`

Register for openweathermap.org and https://app.ipgeolocation.io/ to get your own API_KEYs.

Create a .env file and input this:
`VITE_OPENWEATHER_API_KEY=your_openweather_api_key
 VITE_TIME_API_KEY=your_timezone_api_key`
Replace with your own API_KEYs!

Run the project by executing `npm run dev` in your terminal.

Visit the project your browser at: http://localhost:5173

Input your desired city in the searchbar to see their current weather and time!

### Author's notes:

Wins:

Here are some components that are successfully integrated in the app:

A `MainWeatherCard` that displays the main weather info such as current temp, weather description, location and time. it fetches and formats city time based on latitude and longitude using IPGeolocation API. Also displays current temperature with unit conversion (Celsius/Fahrenheit)

A `navbar` component with props such as:
`onSearch`: a callback function triggered when user submits a city search
`toggleUnit`: a callback function to switch between metric (celsius) and imperial (fahrenheit) units
`onCurrentLocation`: a callback function to get weather data based on user's current geolocation

A `five day forecast` component that displays the next 5 days' weather forecast, including temperature, weather icon, date and description.

A `highlight box component`- display weather-related highlights(e.g humidity, pressure)
It uses prop types for type checking and conditionally renders an icon.

A `today's highlights` component: display's today's weather highlights such as air quality, temp, humidity, pressure, visibility and sunrise/sunset times. Incorporates AirIcon, WbSunnyIcon, NightsStayIcon and other MUI icons.


Difficulties:
The toggling of the temperature units proved to be a bit difficult. I had to troubleshoot a lot with the inaccurate conversions to Celsius -> Fahrenheit and vice versa. 

I also had to figure out how to get the current location of the user and fetch the weather data.

The CSS part took me a while since it has been so long and had to take a refresher. Tried to do style inline this time. Still struggling to have a better response when switching screen sizes.
