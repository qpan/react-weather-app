import React from 'react';
import './App.css';
import 'weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './app_component/weather.component';
import Form from './app_component/form.component';

// api.openweathermap.org/data/2.5/weather?q=London,uk
const API_KEY = '0c681ec7bc806a4228f288c6ab83768d';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined ,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false,
    };

    this.weatherIcon = {
      Thunderstorm: 'wi-thunderstorm',
      Drizzle: 'wi-sleet',
      Rain: 'wi-storm-showers',
      Snow: 'wi-snow',
      Atmosphere: 'wi-fog',
      Clear: 'wi-day-sunny',
      Clouds: 'wi-day-fog',
    }
  }

  calCelsius(temp) {
    return Math.floor(temp - 273.15);
  }

  getWeatherIcon(icons, rangeID) {
    switch(true) {
      case rangeID => 200 && rangeID <= 232:
        this.setState({icon: icons.Thunderstorm});
        break;
      case rangeID => 300 && rangeID <= 321:
        this.setState({icon: icons.Drizzle});
        break;
      case rangeID => 500 && rangeID <= 531:
        this.setState({icon: icons.Rain});
        break;
      case rangeID => 600 && rangeID <= 622:
        this.setState({icon: icons.Snow});
        break;
      case rangeID => 701 && rangeID <= 721:
        this.setState({icon: icons.Atmosphere});
        break;
      case rangeID === 800:
        this.setState({icon: icons.Clear});
        break;
      case rangeID => 800 && rangeID <= 804:
        this.setState({icon: icons.Clouds});
        break;
      default:
        this.setState({icon: icons.Clouds});
    }
  }

  /* Not: arrow functions automatically binds to source object instance */
  getWeather = async (event) => {
    event.preventDefault();

    const city = event.target.elements.city.value;
    const country = event.target.elements.city.value;

    if(city && country) {
      const api_call =  await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`)

      const response = await api_call.json();
      console.log(response);

      this.setState({
        cityAndCountry: `${response.name}, ${response.sys.country}`,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false,
      })

      this.getWeatherIcon(this.weatherIcon, response.weather[0].id)
    } else {
      this.setState({error: true});
    }
  }

  render() {
    return (
      <div className="App">
        <Form loadWeather={this.getWeather} error={this.state.error}/>
        <Weather
        cityAndCountry={this.state.cityAndCountry}
        temp_celsius={this.state.celsius}
        temp_max={this.state.temp_max}
        temp_min={this.state.temp_min}
        description={this.state.description}
        weatherIcon={this.state.icon}/>
      </div>
    );
  }
}

export default App;
