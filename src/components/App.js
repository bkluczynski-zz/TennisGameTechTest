import React, { Component } from 'react';
import Player from './Player'
import { connect } from 'react-redux';
import { Router, Route } from 'react-router';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Player/>
      </div>
    );
  }
}

export default connect(null,null)(App);
