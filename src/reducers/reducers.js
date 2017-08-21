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
    switch (action.type){
       case actions.ADD_NEW_POST:
         return {...state, [action.payload.id]: action.payload}
       case actions.DELETE_POST:
       case actions.EDIT_POST:
       case actions.UPVOTE_POST:
       case actions.DOWNVOTE_POST:

       default: 
         return state; 

    }
}


