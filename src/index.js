//========================================================
//Readable: React content and comments application
//2017
//Author:  developer2020 
//e-mail:  dev276236@gmail.com
//========================================================

//========================================================================================
//Root module
//========================================================================================


import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './components/App';

import registerServiceWorker from './registerServiceWorker';
import { populateStore } from './tests/populateStore'
import store from './store/store'
import { Provider } from 'react-redux'
import * as testOptions from "./tests/testOptions"
import { serverApiTestMain } from "./tests/ServerApiTest"

if (testOptions.testServerAPI) {

    ReactDOM.render(
        <h1>
            SERVER API TEST ON: USE CONSOLE FOR DATA CHECKING
        </h1>
        ,
        document.getElementById('root'))

    serverApiTestMain()
} else {

    if (!testOptions.useServerData) {
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
