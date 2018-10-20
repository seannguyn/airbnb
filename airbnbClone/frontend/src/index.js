import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import axios from 'axios';
axios.defaults.baseURL = '/api';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
