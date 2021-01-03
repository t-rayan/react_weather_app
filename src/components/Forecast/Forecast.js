import React from "react";
import "./Forecast.css";
import Moment from "react-moment";
import "moment-timezone";

const Forecast = ({ forecastData }) => {
  return (
    <div className="forecast_container">
      <div className="days_container">
        {forecastData.map((data) => (
          <div className="day" key={data.dt}>
            <p className="current_day">
              <Moment unix format="ddd">
                {data.dt}
              </Moment>
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
              width="42"
              height="42"
              alt="icon"
            />
            {data.weather.icon}
            <p className="temp">{Math.round(data.temp.max)}˚c</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
