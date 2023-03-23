import React from 'react';

// import Card from 'react-bootstrap/Card';

class Weather extends React.Component {
  render() {
    return (
      <>
      {this.props.data.map((day,idx) => {
        return (
          <>
          <p>{day.date}</p>
          <p>{day.description}</p>
          </>
        )
      })}
      </>
    )
  }
}

export default Weather;