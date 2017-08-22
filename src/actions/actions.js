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
export const DELETE_ALL_COMMENTS_FOR_POST = Symbol("DELETE_ALL_COMMENTS_FOR_POST");  //implemented
export const DELETE_PARENT_OF_COMMENTS = Symbol("DELETE_PARENT_OF_COMMENTS");        //implemented

export const ADD_CATEGORIES = Symbol("ADD_CATEGORIES"); 

const DEFAULT_VOTE_SCORE = 1; 


//======================================================================
function vote(type, id){
    return {
        type, 
        payload: {id}
    }
}

export function upvotePost(id){
    return vote(UPVOTE_POST, id); 
}

export function upvoteComment(id){
    return vote(UPVOTE_COMMENT, id)
}

export function downvotePost(id){
    return vote(DOWNVOTE_POST, id); 
}

export function downvoteComment(id){
    return vote(DOWNVOTE_COMMENT, id)
}

//=========================================================================
function edit (type, id, body, title=null){
    let timestamp  = Date.now(); 
    let updatedItem = {
        type, 
        payload: {id, 
        body, 
        timestamp}
    }

    if (title){
        updatedItem.payload["title"] = title; 
    }

    return updatedItem; 
}


export function editPost(id, body, title){
    return edit(EDIT_POST, id, body, title)
}


export function editComment(id, body){
    return edit(EDIT_COMMENT, id, body)
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

export function addPost(author, body, category, title){
    let post = add(author, body)
    return {type: ADD_NEW_POST, 
            payload: Object.assign({},  post, {title, category})
    } 
}

export function addComment(parentId, body, author){
    let comment = add(author, body)

    return {type: ADD_NEW_COMMENT, 
        payload: Object.assign({},  comment, {parentId, parentDeleted: false})

} 
    
}

//==============================================================================
function deleteItem(type, id){
   return {
       type, 
       payload: {id}
   }
}

export function deletePost(id){
    return deleteItem(DELETE_POST, id); 
}

export function deleteComment(id){
    return deleteItem(DELETE_COMMENT, id); 
}

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
function addCategories(categories){
    return {
        type: ADD_CATEGORIES, 
        categories
    }
}