import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [data, setdata] = useState(null);
  const [city, setCity] = useState('');
  const [searchCity, setSearchCity] = useState('ahmedabad');

  useEffect(() => {
    const key = 'a71f93c74b7db7b63a7ed5fb3fcaf90a';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${key}&units=metric`)
      .then(res => res.json())
      .then(data => setdata(data));
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      setSearchCity(city);
      setCity('');
    }
  };

  return (
    <div className="app-container">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      {data && data.main ? (
        <ul className="weather-box">
          <li><strong>City:</strong> {data.name}</li>
          <li><strong>Temperature:</strong> {data.main.temp} °C</li>
          <li><strong>Humidity:</strong> {data.main.humidity} %</li>
          <li><strong>Wind Speed:</strong> {data.wind.speed} m/s</li>
        </ul>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
}

export default App;
