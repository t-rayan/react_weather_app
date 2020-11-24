import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import CurrentTemp from "./components/CurrentTemp/CurrentTemp";
import Forecast from "./components/Forecast/Forecast";
import Spinner from "./components/Spinner/Spinner";
import "./App.css";

import { getCurrentData, getForecastData, searchCity } from "./helpers/api";

export default class App extends Component {
  // state
  state = {
    coords: {
      latitude: "",
      longitude: "",
    },
    currentData: {},
    dailyData: [],
    cityName: "",
    isLoading: true,
    error: "",
  };

  async componentDidMount() {
    // check whether geolocation is supported

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        // get the lat and long of users device
        let currentCoords = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };

        // updating value of state i.e lat and long
        this.setState({ coords: currentCoords });

        // getting current weather data from api
        const data = await getCurrentData(
          this.state.coords.latitude,
          this.state.coords.longitude
        );
        this.setState({ currentData: data });
        this.setState({ isLoading: false });

        // getting daily weather data from api
        const dailyData = await getForecastData(
          this.state.coords.latitude,
          this.state.coords.longitude
        );
        this.setState({ dailyData: dailyData });
      });
    }
  }
  // update city name
  updateCityName = (value) => {
    this.setState({ cityName: value });
  };

  // search weather for entered city
  search = async (event) => {
    event.preventDefault();

    // setting isLoading state to true when user clicks search button
    this.setState({ isLoading: true });
    const data = await searchCity(this.state.cityName);
    console.log(data);
    // setting isLoading state to false after data is received
    this.setState({ currentData: data, isLoading: false });
    const newCoords = {
      latitude: data.lat,
      longitude: data.lon,
    };
    this.setState({ coords: newCoords });
    const newDailyData = await getForecastData(
      this.state.coords.latitude,
      this.state.coords.longitude
    );
    this.setState({ dailyData: newDailyData });

    // resetting cityName state
    this.setState({ cityName: "" });
  };
  render() {
    const { isLoading } = this.state;
    let displayScreen;

    if (isLoading) {
      displayScreen = <Spinner />;
    } else {
      displayScreen = (
        <div className="wrapper">
          <Navbar updateCityName={this.updateCityName} search={this.search} />
          <div className="main">
            <CurrentTemp data={this.state.currentData} />
            <Forecast forecastData={this.state.dailyData} />
          </div>
          <p className="power_by">Powered by OpenWeather Api.</p>
        </div>
      );
    }
    return <div className="App">{displayScreen}</div>;
  }
}
