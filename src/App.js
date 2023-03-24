import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import './App.css';
import Weather from './Weather';
import Movies from './Movies'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      weatherDataFromAxios: [],
      error: false,
      errorMessage: '',
      movieInfo: [],

    }
  }


  handleCityInput = (event) => {
    this.setState({
      city: event.target.value
    })

  }


  getCityData = async (event) => {
    event.preventDefault()

    try {

      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`

      let cityDatafromAxios = await axios.get(url);

      console.log(cityDatafromAxios.data[0])
      this.setState({
        cityData: cityDatafromAxios.data[0],
        error: false
      });
      let lat = cityDatafromAxios.data[0].lat;
      let lon = cityDatafromAxios.data[0].lon;

      this.handleGetWeather(lat, lon);
      this.getMovies();
    } catch (error) {

      this.setState({
        error: true,
        errorMessage: error.errorMessage
      })


    }
  }
  handleGetWeather = async (lat, lon) => {
   
    try {
      let url = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}&lat=${lat}&lon=${lon}`;
      let weatherDataFromAxios = await axios.get(url);
     console.log(url);
      // console.log('Weather: ', weatherDataFromAxios.data)

      this.setState({
        weatherDataFromAxios: weatherDataFromAxios.data,
        error: false
      })
    } catch (error) {
    console.log(error);
    }
  }

  getMovies = async () => {
    try {
      let url =`${process.env.REACT_APP_SERVER}/movies?searchQuery=${this.state.city}`
      let movieResults = await axios.get(url);
      console.log(movieResults.data);

      this.setState({
        movieInfo: movieResults.data
      });

    } catch (error) {
      console.log('getMovies' + error.message);
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }
  }

  render() {
    return (
      <>
        <h1>Enter your City in the Search Bar!</h1>
        <Card style={{ width: '45rem' }}>
          <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=14`} />
          <Card.Body>

            <Card.Title>{
              this.state.error
                ? <p>{this.state.errorMessage}</p>
                : <p>{this.state.cityData.display_name} {this.state.cityData.lat} {this.state.cityData.lon}</p>
            }
            </Card.Title>
            <Card.Text>
              <form onSubmit={this.getCityData}>
                <label > Enter in a City!:
                  <input type="text" onChange={this.handleCityInput} />
                </label>
                <button type="submit">Explore!</button>
                <Weather data={this.state.weatherDataFromAxios} />
                <Movies movieInfo={this.state.movieInfo} />
              </form>
            </Card.Text>
          </Card.Body>
        </Card>

      </>

    )
  }
}

export default App;