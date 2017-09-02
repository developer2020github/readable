

import { createStore, applyMiddleware } from 'redux'
import { reducer } from '../reducers/reducers'
import thunk from 'redux-thunk';

import { addPost } from "../actions/actions"; 


function testFetchAll() {
    //tested and works fine 
    //fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})`
    //
    //`GET /posts`  
    //**USAGE:**    
    // Get all of the posts. Useful for the main page when no category is selected.  
    fetch('http://localhost:5001/posts', {
        method: 'get',
        headers: { 'Authorization': 'someAutorizatation' }
    }).then(function(response) {
        console.log("server responded with:");
        console.log(response);
        console.log("response converted to json");
        //console.log(response.json()) this causes an error
        return response.json();
    }).catch(function(err) {
        console.log("error happened!");
    }).then(function(data) {
        // `data` is the parsed version of the JSON returned from the above endpoint.
        console.log("parsed data")
        console.log(data); // { "userId": 1, "id": 1, "title": "...", "body": "..." }
    });;

}

let asyncFetchAllPosts = () => dispatch => { 
    fetch('http://localhost:5001/posts', {
        method: 'get',
        headers: { 'Authorization': 'someAutorizatation' }
    }).then(function(response) {
        console.log("server responded with:");
        console.log(response);
        console.log("response converted to json");
        //console.log(response.json()) this causes an error
        return response.json();
    }).catch(function(err) {
        console.log("error happened!");
    }).then(function(posts) {
        // `data` is the parsed version of the JSON returned from the above endpoint.
        console.log("parsed data")
        console.log(posts); // { "userId": 1, "id": 1, "title": "...", "body": "..." }
        for (let post in posts){
            //addPost(author, body, category, title, timestamp=null, voteScore=null, id=null)
            addPost(...post); 
        }
    });;

 }


//const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const store =  createStore(reducer, applyMiddleware(thunk));
export default store 