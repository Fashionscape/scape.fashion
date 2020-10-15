import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

import App from './App';
import config from './config';

import './index.css';

ReactGA.initialize(config.analytics.trackingId);

ReactDOM.render(<App />, document.getElementById('root'));
