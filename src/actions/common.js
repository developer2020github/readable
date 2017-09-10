//========================================================
//Readable: React content and comments application
//2017
//Author:  developer2020 
//e-mail:  dev276236@gmail.com
//========================================================

//========================================================================================
//Common functions and constants for actions 
//========================================================================================
import * as lib from '../utils/lib'; 

export const DEFAULT_VOTE_SCORE = 1; 


export function add (author, body, voteScore=DEFAULT_VOTE_SCORE){
    
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
    