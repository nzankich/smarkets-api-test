import React, { Component } from 'react';
import Events from './EventList/Events';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Smarkets Api Test</h1>
        </header>
        <Events />
      </div>
    );
  }
}

export default App;
