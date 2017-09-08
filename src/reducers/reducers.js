/*
the store is going to have following structure: 
{
    categories - an array of available catagories; will be set only once. Immutable. 
    posts -  a dictionary of posts by ID 
    comments - a dictionaty of comments by ID 
}
*/
import { combineReducers } from 'redux'; 

import * as actions from '../actions/actions'; 

export function categories(state=null, action){

    switch (action.type){
        case actions.ADD_CATEGORIES :
          return  action.categories.slice(0)
        default: 
         return state; 
    }
}


export function posts(state=null, action){
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
            updatedPost = {...currentPost, ...action.payload}; 

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

       case actions.UPDATE_NUMBER_OF_COMMENTS_FOR_POST: 
           
            currentPost = state[action.payload.id];
            updatedPost = {...currentPost, 
                numberOfComments: action.payload.numberOfComments}
           
            return {...state, [action.payload.id]: updatedPost}; 

        case actions.CLEAR_ALL_POSTS: 
            //delete all local posts 
            return null;
       default: 
            return state; 

    }
}


export function comments(state={}, action){
    let currentComment = null; 
    let updatedComment = null; 
    let newState = null;  

    switch (action.type){
        case actions.ADD_NEW_COMMENT: 
            
            //return {...state, [action.payload.id]: action.payload}
            let newCommentItem = { [action.payload.id]: action.payload}; 
            /*
            console.log("adding comment")
            console.log(state)
            console.log(newCommentItem)*/

            //let newState = null; 

            if (state.hasOwnProperty(action.payload.parentId)){
                 //console.log("already exists!")

                 let updatedExistingComments = {...state[action.payload.parentId], [action.payload.id]: action.payload}

                 //console.log(updatedExistingComments)
                 newState = {...state,  [action.payload.parentId]: updatedExistingComments}
                 //console.log(newState)
            }else {
                //console.log("does not exist")
                newState = {...state, [action.payload.parentId]: newCommentItem}
                //console.log(newState)
            }

            //console.log(""); 

            return newState; 

        case actions.DELETE_COMMENT:
           /* 
            console.log("deleting a comment")
            console.log(action)*/
            currentComment = state[action.payload.parentId][action.payload.id]; 
            //console.log(currentComment)
            let deletedComment = {...currentComment, deleted: true}; 
            
            

            newState = {...state,  
                           [action.payload.parentId]:  
                                                    {...state[action.payload.parentId],
                                                     [action.payload.id]: deletedComment}  }
            //return {...state, [action.payload.id]: deletedComment}; 
            return newState


        case actions.EDIT_COMMENT:
           
            currentComment = state[action.payload.parentId][action.payload.id]; 

            updatedComment = {...currentComment, ...action.payload}; 
    
            newState = {...state,  
                [action.payload.parentId]:  
                                         {...state[action.payload.parentId],
                                          [action.payload.id]: updatedComment}  }
            return newState; 


        case actions.UPVOTE_COMMENT:
            currentComment = state[action.payload.parentId][action.payload.id];
            updatedComment = {...currentComment, 
                voteScore: currentComment.voteScore + 1}

            return {...state, 
                     [action.payload.parentId]: 
                     {...state[action.payload.parentId], 
                        [action.payload.id] : updatedComment}}; 

        case actions.DOWNVOTE_COMMENT:
            currentComment = state[action.payload.parentId][action.payload.id];
            updatedComment = {...currentComment, 
                voteScore: currentComment.voteScore + 1}

            return {...state, 
                    [action.payload.parentId]: 
                    {...state[action.payload.parentId], 
                        [action.payload.id] : updatedComment}}; 

            
        case actions.DELETE_ALL_COMMENTS_FOR_POST:
            newState = {...state}

            for (let commentId in newState[action.payload.parentId]){

                newState[action.payload.parentId][commentId].deleted = true 
            }

            return newState; 

        case actions.DELETE_PARENT_OF_COMMENTS:
         
            newState = {...state}
        
            for (let commentId in newState[action.payload.parentId]){
        
                        newState[action.payload.parentId][commentId].parentDeleted = true 
            }
            return newState; 
        case actions.CLEAR_LIST_OF_COMMENTS_FOR_POST:
            newState = {...state}
            if (newState.hasOwnProperty(action.payload.parentId)){
               delete newState[action.payload.parentId]
            }
    
            return newState; 

        default: 
            return state; 

    }
}


export const reducer = combineReducers({
    categories, 
    posts, 
    comments,
 })