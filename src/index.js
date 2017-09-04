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
import * as testOptions from "./tests/testOptions"
import {serverApiTestMain} from "./utils/ServerApiTest"

if (testOptions.testServerAPI){

    ReactDOM.render(
        <h1>
            SERVER API TEST ON: USE CONSOLE FOR DATA CHECKING 
        </h1>
        ,
        document.getElementById('root'))

        serverApiTestMain()
}else{

if (!testOptions.useServerData){
    populateStore(store); 
}

ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
        
            <App />
      
    </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root'))
}

registerServiceWorker();
