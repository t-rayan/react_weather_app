import React from "react";
import "./CurrentTemp.css";

const CurrentTemp = ({ data }) => {
  return (
    <div className="data_container">
      <div className="location_container">
        <h3 className="location">
          {" "}
          {data.location} , {data.country}
        </h3>
      </div>
      <div className="info_container">
        <div className="status_icon_container">
          <img
            src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
            width="80"
            height="80"
            alt="icon"
          />

          <p className="status">{data.desc}</p>
        </div>
        <div className="main_temp_container">
          <h2 className="main_temp"> {Math.round(data.temp)}˚C </h2>
          <p className="feels_like">
            Feels like {Math.round(data.feels_like)}˚C
          </p>
        </div>
        <div className="summary_container">
          <p className="wind">Wind: {data.wind_speed} </p>
          <p className="pressure">Pressure: {data.pressure}</p>
          <p className="humidity">Humidity: {data.humidity} </p>
          <p className="visibility">
            Visibility: {Math.round(data.visibility / 1000)} Km{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentTemp;
