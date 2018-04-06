import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Joke from './Joke';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header title="Tell Kelsey a Joke" />
        <Joke />
      </div>
    );
  }
}

export default App;
