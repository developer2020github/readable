import * as lib from '../utils/lib'; 

/*Actions to support
 - Posts 
   - add new post 
   - delete post 
   - edit post 
   - upvote
   - downvote 
 - Comments 
   - add new comment 
   - delete comment
   - edit comment 
   - upvote 
   - downvote 
   - set parent post to deleted - not sure if a separate function is required 

 - Categories
   - add categories 

Since these actions are very common between posts and comments, 
for most of them implementation will be broken down into three portions: 
    - a private generic function implementing the common part of an action 
    - a customization function for post (calls generic function and then adds cutomization on top of the result
    returned by generic function)
    - a customization function for comments (same approach as for post customization)
*/

export const ADD_NEW_POST = Symbol("ADD_NEW_POST");  //implemented 
export const DELETE_POST = Symbol("DELETE_POST");    //implemented 
export const EDIT_POST = Symbol("EDIT_POST");         //implemneted 
export const UPVOTE_POST = Symbol("UPVOTE_POST");     //implemented 
export const DOWNVOTE_POST = Symbol("DOWNVOTE_POST"); //implemented

export const ADD_NEW_COMMENT = Symbol("ADD_NEW_COMMENT");   //implemented 
export const DELETE_COMMENT = Symbol("DELETE_COMMENT")      //implemented 
export const EDIT_COMMENT = Symbol("EDIT_COMMENT")          //implemented
export const UPVOTE_COMMENT = Symbol("UPVOTE_COMMENT");     //implemented
export const DOWNVOTE_COMMENT = Symbol("DOWNVOTE_COMMENT"); //implemented
export const DELETE_PARENT_OF_A_COMMENT = Symbol("DELETE_PARENT_OF_A_COMMENT");

export const ADD_CATEGORIES = Symbol("ADD_CATEGORIES"); 

const DEFAULT_VOTE_SCORE = 1; 


//======================================================================
function vote(type, id){
    return {
        type, 
        id
    }
}

export function upvotePost(id){
    return vote(UPVOTE_POST, id); 
}

export function upvoteComment(id){
    return vote(UPVOTE_COMMENT, id)
}

export function downvotePost(id){
    return vote(UPVOTE_POST, id); 
}

export function donwvoteComment(id){
    return vote(UPVOTE_COMMENT, id)
}

//=========================================================================
function edit (type, id, body, timestamp, title=null){
    let updatedItem = {
        type, 
        id, 
        body
    }

    if (title){
        updatedItem["title"] = title; 
    }

    return updatedItem; 
}


export function editPost(id, body, timestamp, title){
    return edit(EDIT_POST, id, body, timestamp, title)
}


export function editComment(id, body, timestamp){
    return edit(EDIT_COMMENT, id, body, timestamp)
}

//==========================================================================
function add (author, body, voteScore=DEFAULT_VOTE_SCORE){

    //
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

function addPost(author, body, category, title){
    let post = add(author, body)
    return {type: ADD_NEW_POST, 
            payload: Object.Assign({},  post, {title, category})
    } 
}

function addComment(parentId, body, author){
    let comment = add(author, body)

    return {type: ADD_NEW_COMMENT, 
        payload: Object.Assign({},  comment, {parentId, parentDeleted: false})

} 
    
}

//==============================================================================
function deleteItem(type, id){
   return {
       type, 
       id
   }
}

function deletePost(id){
    return deleteItem(DELETE_POST, id); 
}

function deleteComment(id){
    return deleteItem(DELETE_COMMENT, id); 
}

//===============================================================================
function addCategories(categories){
    return {
        type: ADD_CATEGORIES, 
        categories
    }
}