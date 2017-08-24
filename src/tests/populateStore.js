import * as actions from "../actions/actions"
import { getCommentstAndPosts } from "../utils/ServerApiTest"
function addCategories(store){
  let myCategories =  ["react", "redux", "udacity"]; 
  store.dispatch(actions.addCategories(myCategories))
}

function addPostsAndComments(store){
   let postsAndComments = getCommentstAndPosts(25, 1, 9); 
   

   for (let postId in postsAndComments.posts){
        let post = postsAndComments.posts[postId];     
        store.dispatch(actions.addPost(post.author, post.body, post.category, post.title, post.timestamp, post.voteScore)); 
   }

   for (let commentId in postsAndComments.comments){
       let comment = postsAndComments.comments[commentId]; 
 
       store.dispatch(actions.addComment(comment.parentId, comment.body, comment.author, comment.timestamp, comment.voteScore)); 
   }
}

export function populateStore(store){
    addCategories(store); 
    addPostsAndComments(store); 
}