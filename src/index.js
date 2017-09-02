import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './components/App';

import registerServiceWorker from './registerServiceWorker';
import { populateStore } from './tests/populateStore'

//import * as testReducers from './tests/testReducers'; 
import { createStore, applyMiddleware, compose } from 'redux'
import  store  from './store/store'
import { Provider } from 'react-redux'


//populateStore(store); 

ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
        
            <App />
      
    </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root'))

registerServiceWorker();
