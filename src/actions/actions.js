//========================================================
//Readable: React content and comments application
//2017
//Author:  developer2020 
//e-mail:  dev276236@gmail.com
//========================================================

//========================================================================================
//This module defines normal Redux actions that do not ift into actions 
//for posts or action for categories used to update local Redux store
//========================================================================================


export const ADD_CATEGORIES = Symbol("ADD_CATEGORIES"); 

export function addCategories(categories){
    
    return {
        type: ADD_CATEGORIES, 
        categories
    }
}
