import * as actions from "../actions/actions"
import { getCommentstAndPosts } from "../utils/ServerApiTest"
function addCategories(store){
  let myCategories =  ["react", "redux", "udacity"]; 
  store.dispatch(actions.addCategories(myCategories))
}

function addPostsAndComments(store){
   let postsAndComments = getCommentstAndPosts(25, 3, 6); 

   for (let postId in postsAndComments.posts){
        store.dispatch(actions.addPost(postsAndComments.posts[postId])); 
   }

   for (let commentId in postsAndComments.comments){
       store.dispatch(actions.addComment(postsAndComments.comments[commentId]))
   }
}

export function populateStore(store){
    addCategories(store); 
    addPostsAndComments(store); 
}