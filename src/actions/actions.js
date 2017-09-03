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
function edit (type, id, author, body, category=null, title=null){
    let timestamp  = Date.now(); 
    let updatedItem = {
        type, 
        payload: {id, 
        body,
        author,  
        timestamp}
    }

    if (title){
        updatedItem.payload["title"] = title; 
    }
    
    if (category){
        updatedItem.payload['category'] = category;
    }
    return updatedItem; 
}


//values.author, values.body, values.category, values.title
export function editPost(id, author, body, category, title){
    return edit(EDIT_POST, id, author, body, category, title)
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


export function addPost(author, body, category, title, timestamp=null, voteScore=null, id=null){
    
    let post = add(author, body); 
    let payload =  Object.assign({},  post, {title, category})

    if (timestamp){
        //need this mainly for debugging purposes: if timestamp is passed - use it instead of assigning current time 
       payload.timestamp=timestamp; 
    }

    if (voteScore){
        //need this mainly for debugging purposes: if voteScore is passed - use it instead of assigning default
       payload.voteScore=voteScore; 
    }

    if (id){
        payload.id = id
    }

    return {type: ADD_NEW_POST, 
            payload
    } 
}

export function addComment(parentId, body, author,  timestamp=null, voteScore=null, id=null){
    let comment = add(author, body); 
    let payload = Object.assign({},  comment, {parentId, parentDeleted: false})

    if (timestamp){
        //need this mainly for debugging purposes: if timestamp is passed - use it instead of assigning current time 
       payload.timestamp=timestamp; 
    }

    if (voteScore){
        //need this mainly for debugging purposes: if voteScore is passed - use it instead of assigning default
       payload.voteScore=voteScore; 
    }

    if (id){
        payload.id = id; 
    }


    return {type: ADD_NEW_COMMENT, 
        payload
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

export function deleteComment(id, parentId){
     return {
         type: DELETE_COMMENT, 
         payload: {id, 
                   parentId}
     }
    //return deleteItem(DELETE_COMMENT, id); 
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
export function addCategories(categories){
    
    return {
        type: ADD_CATEGORIES, 
        categories
    }
}