import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      temp: "",
      weather: "",
      humidity: "",
      wind: "",
      sunrise: "",
      sunset: "",
      status: false, 
      weatherCode: 'default', //default
      errorStatus: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  handleChange(e) {
    this.setState({ cityName: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.cityName.length) {
      return;
    }

    function callWeatherApi(city, callback) {
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
        callback(data);
      };
      httpRequest.send();
    }

    callWeatherApi(this.state.cityName, data => {
      if(data.cod === '404'){
        this.setState({ status: false, errorStatus: true, cityName: '' });
        console.log("Error");
        return;
      }
      this.setState(state => ({
        cityName: state.cityName.charAt(0).toUpperCase() + state.cityName.slice(1),
        temp: parseInt(data.main["temp"], 10) - 273.0,
        weather: data.weather["0"].main,
        weather_desc: data.weather["0"].description,
        humidity: data.main["humidity"],
        wind: data.wind["speed"],
        status: !state.status
      }));
    });
  }

  toggle(e) {
    e.preventDefault();
    if (!this.state.cityName.length) {
      return;
    }

    this.setState({
      status: false,
      cityName: "", 
      errorStatus: false,
    });
  }

  render() {
    var weatherCode;
    if(!this.state.status){
      weatherCode = 'default';
    }
    else{
      var temperature = this.state.temp;
      if(temperature === ''){
        weatherCode = 'default';
      } else if (temperature < 5){
        weatherCode = 'snow';
      } else if(temperature >= 5 && temperature < 15){
        weatherCode = 'temp-cold';
      } else if(temperature >= 15 && temperature < 30){
        weatherCode = 'temp-cool';
      } else {
        weatherCode = 'temp-hot';
      }
    }
    return (
      <div className={weatherCode} id='page'>
        <div className={this.state.status ? "input-div-disable" : "input-div"}>
          <h1>Check Weather</h1>
          <input
            className="city-name"
            value={this.state.cityName || ""}
            onChange={this.handleChange}
            autoFocus
          />
          <br />
          <button className="submit-button" onClick={this.handleSubmit}>
            Submit
          </button>
          <p className={this.state.errorStatus ? "error-message-show" : "error-message"}>City not found. Please enter correct City Name</p>
        </div>
        <div
          className={
            this.state.status ? "weather-info" : "weather-info-disable"
          }
        >
        <p className="cityName-display">{this.state.cityName}</p>
          <p className="temp">{this.state.temp} &#8451;</p>
          <p className="weather-value">{this.state.weather}</p>
          <div id="lower-box">
            <div id="humidity-box">
              <p>Humidity</p>
              <p className="humidity">{this.state.humidity} %</p>
            </div>
            <div id="wind-box">
              <p>Wind</p>
              <p className="wind">{this.state.wind} m/s</p>
            </div>
          </div>
        </div>
        <div className="bottom">
          <button className="toggle" onClick={this.toggle}>
            Try again?
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
