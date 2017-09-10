
//========================================================
//Readable: React content and comments application
//2017
//Author:  developer2020 
//e-mail:  dev276236@gmail.com
//========================================================

//========================================================================================
//Testing module; used to populate store for local testing
//(without server). Not used in release mode.
//========================================================================================
import * as postActions from "../actions/posts"
import * as commentActions from "../actions/comments"
import * as actions from "../actions/actions"
import { getCommentstAndPosts } from "./ServerApiTest"
function addCategories(store){
  let myCategories =  ["react", "redux", "udacity"]; 
  store.dispatch(actions.addCategories(myCategories))
}

function addPostsAndComments(store){
   let postsAndComments = getCommentstAndPosts(3, 1, 4); 
   //console.log("posts and comments"); 
   //console.log(postsAndComments); 

   for (let postId in postsAndComments.posts){
        let post = postsAndComments.posts[postId];     
        store.dispatch(postActions.addPost(post.author, post.body, post.category, post.title, post.timestamp, post.voteScore, post.id)); 
   }

   for (let commentId in postsAndComments.comments){
       let comment = postsAndComments.comments[commentId];
     //  console.log("adding comment") ; 
 
       store.dispatch(commentActions.addComment(comment.parentId, comment.body, comment.author, comment.timestamp, comment.voteScore, comment.id)); 
   }
}

export function populateStore(store){
    console.log("running polulate store!")
    addCategories(store); 
    addPostsAndComments(store); 
}