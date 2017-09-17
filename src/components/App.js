import React, { Component } from 'react';
import Player from './Player'
import { connect } from 'react-redux';


class App extends Component {
  render() {
    return (
      <Player/>
    );
  }
}

export default connect(null,null)(App);
