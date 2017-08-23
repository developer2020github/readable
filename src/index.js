import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './components/App';

import registerServiceWorker from './registerServiceWorker';
import { populateStore } from './tests/populateStore'

//import * as testReducers from './tests/testReducers'; 
import { createStore, applyMiddleware, compose } from 'redux'
import { reducer } from './reducers/reducers'
import { Provider } from 'react-redux'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
populateStore(store); 
ReactDOM.render(
<BrowserRouter><App /></BrowserRouter>
,
 document.getElementById('root'))

registerServiceWorker();
