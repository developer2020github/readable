//========================================================
//Readable: React content and comments application
//2017
//Author:  developer2020 
//e-mail:  dev276236@gmail.com
//========================================================

//========================================================================================
//This module defines normal Redux actions used to update local Redux store
//========================================================================================

import * as lib from '../utils/lib'; 

//=========================================================================
//Action type defintions 
export const ADD_NEW_POST = Symbol("ADD_NEW_POST");  
export const DELETE_POST = Symbol("DELETE_POST");    
export const EDIT_POST = Symbol("EDIT_POST");        
export const UPVOTE_POST = Symbol("UPVOTE_POST");    
export const DOWNVOTE_POST = Symbol("DOWNVOTE_POST");
export const UPDATE_NUMBER_OF_COMMENTS_FOR_POST = Symbol("UPDATE_NUMBER_OF_COMMENTS_FOR_POST")
export const CLEAR_ALL_POSTS = Symbol("CLEAR_ALL_POSTS")

export const ADD_NEW_COMMENT = Symbol("ADD_NEW_COMMENT");   
export const DELETE_COMMENT = Symbol("DELETE_COMMENT")      
export const EDIT_COMMENT = Symbol("EDIT_COMMENT")          
export const UPVOTE_COMMENT = Symbol("UPVOTE_COMMENT");     
export const DOWNVOTE_COMMENT = Symbol("DOWNVOTE_COMMENT"); 
export const DELETE_ALL_COMMENTS_FOR_POST = Symbol("DELETE_ALL_COMMENTS_FOR_POST");  
export const DELETE_PARENT_OF_COMMENTS = Symbol("DELETE_PARENT_OF_COMMENTS");        
export const CLEAR_LIST_OF_COMMENTS_FOR_POST = Symbol("CLEAR_LIST_OF_COMMENTS_FOR_POST")

export const ADD_CATEGORIES = Symbol("ADD_CATEGORIES"); 
//========================================================================

const DEFAULT_VOTE_SCORE = 1; 

//remove all posts from local store
export function clearAllPosts(){
    return {type: CLEAR_ALL_POSTS}
}


//remove all comments for a particular post from local store 
export function clearListOfCommentsForPost(parentId){
    return {
        
            type: CLEAR_LIST_OF_COMMENTS_FOR_POST, 
            payload: {
                parentId
            }
        }
    
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

export function upvoteComment(id, parentId){
    return {
        type: UPVOTE_COMMENT, 
        payload: {
            id, 
            parentId
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

export function downvoteComment(id, parentId){
    return {
        type: DOWNVOTE_COMMENT, 
        payload: {
            id, 
            parentId
        }
    }
}

//=========================================================================
//post and comment edit actions 


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


export function editComment(id, parentId,  author, body){
    //return edit(EDIT_COMMENT, id, author, parentId, body)
    let timestamp  = Date.now(); 
    return {
        type :EDIT_COMMENT, 
        payload: {id, 
        parentId, 
        body,
        author,  
        timestamp}
    }

}

//==========================================================================
//Addition/update of posts and comments; if add is called on existing post or comment, 
//it will overwrite it; otherwise new local entry for post or commetn will be created.
function add (author, body, voteScore=DEFAULT_VOTE_SCORE){

    let timestamp  = Date.now(); 
    let id = lib.generateUUID(); 

    return {
        author, 
        body, 
        timestamp, 
        voteScore, 
        deleted: false, 
        id
    }
}


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

export function addComment(parentId, body, author,  timestamp=null, voteScore=null, id=null,  deleted=null){
    let comment = add(author, body); 
    let payload = Object.assign({},  comment, {parentId, parentDeleted: false})

    if (timestamp){ payload.timestamp=timestamp; }

    if (voteScore){ payload.voteScore=voteScore; }

    if (id){payload.id = id; }

    if(deleted!==null){payload.deleted=deleted; }

    return {type: ADD_NEW_COMMENT, 
        payload
     } 
}

//==============================================================================

export function deletePost(id){
    return {
        type: DELETE_POST, 
        payload: {id}
    }
}

export function deleteComment(id, parentId){
     return {
         type: DELETE_COMMENT, 
         payload: {id, 
                   parentId}
     }
    
}


//set delete to true for all comments 
export function deleteAllCommentsForPost(parentId){
    return{
        type: DELETE_ALL_COMMENTS_FOR_POST, 
        payload : {parentId}
    }
}

export function deleteParentOfComments(parentId){
    return{
        type: DELETE_PARENT_OF_COMMENTS, 
        payload : {parentId}
    }
}


//DELETE_PARENT_OF_COMMENTS
//===============================================================================
export function addCategories(categories){
    
    return {
        type: ADD_CATEGORIES, 
        categories
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