import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppList from './AppList';
import * as serviceWorker from './serviceWorker';
import NavBar from "./NavBar";


ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.unregister();
