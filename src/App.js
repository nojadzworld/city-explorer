import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {}
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
        cityData: cityDatafromAxios.data[0]
      });
    } catch (error) {

      this.setState({
        error: true,
        errorMessage: error.message
      })
    }
  }

  render() {
    return (
      <>
        <h1>City Explorer</h1>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=14`}/>
          <Card.Body>

            <Card.Title>{
              this.state.error
                ? <p>{this.state.errorMessage}</p>
                : <p>{this.state.cityData.display_name} {this.state.cityData.lat} {this.state.cityData.lon}</p>
               
            }
            </Card.Title>
            <Card.Text>
              <form onSubmit={this.getCityData}>
                <label > Enter in a City:
                  <input type="text" onChange={this.handleCityInput} />
                </label>
                <button type="submit">Explore!</button>
              </form>
            </Card.Text>
          </Card.Body>
        </Card>

      </>

    )
  }
}

export default App;