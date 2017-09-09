
//========================================================
//Readable: React content and comments application
//2017
//Author:  developer2020 
//e-mail:  dev276236@gmail.com
//========================================================

//========================================================================================
//Testing module; unit tests for reducers
//. Not used in release mode.
//========================================================================================

import * as reducers from "../reducers/reducers";
import * as actions from "../actions/actions";
import * as ServerApiTest from "./ServerApiTest"; 

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

function testAddComment(){ 
    let current_state = getSampleStore(5, 1, 2, false); 
    console.log("store before update"); 
    console.log(current_state); 
    let new_comments = reducers.comments(current_state.comments, actions.addComment("1", "this is new comment for post 1", "Chuck Norris"))
    console.log('comments after addition'); 
    console.log(new_comments); 
    console.log("original store before update"); 
    console.log(current_state); 
}

function testDeletePost(){
    let current_state = getSampleStore(5, 1, 4); 
    console.log("store before update"); 
    console.log(current_state); 
    let new_posts = reducers.posts(current_state.posts, actions.deletePost("2"))
    console.log('posts after deletetion'); 
    console.log(new_posts); 
    console.log("original store before update"); 
    console.log(current_state); 
}

function testDeleteComment(){
    let current_state = getSampleStore(5, 2, 2, false); 
    console.log("store before update"); 
    console.log(current_state); 
    let new_comments = reducers.comments(current_state.comments, actions.deleteComment("2c0"))
    console.log('comments after deletion'); 
    console.log(new_comments); 
    console.log("original store before update"); 
    console.log(current_state); 
}

function testEditPost(){
    let current_state = getSampleStore(5, 1, 4); 
    console.log("store before update"); 
    console.log(current_state); 
    let new_posts = reducers.posts(current_state.posts, actions.editPost("1", "this is updated post!", "and this is updated post title!"))
    console.log('posts after edit'); 
    console.log(new_posts); 
    console.log("original store before update"); 
    console.log(current_state); 
}

function testEditComment(){
    let current_state = getSampleStore(5, 2, 2, false); 
    console.log("store before update"); 
    console.log(current_state); 
    let new_comments = reducers.comments(current_state.comments, actions.editComment("2c0", "updated text of comment"))
    console.log('comments after edit'); 
    console.log(new_comments); 
    console.log("original store before update"); 
    console.log(current_state); 
}

function testUpvotePost(){
    let current_state = getSampleStore(5, 1, 4); 
    console.log("store before update"); 
    console.log(current_state); 
    let new_posts = reducers.posts(current_state.posts, actions.upvotePost("2"))
    console.log('posts after upvote'); 
    console.log(new_posts); 
    console.log("original store before update"); 
    console.log(current_state); 
}

function testUpvoteComment(){
    let current_state = getSampleStore(5, 2, 2, false); 
    console.log("store before update"); 
    console.log(current_state); 
    let new_comments = reducers.comments(current_state.comments, actions.upvoteComment("2c0"))
    console.log('comments after upvote'); 
    console.log(new_comments); 
    console.log("original store before update"); 
    console.log(current_state); 
}


function testDownvotePost(){
    let current_state = getSampleStore(5, 1, 4); 
    console.log("store before update"); 
    console.log(current_state); 
    let new_posts = reducers.posts(current_state.posts, actions.downvotePost("2"))
    console.log('posts after downvote'); 
    console.log(new_posts); 
    console.log("original store before update"); 
    console.log(current_state); 
}

function testDonwVoteComment(){
    let current_state = getSampleStore(5, 2, 2, false); 
    console.log("store before update"); 
    console.log(current_state); 
    let new_comments = reducers.comments(current_state.comments, actions.downvoteComment("2c0"))
    console.log('comments after downvote'); 
    console.log(new_comments); 
    console.log("original store before update"); 
    console.log(current_state); 
}

function testDeleteAllCommentsForPost(){
    let current_state = getSampleStore(5, 4, 4, false); 
    console.log("store before update"); 
    console.log(current_state); 
    let new_comments = reducers.comments(current_state.comments, actions.deleteAllCommentsForPost("2"))
    console.log('comments after deletion'); 
    console.log(new_comments); 
    console.log("original store before update"); 
    console.log(current_state); 
}

function testDeletParentOfComments(){
    let current_state = getSampleStore(5, 4, 4, false); 
    console.log("store before update"); 
    console.log(current_state); 
    let new_comments = reducers.comments(current_state.comments, actions.deleteParentOfComments("2"))
    console.log('comments after deletion of parent'); 
    console.log(new_comments); 
    console.log("original store before update"); 
    console.log(current_state); 
}

function testPosts(){

    
    //testAddPost();    //test passed
    //testDeletePost(); //test passed 
    //testEditPost();   //test passed
    //testUpvotePost(); //test passed 
    //testDownvotePost(); //test passed
    
}

function testComments(){
     //testAddComment(); //test passed
     //testDeleteComment(); //test passed
     //testEditComment(); //test passed
     //testUpvoteComment(); //test passed
     //testDonwVoteComment(); //test passed
     //testDeleteAllCommentsForPost(); // test passed
     //testDeletParentOfComments(); //test passed 

}


console.log("hello world from test reducers!");
//testPosts(); 
testComments();