import { useEffect, useState } from "react";
import "./App.css";
import searchIcon from "./assets/search.png";
import Err from "./assets/err.png";

const API_KEY = "02ada7a866b48b8c0e5c334fdf3807ae";

function App() {
  const [text, setText] = useState("Chennai");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  async function search() {
    if (!text.trim()) return;
    setLoading(true);
    setError("");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError(error.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    search();
  }, []);

  function Application() {
    if (loading) return <div className="loading">Fetching Weather Data...</div>;
    if (error)
      return (
        <div className="error">
          <img src={Err} alt="Error" />
          {error}
        </div>
      );
    if (!weather) return null;

    const getWeatherMessage = (temp) => {
      if (temp > 40) return "Extreme Hot !";
      if (temp > 30) return "it's really hot !";
      if (temp > 25) return "Nice and warm !";
      if (temp > 20) return "A bit chilly !";
      if (temp > 10) return "Extreme Cold !";
      return "Not In Limit Check IF";
    };

    return (
      <div className="Clk_set">
        {/* <img className="img_2" alt="Weather icon" src="" /> */}
        <h1>{getWeatherMessage(weather?.main?.temp)}</h1>



        <div className="climate">
          {weather?.main?.temp} <span>°C</span>
        </div>
        <div className="location">{weather?.name}</div>
        <div className="country">{weather?.sys?.country}</div>
        <div>
          <div className="cordinates">
            <div>
              <span>Latitude: </span>
              <span>{weather?.coord?.lat ? weather.coord.lat.toFixed(2) : "N/A"}</span>
            </div>
            <div>
              <span>Longitude: </span>
              <span>{weather?.coord?.lon ? weather.coord.lon.toFixed(2):""}</span>
            </div>
          </div>
          <div className="data">
            <div className="humidity">
              <div>
                <span>{weather?.main?.humidity? weather.main.humidity.toFixed(2):""}%</span>
                <span> Humidity</span>
              </div>
            </div>
            <div className="wind_speed">
              <div>
                <span>{weather?.wind?.speed ? weather.wind.speed:""} KM/H</span>
                <span> Wind Speed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="input_name">
        <input type="text" value={text} onChange={handleCity} onKeyDown={handleKeyDown} />
        <img src={searchIcon} alt="search icon" className="img" onClick={search} />
      </div>
      <Application />
    </div>
  );
}

export default App;
