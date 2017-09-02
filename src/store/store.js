

import { createStore, applyMiddleware } from 'redux'
import { reducer } from '../reducers/reducers'
import thunk from 'redux-thunk';
import * as lib from "../utils/lib"
import { addPost, addCategories} from "../actions/actions"; 




function asyncFetchAllPosts(){
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
                dispatch(addPost(posts[idx].author, posts[idx].body, posts[idx].category, posts[idx].title, posts[idx].voteScore, posts[idx].id)); 
            }

        });
    }
}

function asyncFetchAllCategories(){
    
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




//const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const store =  createStore(reducer, applyMiddleware(thunk));
export {asyncFetchAllPosts}
export {asyncFetchAllCategories}

export default store 