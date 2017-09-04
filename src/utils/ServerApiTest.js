//========================================================
//Readable : a simple content and comment web app build with React and Redux
//2017
//Author:  developer2020 
//e-mail:  dev276236@gmail.com
//========================================================

//========================================================================================
//This module was created for exploration of server API.
//========================================================================================
import * as lib from '../utils/lib'; 
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

const exampleComment = {
          id: '894tuq4ut84ut8v4t8wun89g',
          parentId: "8xf0y6ziyjabvozdd253nd",
          timestamp: 1468166872634,
          body: 'Hi there! I am a COMMENT.',
          author: 'thingtwo',
          voteScore: 6,
          deleted: false,
          parentDeleted: false 
        }

function testGetComment(postId){
    //let queryString = "http://localhost:5001/posts/8xf0y6ziyjabvozdd253nd/comments"//this works!
    //console.log("fetching comments for post " + postId)

    let queryString = "http://localhost:5001/posts/" + postId + "/comments"; 

    console.log(queryString)
   
        
                let commentsPromise = fetch(queryString, {
                    method: 'get',
                    headers: { 'Authorization': 'someAutorizatation' }
                })
                
                commentsPromise.then(function(response) {
                    console.log("getting comments!")
                    return response.json();
                    }
                ).catch(function(err) {
                    console.log("error happened!");
                }).then(function(comments) {
                    console.log("and this is comments JSON!")
                    console.log(comments)
        
                });
        
}
    
function testAddNewPost() {
	//https://davidwalsh.name/fetch
	/*
	var request = new Request('https://davidwalsh.name/users.json', {
	method: 'POST', 
	mode: 'cors', 
	redirect: 'follow',
	headers: new Headers({
		'Content-Type': 'text/plain'
	})
});
	*/
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
    //testFetchAll();
    //testAddNewPost(); 
    testGetComment("8xf0y6ziyjabvozdd253nd")
}

function getArrayOfExampleObjects(nObjects = 5){
    let listOfObjects = []; 
    for (let i=0; i<nObjects; i++){
        listOfObjects.push({...exampleObject, id: i.toString()}); 
    }

    return listOfObjects; 
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getComment(parentId, id, parentPostTimeStamp){
   let text = "I am comment for post " + parentId + " and my id is " + id
   let voteScore = getRandomInt(0, 250); 
   let timestamp = getRandomInt(parentPostTimeStamp, Date.now());

   return Object.assign({}, exampleComment, {id, parentId, body: text, voteScore, timestamp }); 
}

function getCommentstAndPosts(numberOfPosts=25, minNumberOfComments=3, maxNumberOfComments=10, randomizeNumberOfcomments = true){
    //if randomizeNumberOfcomments is set to false, each post will get macNumberOfComments; 
   let startDate = new Date(2010, 1, 10, 1, 2, 0, 45);
    //console.log(startDate); 
   
   let posts = {}; 
   let comments ={}; 
   let categories =  ["react", "redux", "udacity"]; 

   for (let i = 0; i<numberOfPosts; i++){
       let postId = lib.generateUUID() 
       let body = " This is post # " + (i+1)  + " and some more text so it is not completely empty post" + "id = " + postId; 
       let category = categories[getRandomInt(0, categories.length-1)]
       let timestamp = getRandomInt(startDate.getTime(), Date.now()); 
       let voteScore = getRandomInt(0, 250);
     
       let post = Object.assign({}, exampleObject, {id: postId, category, body, timestamp, voteScore})
       posts[post.id]= post; 


       let numberOfComments = maxNumberOfComments; 
       if (randomizeNumberOfcomments){
            numberOfComments = getRandomInt(minNumberOfComments, maxNumberOfComments); 
       }
       //console.log("number of comments"); 
       //console.log(numberOfComments); 

       for (let j = 0; j<numberOfComments-1; j++){
           let comment = getComment(postId,  lib.generateUUID(), timestamp)
           comments[comment.id]=comment; 
       }


   }
   return {comments, posts}; 
}

export { serverApiTestMain }
export {getArrayOfExampleObjects}
export { exampleObject }
export { getCommentstAndPosts }
