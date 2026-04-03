import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherForecast = ({ city }) => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const UNITS = 'metric';
  const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${UNITS}&appid=${API_KEY}`;

  useEffect(() => {
    // Reset state when city changes
    setForecast([]);
    setLoading(true);
    setError(null);

    const fetchWeather = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = response.data;
        const dailyForecasts = data.list.filter((item) =>
          item.dt_txt.includes('12:00:00')
        );
        setForecast(dailyForecasts);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch weather data.');
        setLoading(false);
      }
    };

    if (city) {
      fetchWeather();
    }
  }, [city]); // Trigger re-fetch when city changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h4>5-Day Weather Forecast for {city}</h4>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        {forecast.map((day, index) => {
          const precipitation = day.rain ? day.rain["3h"] : 0; // Rain for the next 3 hours
          const windSpeed = day.wind.speed;
          
          return (
            <div
              key={index}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
                width: '200px',
                backgroundColor:'#c9c9c9'
              }}
            >
              <h4>{new Date(day.dt_txt).toLocaleDateString()}</h4>
              <img
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                style={{ width: '80px', height: '80px' }}
              />
              <p>{day.weather[0].description}</p>
              <p>
                <strong style={{color:'blue'}}>{Math.round(day.main.temp)}°C</strong>
              </p>
              <p>
                <small>Humidity: {day.main.humidity}%</small>
              </p>
              <p>
                <small>Wind Speed: {windSpeed} m/s</small>
              </p>
              <p>
                <small>Precipitation: {precipitation} mm</small>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherForecast;