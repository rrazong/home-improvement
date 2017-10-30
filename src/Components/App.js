'use strict';

import React from 'react';
import Gallery from './Gallery';
import data from '../data.json';
import './App.css';

const App = () => (
  <div className="page">
    <Gallery data={data} />
  </div>
);

export default App;
