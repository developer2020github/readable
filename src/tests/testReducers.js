import * as reducers from "../reducers/reducers";
import * as actions from "../actions/actions";
import * as ServerApiTest from "../utils/ServerApiTest"; 

let sampleStore = getSampleStore(); 

function getSampleStore(numberOfPosts=25, minNumberOfComments=3, maxNumberOfComments=10){
    const commentsAndPosts = ServerApiTest.getCommentstAndPosts(numberOfPosts, minNumberOfComments, maxNumberOfComments); 
    return {
        categories: ["react", "redux", "udacity"], 
        posts: commentsAndPosts.posts, 
        comments: commentsAndPosts.comments

    }
}

function testAddPost(){
    let current_state = getSampleStore(5, 0, 1); 
    console.log("store before update"); 
    console.log(current_state); 
    let new_posts = reducers.posts(current_state.posts, actions.addPost("post master", "first added post", "redux", "hello1!"))
    console.log('posts after addition'); 
    console.log(new_posts); 
    console.log("original store before update"); 
    console.log(current_state); 
}

function testPosts(){

    
    testAddPost(); //test passed
  
}

console.log("hello world from test reducers!");
testPosts(); 