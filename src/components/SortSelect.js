//this is a generic sorting component.
//it sets sort comparator function based on selected item to sort by. 
//It can be used to sort both comments and posts.
import React, { Component } from 'react';
import logo from './logo.svg';
import '../libs/bootstrap/dist/css/bootstrap.min.css'
import './Readable.css';

export const SORT_BY_DATE_DESC = "date_desc"
export const SORT_BY_DATE_ASC  = "date_asc"
export const SORT_BY_SCORE_DESC = "score_desc"
export const SORT_BY_SCORE_ASC = "score_asc"
export const SORT_BY_COMMENTS_DESC = "comments_desc"
export const SORT_BY_COMMENTS_ASC = "comments_asc"

//these functions do not really need to be part of the component class (they are generic and do not need this); at the same time 
//functionality definitely belings to this module, so keep it in. 


const textByValue = 
{[SORT_BY_DATE_DESC] : "Latest first", 
 [SORT_BY_DATE_ASC] : "Oldest first", 
 [SORT_BY_SCORE_DESC] : "Score high to low", 
 [SORT_BY_SCORE_ASC] : "Score low to high", 
 [SORT_BY_COMMENTS_DESC] :  "Number of comments high to low", 
 [SORT_BY_COMMENTS_ASC]: "Number of comments low to high"}; 


let sortByDateAscComparator=(p1, p2)=>{
    if (p1.timestamp>p2.timestamp){
        return 1; 
    }else if (p1.timestamp<p2.timestamp){
        return -1; 
    }
    return 0; 
}

let sortByDateDescComparator=(p1, p2)=>{
    return -sortByDateAscComparator(p1, p2); 
}

let sortByScoreAscComparator=(p1, p2)=>{
    if(p1.voteScore>p2.voteScore){
        return 1; 
    }else if (p1.voteScore<p2.voteScore){
        return -1; 
    }
    return 0; 
}

let sortByScoreDescComparator=(p1, p2)=>{
    return -sortByScoreAscComparator(p1, p2); 
}

let sortByNumberOfCommentsAscComparator=(p1, p2)=>{

    if(p1.numberOfComments>p2.numberOfComments){
        return 1; 
    }else if (p1.numberOfComments<p2.numberOfComments){
        return -1; 
    }
    return 0; 
}

let sortByNumberOfCommentsDescComparator=(p1,p2)=>{
    return -sortByNumberOfCommentsAscComparator(p1, p2); 
}


export function getSortComparator(sort_by){

    switch (sort_by){
        case SORT_BY_DATE_DESC: 
            return sortByDateDescComparator; 
        case SORT_BY_DATE_ASC:
            return sortByDateAscComparator; 
        case SORT_BY_SCORE_DESC: 
            return sortByScoreDescComparator; 
        case SORT_BY_SCORE_ASC:
            return sortByScoreAscComparator; 
        case SORT_BY_COMMENTS_DESC: 
            return sortByNumberOfCommentsDescComparator; 
        case SORT_BY_COMMENTS_ASC:
            return sortByNumberOfCommentsAscComparator; 
        default: 
            return sortByDateDescComparator; //this can be customized too but for this application makes no sense to do so since date desc is default sort in all use cases
    }
}

export  class SortSelect extends Component {
    handleSortSelect = (e)=>{    
        //this.setState({sortBy: e.target.value})
        let sortComparator = getSortComparator(e.target.value); 
        this.props.setSortComparator(sortComparator, e.target.value);                            
    }

    render() {

        let name = "Sort by: "
        if (this.props.name){
            name = this.props.name; 
        }

        return(
            <div className="btn-panel">
                     <span className="control-style">{name}</span>
                <select className="selectpicker" onChange={this.handleSortSelect}>
                    {this.props.sortOptions.map((item) => {
                        return <option key={item} value={item}>{textByValue[item]}</option>
                    })}
                </select>
            </div>
        )
    }

}

export default SortSelect; 