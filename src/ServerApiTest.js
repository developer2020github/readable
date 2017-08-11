//========================================================
//Readable : a simple content and comment web app build with React and Redux
//2017
//Author:  developer2020 
//e-mail:  dev276236@gmail.com
//========================================================

//========================================================================================
//This module was created for exploration of server API.
//========================================================================================

//an example of object returned 
const exampleObject = {

    author: "thingone",
    body: "Just kidding. It takes more than 10 minutes to learn technology.",
    category: "redux",
    deleted: false,
    id: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1468479767190,
    title: "Learn Redux in 10 minutes!",
    voteScore: -5
}

const newExampleObject = {
    author: "me",
    body: "hello world!",
    category: "redux",
    deleted: false,
    id: "sd",
    timestamp: 1468479767181,
    title: "some title",
    voteScore: 900
}


function testAddNewPost() {
    //tested and works fine 
    /*
	`POST /posts`  
  **USAGE:**  
    Add a new post  
  
  **PARAMS:**   
    id - UUID should be fine, but any unique id will work  
    timestamp - timestamp in whatever format you like, you can use Date.now() if you like  
    title - String  
    body - String  
    owner - String  
    category: Any of the categories listed in categories.js. Feel free to extend this li*/
    fetch('http://localhost:5001/posts', {
        method: 'post',
        headers: {
            'Authorization': 'someAutorizatation',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newExampleObject)

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

function serverApiTestMain() {
    console.log("hello world from severApiTestMain!");
    testFetchAll();
    //testAddNewPost(); 
}

export { serverApiTestMain }