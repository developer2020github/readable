
//========================================================
//Readable: React content and comments application
//2017
//Author:  developer2020 
//e-mail:  dev276236@gmail.com
//========================================================

//========================================================================================
//Creation of Redux store
//========================================================================================
import { createStore, applyMiddleware, compose } from 'redux'
import { reducer } from '../reducers/reducers'
import thunk from 'redux-thunk';
import * as lib from "../utils/lib"



//const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store =  createStore(reducer, composeEnhancers(applyMiddleware(thunk)));


export default store 