import { addPost, addCategories, addComment, updateNumberOfCommentsForPost} from "./actions"; 

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
                        dispatch(addComment(comments[idx].parentId, comments[idx].body, comments[idx].authour, comments[idx].timestamp, comments[idx].voteScore, comments[idx].id))
                    }
                
                    dispatch(updateNumberOfCommentsForPost(postId, numberOfCommentsForPost))
        
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
                dispatch(addPost(posts[idx].author, posts[idx].body, posts[idx].category, posts[idx].title, posts[idx].timestamp, posts[idx].voteScore, posts[idx].id)); 
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

