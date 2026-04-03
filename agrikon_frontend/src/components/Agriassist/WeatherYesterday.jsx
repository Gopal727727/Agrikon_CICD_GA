import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherYesterday = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const CITY = 'Pokhara';
  const UNITS = 'metric';
  
  const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=${UNITS}&appid=${API_KEY}`;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = response.data;

        // Get yesterday's date
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1); // Go back 1 day

        // Convert yesterday's date to a comparable format (YYYY-MM-DD)
        const yesterdayDate = yesterday.toISOString().split('T')[0];

        // Find the forecast closest to yesterday
        const closestForecast = data.list.find((item) => item.dt_txt.includes(yesterdayDate));
        
        // If no forecast found for yesterday, return an error
        if (!closestForecast) {
          setError('No weather data found for yesterday.');
          setLoading(false);
          return;
        }

        setWeather(closestForecast);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch yesterday\'s weather data.');
        setLoading(false);
      }
    };

    fetchWeather();
  }, [CITY]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', padding: '20px' }}>
      <h4>Weather Yesterday in {CITY}</h4>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          style={{ width: '100px', height: '100px' }}
        />
        <p>{weather.weather[0].description}</p>
        <p>
          <strong>{Math.round(weather.main.temp)}°C</strong>
        </p>
        <p>
          <small>Humidity: {weather.main.humidity}%</small>
        </p>
        <p>
          <small>Wind Speed: {weather.wind.speed} m/s</small>
        </p>
      </div>
    </div>
  );
};

export default WeatherYesterday;
