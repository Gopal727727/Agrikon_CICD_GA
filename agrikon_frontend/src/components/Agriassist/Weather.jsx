import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import "../../css/Weather.css";
import axios from 'axios';

import Banner from "./Banner";
import WeatherForecast from "./WeatherForecast";
import WeatherToday from "./WeatherToday";
import WeatherTomorrow from "./WeatherTomorow";
import WeatherYesterday from "./WeatherYesterday";

const Weather = () => {
  const [city, setCity] = useState(""); // Manage city directly
  const [showForecast, setShowForecast] = useState(true); // Initially show the forecast
  const [currentWeather, setCurrentWeather] = useState("5Days"); // Default to '5Days'
  const [Long, setLong] = useState("");
  const [Lat, setLat] = useState("");
  const [err, setErr] = useState("");
  const [forecastData, setForecastData] = useState(null);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        },
        (error) => {
          setErr(`Error getting location: ${error.message}`);
        }
      );
    } else {
      setErr("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!Lat || !Long) return; // Only fetch if Lat and Long are available

      const API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${Lat}&lon=${Long}&appid=${API_KEY}&units=metric`;

      try {
        const response = await axios.get(API_URL);
        const data = response.data;
        setCity(data.city.name);
        setForecastData(data);
      } catch (error) {
        setErr("Failed to fetch weather data.");
      }
    };

    fetchWeather();
  }, [Lat, Long, API_KEY]);

  // Handle pressing Enter in the search input (updates city)
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setCity(e.target.value); // Set city when Enter is pressed
    }
  };

  // Handle button clicks to set which weather component to display
  const handleWeatherClick = (weatherType) => {
    setCurrentWeather(weatherType); // Set the current weather type to render the appropriate component
    if (weatherType === "5Days") {
      setShowForecast(true); // Show the forecast when "5 Days Weather" button is clicked
    } else {
      setShowForecast(false); // Hide forecast if other buttons are clicked
    }
  };

  return (
    <div className="weather-forecast" style={{ backgroundColor: "#f0f8ff" }}>
      {/* Header Section */}
      <Banner heading="Agri Assit" />
      {/* Weather Forecast Section */}
      <div className="container py-4">
        <h2 className="text-center fw-bold">Weather Forecast</h2>

        {/* Current Weather */}
        <div className="container">
          <div className="row justify-content-center">
            <div className="card col-md-7 mx-auto position-relative">
              <div className="card-body">
                {forecastData !== null ? (
                  <div>
                    <img
                      src={`http://openweathermap.org/img/wn/${forecastData.list[0].weather[0].icon}@2x.png`}
                      alt="weather icon"
                      style={{ width: '40px', height: '40px' }}
                    />
                    <b>Currently: {forecastData.list[0].main.temp}&#176;C, {forecastData.list[0].weather[0].description}, (Weather Station:{forecastData.city.name})</b>
                  </div>
                ) : (
                  <b>Loading weather, please enable your location...</b>
                )}
              </div>
              <div className="position-absolute" style={{ bottom: "0px", right: "10px" }}>
                <a href="#" className="text-primary">See more Current Weather</a>
              </div>
            </div>
          </div>
        </div>

        {/* Center Search Bar */}
        <div
          className="search-bar mx-auto mt-4 me-3"
          style={{
            flex: 1,
            maxWidth: "400px", // Increase the width of the search bar
            display: "flex", // Align the search bar in the center
            position: "relative", // To position the icon inside the input
            border: "none"
          }}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{
              position: "absolute",
              left: "20px", // Position the icon inside the input box
              top: "52%",
              transform: "translateY(-50%)", // Vertically center the icon
              color: "#aaa", // Icon color
            }}
          />
          <input
            type="text"
            className="form-control pt-3 pb-3"
            placeholder="Search for city and press enter"
            // Set the value to the city directly
            // Update city as user types
            onKeyDown={handleKeyDown} // Trigger when user presses Enter
            style={{
              paddingRight: "20px",
              paddingLeft: "40px", // Make room for the icon inside the input
              flexGrow: 1,
            }}
          />
        </div>

        {/* Weather Buttons */}
        <div className="container mt-3">
          <div className="d-flex justify-content-between">
            <button className="btn btn-outline-primary wbc" onClick={() => handleWeatherClick("Today")}>Weather Today</button>
            <button className="btn  btn-outline-primary wbc" onClick={() => handleWeatherClick("Yesterday")}>Yesterday Weather</button>
            <button className="btn  btn-outline-primary wbc" onClick={() => handleWeatherClick("5Days")}>5 Days Weather</button>
            <button className="btn  btn-outline-primary wbc" onClick={() => handleWeatherClick("Tomorrow")}>Tomorrow Weather</button>
          </div>
        </div>

        <div className="mt-4">
          {/* Show the appropriate weather component based on button click */}
          {currentWeather === "Today" && <WeatherToday city={city} />}
          {currentWeather === "Yesterday" && <WeatherYesterday city={city} />}
          {currentWeather === "5Days" && showForecast && city && (
            <div className="mt-4">
              <WeatherForecast city={city} />
            </div>
          )}
          {currentWeather === "Tomorrow" && <WeatherTomorrow city={city} />}
        </div>
      </div>
    </div>
  );
};

export default Weather;