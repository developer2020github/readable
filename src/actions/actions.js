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
   - set parent post to deleted
*/

export const ADD_NEW_POST = Symbol("ADD_NEW_POST"); 
export const DELETE_POST = Symbol("DELETE_POST")
export const EDIT_POST = Symbol("EDIT_POST")
export const UPVOTE_POST = Symbol("UPVOTE_POST") //implemented 
export const DOWNVOTE_POST = Symbol("DOWNVOTE_POST")//implemented

export const ADD_NEW_COMMENT = Symbol("ADD_NEW_COMMENT"); 
export const DELETE_COMMENT = Symbol("DELETE_COMMENT")
export const EDIT_COMMENT = Symbol("EDIT_COMMENT")
export const UPVOTE_COMMENT = Symbol("UPVOTE_COMMENT") //implemented
export const DOWNVOTE_COMMENT = Symbol("DOWNVOTE_COMMENT")//implemented

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

    return updated_item; 
}


export function editPost(id, body, timestamp, title){
    return edit(EDIT_POST, id, body, timestamp, title)
}

export function editComment(id, body, timestamp){
    return edit(EDIT_COMMENT, id, body, timestamp)
}