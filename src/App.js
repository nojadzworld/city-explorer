import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  handleCityInput = (event) => {
    this.setState({
      city: event.target.value
    })

  }

  getCityData = (event) => {
    event.preventDefault()

  }

  render() {
    return (
      <>
        <h1>City Explorer</h1>

        <form onSubmit={this.getCityData}>
          <label>
            <input type='text' onChange={this.handleCityInput} />
          </label>
          <button type='submit'>Explore!</button>
        </form>

      </>

    )
  }
}

export default App;