import React from "react";
import ReactDOM from "react-dom";
import moment from 'moment';
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      temp: "", 
      weather: "", 
      weather_desc: "",
      rain: "",
      pressure: "",
      humidity: "",
      wind: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ cityName: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.cityName.length) {
      return;
    }
 
    function callWeatherApi(city) {
      var apiKey = "d35ec993dfcdc0c9b58035255050c061";
      var httpRequest = new XMLHttpRequest();
      var searchAddress =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&APPID=" +
        apiKey;

      httpRequest.open("GET", searchAddress, true);
      httpRequest.onload = function() {
        var data = JSON.parse(this.response);
        console.log("Inside", data);
        return(data);
      };
      httpRequest.send();
    }

    var data = callWeatherApi(this.state.cityName);
    console.log("Outside", data);
    this.setState(state => ({
      cityName: state.cityName,
    }));
  }

  render() {
    var time = moment().format("MMM Do YYYY")
    return (
      <div className="weather-display">
          <input
            className="city-name"
            value={this.state.cityName || ""}
            onChange={this.handleChange}
          />
        <button className="submit-button" onClick={this.handleSubmit}>Submit</button>
        <div className="weather-info">
          <p className="temperature">{this.state.temp}</p>
          <p className="Weather">{this.state.weather}</p>
          <p className="weather-desc">{this.state.weather_desc}</p>
          <p className="rain">{this.state.rain}</p>
          <p className="pressure">{this.state.pressure}</p>
          <p className="humidity">{this.state.humidity}</p>
          <p className="wind">{this.state.wind}</p>
        </div>
        <div className="bottom">
          <p className="time">{time}</p>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
