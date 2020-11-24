import Axios from "axios";
// api key
const apiKey = "1dfa346beb332c066d76434ff1ae559f";
const baseUrl = "http://api.openweathermap.org/data/2.5";

export const getCurrentData = async (lat, lon) => {
  try {
    const res = await Axios.get(
      `${baseUrl}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );

    let currentData = {
      location: res.data?.name,
      country: res.data?.sys.country,
      temp: res.data?.main.temp,
      desc: res.data?.weather[0].description,
      wind_speed: res.data?.wind.speed,
      pressure: res.data?.main.pressure,
      humidity: res.data?.main.humidity,
      icon: res.data?.weather[0].icon,
      dt: res.data?.dt,
      min_temp: res.data?.main.temp_min,
      max_temp: res.data?.main.temp_max,
      feels_like: res.data?.main.feels_like,
      visibility: res.data?.visibility,
    };
    return currentData;
  } catch (error) {
    console.log(error.response);
  }
};

export const getForecastData = async (lat, lon) => {
  try {
    const res = await Axios.get(
      `${baseUrl}/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=current&appid=${apiKey}`
    );
    const dailyData = res.data?.daily;

    return dailyData;
  } catch (error) {
    console.log(error.response);
  }
};

export const searchCity = async (cityName) => {
  try {
    const res = await Axios.get(
      `${baseUrl}/weather?q=${cityName}&units=metric&appid=${apiKey}`
    );

    let currentData = {
      lat: res.data?.coord.lat,
      lon: res.data?.coord.lon,
      location: res.data?.name,
      country: res.data?.sys.country,
      temp: res.data?.main.temp,
      desc: res.data?.weather[0].description,
      wind_speed: res.data?.wind.speed,
      pressure: res.data?.main.pressure,
      humidity: res.data?.main.humidity,
      icon: res.data?.weather[0].icon,
      dt: res.data?.dt,
      min_temp: res.data?.main.temp_min,
      max_temp: res.data?.main.temp_max,
      feels_like: res.data?.main.feels_like,
      visibility: res.data?.visibility,
    };
    return currentData;
  } catch (error) {
    const errMsg = error.response.data?.message;
  }
};
