//========================================================
//Readable: React content and comments application
//2017
//Author:  developer2020 
//e-mail:  dev276236@gmail.com
//========================================================

//========================================================================================
//This module defines normal Redux actions for posts used to update local Redux store
//========================================================================================

import { add }  from "./common"

//=========================================================================
//Action type defintions 
export const ADD_NEW_POST = Symbol("ADD_NEW_POST");  
export const DELETE_POST = Symbol("DELETE_POST");    
export const EDIT_POST = Symbol("EDIT_POST");        
export const UPVOTE_POST = Symbol("UPVOTE_POST");    
export const DOWNVOTE_POST = Symbol("DOWNVOTE_POST");
export const UPDATE_NUMBER_OF_COMMENTS_FOR_POST = Symbol("UPDATE_NUMBER_OF_COMMENTS_FOR_POST")
export const CLEAR_ALL_POSTS = Symbol("CLEAR_ALL_POSTS")

 
//========================================================================
//remove all posts from local store
export function clearAllPosts(){
    return {type: CLEAR_ALL_POSTS}
}



//======================================================================
//local voting actions; not used in current version of the application but 
//are useful for GUI testing without server; so keep them
export function upvotePost(id, parentId){
    return {
        type: UPVOTE_POST, 
        payload: {
            id
        }
    }
}


export function downvotePost(id, parentId){
    return {
        type: DOWNVOTE_POST, 
        payload: {
            id
        }
    }
}


export function editPost(id, body,  title, category=null){

    let timestamp  = Date.now(); 
    let updatedPost = {
        type: EDIT_POST,
        payload: {id, 
        title, 
        body,
        timestamp}
    }

    //category edit is not supported by current version of server s/w; but 
    //it is not difficult to include. So keep it optional. 
    if (category){ updatedPost.payload['category'] = category;}
    return updatedPost 
    
}


//==========================================================================
//Addition/update of posts; if add is called on existing post or comment, 
//it will overwrite it; otherwise new local entry for post or commetn will be created.
export function addPost(author, body, category, title, timestamp=null, voteScore=null, id=null, deleted=null){
    
    let post = add(author, body); 
    let payload =  Object.assign({},  post, {title, category})

    if (timestamp){ payload.timestamp=timestamp; }

    if (voteScore){ payload.voteScore=voteScore; }

    if (id){ payload.id=id; }
    
    if (deleted!==null){ payload.deleted=deleted}

    return {type: ADD_NEW_POST, 
            payload
    } 
}

export function deletePost(id){
    return {
        type: DELETE_POST, 
        payload: {id}
    }
}


export function updateNumberOfCommentsForPost(id, numberOfComments){
    return{
        type: UPDATE_NUMBER_OF_COMMENTS_FOR_POST, 
        payload: 
            { id, 
              numberOfComments
            }
    }
}