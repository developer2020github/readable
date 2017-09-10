
//========================================================
//Readable: React content and comments application
//2017
//Author:  developer2020 
//e-mail:  dev276236@gmail.com
//========================================================

//========================================================================================
//Redux store reducers.
//The store has following structure: 
//{
//    categories - an array of available catagories; will be set only once. Immutable. 
//    posts -  a dictionary of posts by ID 
//    comments - {a dictionaty of objects by parent post ID} ; each object contains 
//               a dictinary of comments by comment id
//}

import { combineReducers } from 'redux'; 

import * as actions from '../actions/actions'; 
import * as commentActions from '../actions/comments'; 
import * as postActions from '../actions/posts'; 

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
       
       case postActions.ADD_NEW_POST:
             return {...state, [action.payload.id]: action.payload}

       case postActions.DELETE_POST:
            if (state.hasOwnProperty(action.payload.id)){
            currentPost = state[action.payload.id]; 
            let deletedPost = {...currentPost, deleted: true}; 
            return {...state, [action.payload.id]: deletedPost}
            }
            
            return state; 


       case postActions.EDIT_POST:
            currentPost = state[action.payload.id]; 
            updatedPost = {...currentPost, ...action.payload}; 

            return {...state, [action.payload.id]: updatedPost}; 
        
       case postActions.UPVOTE_POST:
            currentPost = state[action.payload.id];
            updatedPost = {...currentPost, 
                voteScore: currentPost.voteScore + 1}
            return {...state, [action.payload.id]: updatedPost}; 

       case postActions.DOWNVOTE_POST:
            currentPost = state[action.payload.id];
            updatedPost = {...currentPost, 
                voteScore: currentPost.voteScore - 1}
            return {...state, [action.payload.id]: updatedPost}; 

       case postActions.UPDATE_NUMBER_OF_COMMENTS_FOR_POST: 
           
            currentPost = state[action.payload.id];
            updatedPost = {...currentPost, 
                numberOfComments: action.payload.numberOfComments}
           
            return {...state, [action.payload.id]: updatedPost}; 

        case postActions.CLEAR_ALL_POSTS: 
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
        case commentActions.ADD_NEW_COMMENT: 
            

            let newCommentItem = { [action.payload.id]: action.payload}; 


            if (state.hasOwnProperty(action.payload.parentId)){

                 let updatedExistingComments = {...state[action.payload.parentId], [action.payload.id]: action.payload}
                 newState = {...state,  [action.payload.parentId]: updatedExistingComments}
                
            }else {
                newState = {...state, [action.payload.parentId]: newCommentItem}
            }


            return newState; 

        case commentActions.DELETE_COMMENT:
            currentComment = state[action.payload.parentId][action.payload.id]; 

            let deletedComment = {...currentComment, deleted: true}; 
            
            

            newState = {...state,  
                           [action.payload.parentId]:  
                                                    {...state[action.payload.parentId],
                                                     [action.payload.id]: deletedComment}  }
            return newState


        case commentActions.EDIT_COMMENT:
           
            currentComment = state[action.payload.parentId][action.payload.id]; 

            updatedComment = {...currentComment, ...action.payload}; 
    
            newState = {...state,  
                [action.payload.parentId]:  
                                         {...state[action.payload.parentId],
                                          [action.payload.id]: updatedComment}  }
            return newState; 


        case commentActions.UPVOTE_COMMENT:
            currentComment = state[action.payload.parentId][action.payload.id];
            updatedComment = {...currentComment, 
                voteScore: currentComment.voteScore + 1}

            return {...state, 
                     [action.payload.parentId]: 
                     {...state[action.payload.parentId], 
                        [action.payload.id] : updatedComment}}; 

        case commentActions.DOWNVOTE_COMMENT:
            currentComment = state[action.payload.parentId][action.payload.id];
            updatedComment = {...currentComment, 
                voteScore: currentComment.voteScore + 1}

            return {...state, 
                    [action.payload.parentId]: 
                    {...state[action.payload.parentId], 
                        [action.payload.id] : updatedComment}}; 

            
        case commentActions.DELETE_ALL_COMMENTS_FOR_POST:
            newState = {...state}

            for (let commentId in newState[action.payload.parentId]){

                newState[action.payload.parentId][commentId].deleted = true 
            }

            return newState; 

        case commentActions.DELETE_PARENT_OF_COMMENTS:
         
            newState = {...state}
        
            for (let commentId in newState[action.payload.parentId]){
        
                        newState[action.payload.parentId][commentId].parentDeleted = true 
            }
            return newState; 
        case commentActions.CLEAR_LIST_OF_COMMENTS_FOR_POST:
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