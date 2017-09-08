import { addPost, addCategories, addComment, updateNumberOfCommentsForPost, deletePost} from "./actions"; 
import  store  from '../store/store'
import * as lib from "../utils/lib"

export  function asyncEditComment(commentiId, body){
    /*`PUT /comments/:id`  
    **USAGE:**  
      Edit the details of an existing comment  
    
    **PARAMS:**  
      timestamp: timestamp. Get this however you want.  
      body: String  */
    

  let updatedComment = {
      body, 
      timestamp:  Date.now()
  }

  let queryString = "http://localhost:5001/comments/"  + commentiId; 

  return function(dispatch){
   

    let commentPromise  = fetch(queryString, {
                               method: 'put',
                               headers:   {
                                'Authorization': 'someAutorizatation',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(updatedComment)

                             })

      
    return commentPromise.then(function(response) {
        return response.json();
    }).catch(function(err) {
        console.log("comment put error happened!");
        console.log(err); 
    }).then(function(comment) {
        dispatch(addComment(comment.parentId, comment.body, comment.author, comment.timestamp, comment.voteScore, comment.id))
    });
                  
    }
}

export function asyncAddComment (parentId, body, author){
        
        let newComment ={
                  author, 
                  body, 
                  parentId, 
                  deleted: false, 
                  timestamp:  Date.now(), 
                  id: lib.generateUUID(), 
                  voteScore: 1 
        }
    
        return function(dispatch){
    
        let commentPromise = fetch('http://localhost:5001/comments', {
            method: 'post',
            headers: {
                'Authorization': 'someAutorizatation',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
    
        })
    
        return commentPromise.then(function(response) {
            return response.json();
        }).catch(function(err) {
            console.log("comment add error happened!");
            console.log(err); 

        }).then(function(comment) {
            dispatch(addComment(comment.parentId, comment.body, comment.author, comment.timestamp, comment.voteScore, comment.id))            
        });
        }
}



export function asyncUpVotePost(id, parentId){
    /*`POST /posts/:id`  
    **USAGE:**  
      Used for voting on a post  
  
    **PARAMS:**  
      option - String: Either "upVote" or "downVote"  */
      let action = asyncVoteOnPost(id, "upVote"); 
      return action; 
}

export function asyncDownVotePost(id, parentId){
    let action = asyncVoteOnPost(id, "downVote"); 
    return action; 
}

function asyncVoteOnPost(postId, option){
    
  let updatedPost = {
      option
  }

  let queryString = "http://localhost:5001/posts/"  + postId; 

  return function(dispatch){
   

    let postPromise  = fetch(queryString, {
                               method: 'post',
                               headers:   {
                                'Authorization': 'someAutorizatation',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(updatedPost)

                             })

      
    return postPromise.then(function(response) {
        console.log("voted ok")
        return response.json();
    }).catch(function(err) {
        console.log("voting on post error:");
    }).then(function(post) {
        //console.log("voted post"); 
        //console.log(post); 
        dispatch(addPost(post.author, post.body, post.category, post.title, post.timestamp, post.voteScore, post.id, post.deleted));
    });
                  
    }

  
}

export function asyncDeletePost(postId){
    /*`DELETE /posts/:id`  
    **USAGE:**  
      Sets the deleted flag for a post to 'true'.   
      Sets the parentDeleted flag for all child comments to 'true'.  */
      let queryString = "http://localhost:5001/posts/"  + postId;

      return function(dispatch){        
         let postPromise  = fetch(queryString, {
                                    method: 'delete',
                                    headers:   {
                                     'Authorization': 'someAutorizatation'}
     
                                  })
     
           
        return postPromise.then(function(response) {    
             if (response.status==200){
                 dispatch(deletePost(postId));
             }
             //return response.json();
         }).catch(function(err) {
             console.log("post delete error happened!");
             console.log(err);
         })        
         }
      

}

export function asyncFetchCommentOrPost(item){
  if(item.hasOwnProperty("parentId")){
     //store.dispatch()// TO BE DONE 
  }
  else{
     store.dispatch(fetchPost(item.id))
  }
}

export function asyncEditPost(postId, title, body){
 /*       
`PUT /posts/:id`  
**USAGE:**  
  Edit the details of an existing post  

**PARAMS:**  
  title - String  
  body - String  */

  let updatedPost = {
    
      title, 
      body
  }

  let queryString = "http://localhost:5001/posts/"  + postId; 

  return function(dispatch){
   

    let postPromise  = fetch(queryString, {
                               method: 'put',
                               headers:   {
                                'Authorization': 'someAutorizatation',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(updatedPost)

                             })

      
    return postPromise.then(function(response) {
       
        return response.json();
    }).catch(function(err) {
        console.log("put error happened!");
    }).then(function(post) {
       
        dispatch(addPost(post.author, post.body, post.category, post.title, post.timestamp, post.voteScore, post.id, post.deleted));
        
    });
                  
    }

}

export function asyncAddPost (author, body, category, title){

    let newPost ={
              author, 
              body, 
              category, 
              title, 
              deleted: false, 
              timestamp:  Date.now(), 
              id: lib.generateUUID(), 
              voteScore: 1 
    }

    return function(dispatch){

    let postPromise = fetch('http://localhost:5001/posts', {
        method: 'post',
        headers: {
            'Authorization': 'someAutorizatation',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)

    })

    return postPromise.then(function(response) {
        return response.json();
    }).catch(function(err) {
        console.log("error happened!");
    }).then(function(post) {
        dispatch(addPost(post.author, post.body, post.category, post.title, post.timestamp, post.voteScore, post.id, post.deleted));
    });
    }
}

export function fetchCommentsForPost(postId){
    //GET /posts/:id/comments
    //let queryString = "http://localhost:5001/posts/8xf0y6ziyjabvozdd253nd/comments"
    //console.log("fetching comments for post " + postId)
    //console.log(queryString)
    let queryString = "http://localhost:5001/posts/" + postId + "/comments"
    return function(dispatch){

               // console.log("fetchCommentsForPost"); 
               // console.log("queryString"); 
               // console.log(queryString); 

                let commentsPromise = fetch(queryString, {
                    method: 'get',
                    headers: { 'Authorization': 'someAutorizatation' }
                })
                
                return commentsPromise.then(function(response) {
                 //   console.log("getting comments!")
                    return response.json();
                    }
                ).catch(function(err) {
                    console.log("error happened!");
                }).then(function(comments) {
                    let numberOfCommentsForPost = 0; 
                    for (let idx in comments){
                        //dispatch(addPost(posts[idx].author, posts[idx].body, posts[idx].category, posts[idx].title, posts[idx].timestamp, posts[idx].voteScore, posts[idx].id)); 
                        //addComment(parentId, body, author,  timestamp=null, voteScore=null, id=null)
                        if (!comments[idx].deleted){
                            numberOfCommentsForPost++; 
                        }
                        dispatch(addComment(comments[idx].parentId, comments[idx].body, comments[idx].author, comments[idx].timestamp, comments[idx].voteScore, comments[idx].id))
                    }
                
                    dispatch(updateNumberOfCommentsForPost(postId, numberOfCommentsForPost))
        
                });
        }

}

export function fetchPost(postId){
    let queryString = "http://localhost:5001/posts/" + postId
    return function(dispatch){

                let postPromise = fetch(queryString, {
                    method: 'get',
                    headers: { 'Authorization': 'someAutorizatation' }
                })
                
                return postPromise.then(function(response) {
                    return response.json();
                    }
                ).catch(function(err) {
                    console.log("error happened!");
                }).then(function(post) {
                    dispatch(addPost(post.author, post.body, post.category, post.title, post.timestamp, post.voteScore, post.id, post.deleted));
                });
        }
}


export function asyncFetchAllPosts(){
    //tested and worked 

    return function(dispatch){

        let postsPromise = fetch('http://localhost:5001/posts', {
            method: 'get',
            headers: { 'Authorization': 'someAutorizatation' }
        })
        //console.log("postsPromise")
        //console.log(postsPromise)

        return postsPromise.then(function(response) {
            //console.log("server responded with:");
            //console.log(response);
            //console.log("response converted to json");
            return response.json();
            }
        ).catch(function(err) {
            console.log("error happened!");
        }).then(function(posts) {
            // `data` is the parsed version of the JSON returned from the above endpoint.
            //console.log("parsed data")
            //console.log(posts)
            //console.log(data); // { "userId": 1, "id": 1, "title": "...", "body": "..." }
            //author, body, category, title, timestamp=null, voteScore=null, id=null
            for (let idx in posts){
                //console.log("dispatcthing addPost"); 
                //console.log(posts[idx]); 
                //addPost(author, body, category, title, timestamp=null, voteScore=null, id=null)
                dispatch(addPost(posts[idx].author, posts[idx].body, posts[idx].category, posts[idx].title, posts[idx].timestamp, posts[idx].voteScore, posts[idx].id, posts[idx].deleted)); 
                //posts really should have number of comments on them! Since this is not done on server side and I cannot change API, just load all comments from server
                dispatch(fetchCommentsForPost(posts[idx].id))
            }

        });
    }
}

export function asyncFetchAllCategories(){
    
    return function(dispatch){
        
                let postsPromise = fetch('http://localhost:5001/categories', {
                    method: 'get',
                    headers: { 'Authorization': 'someAutorizatation' }
                })
                //console.log("postsPromise")
                //console.log(postsPromise)
        
                return postsPromise.then(function(response) {
                    //console.log("server responded with:");
                    //console.log(response);
                    //console.log("response converted to json");
                    return response.json();
                    }
                ).catch(function(err) {
                    console.log("error happened!");
                }).then(function(categories) {
                    // `data` is the parsed version of the JSON returned from the above endpoint.
                    //console.log("parsed data")
                    //console.log(posts)
                    //console.log(data); // { "userId": 1, "id": 1, "title": "...", "body": "..." }
                    //author, body, category, title, timestamp=null, voteScore=null, id=null
                    //for (let idx in posts){
                        //console.log("dispatcthing addPost"); 
                        //console.log(posts[idx]); 
                        //addPost(author, body, category, title, timestamp=null, voteScore=null, id=null)
                      //  dispatch(addPost(posts[idx].author, posts[idx].body, posts[idx].category, posts[idx].title, posts[idx].voteScore, posts[idx].id)); 
                    //}
                    console.log("categories")
                    console.log(categories)
                
                    let categoriesArray = categories.categories
                    

                    dispatch(addCategories(categoriesArray.map(function(c){return c.name})))
        
                });
            }

}

