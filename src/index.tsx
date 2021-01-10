import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './scss/Style.scss';
//REDUX-TOOLKIT
import { Provider } from 'react-redux';
import store from './toolkit/store';

ReactDOM.render(
<Provider store={store}>
<App/>
</Provider>
, document.getElementById("root"));