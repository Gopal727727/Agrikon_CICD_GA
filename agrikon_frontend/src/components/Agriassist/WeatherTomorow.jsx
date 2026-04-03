import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherTomorrow = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const UNITS = 'metric';
  const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${UNITS}&appid=${API_KEY}`;

  useEffect(() => {
    setWeather(null);
    setLoading(true);
    setError(null);

    const fetchWeather = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = response.data;
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1); 
        const tomorrowDate = tomorrow.toISOString().split('T')[0];

        const closestForecast = data.list.find((item) => item.dt_txt.includes(tomorrowDate));

        if (!closestForecast) {
          setError('No weather data found for tomorrow.');
          setLoading(false);
          return;
        }

        setWeather(closestForecast);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch tomorrow\'s weather data.');
        setLoading(false);
      }
    };

    if (city) {
      fetchWeather();
    }

  }, [city]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const precipitation = weather.rain ? weather.rain["3h"] : 0; 
  const precipitationChance = precipitation > 0 ? 'High' : 'Low'; 

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', padding: '20px', backgroundColor: '#f0f8ff' }}>
      <h4 style={{ marginBottom: '20px', fontSize: '1.5rem', color: '#333' }}>
        Weather Prediction for Tomorrow in {city}
      </h4>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        <div
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '10px',
            width: '250px',
            backgroundColor: '#c9c9c9',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h5>{new Date(weather.dt_txt).toLocaleDateString()}</h5>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            style={{ width: '80px', height: '80px', marginBottom: '15px' }}
          />
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#555' }}>
            {weather.weather[0].description}
          </p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff' }}>
            {Math.round(weather.main.temp)}°C
          </p>
          <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
          <p><strong>Precipitation:</strong> {precipitation} mm</p>
          <p><strong>Precipitation Chance:</strong> {precipitationChance}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherTomorrow;