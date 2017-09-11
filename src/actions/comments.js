//========================================================
//Readable: React content and comments application
//2017
//Author:  developer2020 
//e-mail:  dev276236@gmail.com
//========================================================

//========================================================================================
//This module defines normal Redux actions used to update local Redux store for comments
//========================================================================================

import { add }  from "./common"
//=========================================================================
//Action type defintions 
export const ADD_NEW_COMMENT = Symbol("ADD_NEW_COMMENT");   
export const DELETE_COMMENT = Symbol("DELETE_COMMENT")      
export const EDIT_COMMENT = Symbol("EDIT_COMMENT")          
export const UPVOTE_COMMENT = Symbol("UPVOTE_COMMENT");     
export const DOWNVOTE_COMMENT = Symbol("DOWNVOTE_COMMENT"); 
export const DELETE_ALL_COMMENTS_FOR_POST = Symbol("DELETE_ALL_COMMENTS_FOR_POST");  
export const DELETE_PARENT_OF_COMMENTS = Symbol("DELETE_PARENT_OF_COMMENTS");        
export const CLEAR_LIST_OF_COMMENTS_FOR_POST = Symbol("CLEAR_LIST_OF_COMMENTS_FOR_POST")

; 

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

export function upvoteComment(id, parentId){
    return {
        type: UPVOTE_COMMENT, 
        payload: {
            id, 
            parentId
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
//Addition/update of comments; if add is called on existing post or comment, 
//it will overwrite it; otherwise new local entry for the comment will be created.

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
