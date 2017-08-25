import * as actions from "../actions/actions"
import { getCommentstAndPosts } from "../utils/ServerApiTest"
function addCategories(store){
  let myCategories =  ["react", "redux", "udacity"]; 
  store.dispatch(actions.addCategories(myCategories))
}

function addPostsAndComments(store){
   let postsAndComments = getCommentstAndPosts(25, 0, 15); 
   console.log("posts and comments"); 
   console.log(postsAndComments); 

   for (let postId in postsAndComments.posts){
        let post = postsAndComments.posts[postId];     
        store.dispatch(actions.addPost(post.author, post.body, post.category, post.title, post.timestamp, post.voteScore, post.id)); 
   }

   for (let commentId in postsAndComments.comments){
       let comment = postsAndComments.comments[commentId];
       console.log("adding comment") ; 
 
       store.dispatch(actions.addComment(comment.parentId, comment.body, comment.author, comment.timestamp, comment.voteScore)); 
   }
}

export function populateStore(store){
    addCategories(store); 
    addPostsAndComments(store); 
}