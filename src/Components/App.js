'use strict';

import React, { Component } from 'react';
import GalleryContainer from './GalleryContainer';
import data from '../data.json';
import './App.css';

class App extends Component {
  componentDidMount() {
    $(document).foundation(); // eslint-disable-line no-undef
  }
  render() {
    return (
      <div className="page">
        <GalleryContainer data={data} />
      </div>
    );
  }
}

export default App;
