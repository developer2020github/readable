/*
the store is going to have following structure: 
{
    categories - an array of available catagories; will be set only once. Immutable. 
    posts -  a dictionary of posts by ID 
    comments - a dictionaty of comments by ID 
}
*/

import * as actions from '../actions/actions'; 
export function categories(state, action){
    switch (action.type){
        case actions.ADD_CATEGORIES :
         return Object.assign({}, state, {categories: action.categoires})
        default: 
         return state; 
    }
}


export function posts(state, action){
    let currentPost = null; 
    let updatedPost = null; 

    switch (action.type){
       
       case actions.ADD_NEW_POST:
             return {...state, [action.payload.id]: action.payload}

       case actions.DELETE_POST:
            currentPost = state[action.payload.id]; 
            let deletedPost = {...currentPost, deleted: true}; 
            return {...state, [action.payload.id]: deletedPost}


       case actions.EDIT_POST:
            currentPost = state[action.payload.id]; 
            updatedPost = {...currentPost, 
                                  body: action.payload.body, 
                                  title: action.payload.title, 
                                  timestamp: action.payload.timestamp}; 

            return {...state, [action.payload.id]: updatedPost}; 
        
       case actions.UPVOTE_POST:
            currentPost = state[action.payload.id];
            updatedPost = {...currentPost, 
                voteScore: currentPost.voteScore + 1}
            return {...state, [action.payload.id]: updatedPost}; 

       case actions.DOWNVOTE_POST:
            currentPost = state[action.payload.id];
            updatedPost = {...currentPost, 
                voteScore: currentPost.voteScore - 1}
            return {...state, [action.payload.id]: updatedPost}; 

       default: 
            return state; 

    }
}


export function comments(state, action){
    let currentComment = null; 
    let updatedComment = null; 
    let newState = {};  

    switch (action.type){
        case actions.ADD_NEW_COMMENT: 
            return {...state, [action.payload.id]: action.payload}

        case actions.DELETE_COMMENT:
            currentComment = state[action.payload.id]; 
            let deletedComment = {...currentComment, deleted: true}; 
            return {...state, [action.payload.id]: deletedComment}; 

        case actions.EDIT_COMMENT:
            currentComment = state[action.payload.id]; 
            updatedComment = {...currentComment, 
                              body: action.payload.body, 
                              timestamp: action.payload.timestamp}; 

            return {...state, [action.payload.id]: updatedComment}; 

        case actions.UPVOTE_COMMENT:
            currentComment = state[action.payload.id];
            updatedComment = {...currentComment, 
                voteScore: currentComment.voteScore + 1}
            return {...state, [action.payload.id]: updatedComment}; 

        case actions.DOWNVOTE_COMMENT:
            currentComment = state[action.payload.id];
            updatedComment = {...currentComment, 
                voteScore: currentComment.voteScore -1 }
            return {...state, [action.payload.id]: updatedComment}; 

            
        case actions.DELETE_ALL_COMMENTS_FOR_POST:
          
            for (let commentId in state){
                newState[commentId] = {...state[commentId]}; 

                if (newState[commentId].parentId===action.payload.parentId){
                    newState[commentId].deleted=true; 
                }

            }
            return newState; 

        case actions.DELETE_PARENT_OF_COMMENTS:
         
            for (let commentId in state){
                newState[commentId] = {...state[commentId]}; 

                if (newState[commentId].parentId===action.payload.parentId){
                    newState[commentId].parentDeleted=true; 
                }

            }
            return newState;

        default: 
            return state; 

    }
}