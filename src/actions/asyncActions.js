//========================================================
//Readale: React content and comments application
//2017
//Author:  developer2020 
//e-mail:  dev276236@gmail.com
//========================================================

//========================================================================================
//This module defines asynchronous actions, applied via Thunk middleware
//function names are self-explanatory.
//========================================================================================

import { addPost, addCategories, addComment, updateNumberOfCommentsForPost, deletePost, deleteComment, clearListOfCommentsForPost, clearAllPosts } from "./actions";
import store from '../store/store'
import * as lib from "../utils/lib"

const ROOT_URL = "http://localhost:5001/"
const AUTHORIZATION_STRING = "Authorization"

//===================================================================
/* vote on comment */
export function asyncUpVoteComment(id) {
    let action = asyncVoteOnComment(id, "upVote");
    return action;
}


export function asyncDownVoteComment(id) {
    let action = asyncVoteOnComment(id, "downVote");
    return action;
}


function asyncVoteOnComment(commentId, option) {

    let updatedComment = { option };
    let queryString = ROOT_URL + "comments/" + commentId;

    return function (dispatch) {
        let postPromise = fetch(queryString, {
            method: 'post',
            headers: { 'Authorization': AUTHORIZATION_STRING, 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedComment)
        })
        return postPromise.then(function (response) {
            return response.json();
        }).catch(function (err) {
            console.log("voting on comment error:");
            console.log(err)
        }).then(function (comment) {
            dispatch(addComment(comment.parentId, comment.body, comment.author, comment.timestamp, comment.voteScore, comment.id))
        });
    }
}


//===================================================================
export function asyncDeleteComment(commentId, parentId) {

    let queryString = ROOT_URL + "comments/" + commentId;

    return function (dispatch) {
        let commentPromise = fetch(queryString, {
            method: 'delete',
            headers: { 'Authorization': AUTHORIZATION_STRING}
        })

        return commentPromise.then(function (response) {
            if (response.status == 200) {
                dispatch(fetchPost(parentId)); //this will update all comments as well
            }
        }).catch(function (err) {
            console.log("comment delete error:");
            console.log(err);
        })
    }
}


export function asyncEditComment(commentiId, body) {
    
    let updatedComment = {
        body,
        timestamp: Date.now()
    }

    let queryString = ROOT_URL + "comments/" + commentiId;

    return function (dispatch) {

        let commentPromise = fetch(queryString, {
            method: 'put',
            headers: { 'Authorization': AUTHORIZATION_STRING, 'Content-Type': 'application/json'},
            body: JSON.stringify(updatedComment)
        })

        return commentPromise.then(function (response) {
            return response.json();
        }).catch(function (err) {
            console.log("comment put error happened!");
            console.log(err);
        }).then(function (comment) {
            dispatch(addComment(comment.parentId, comment.body, comment.author, comment.timestamp, comment.voteScore, comment.id))
        });

    }
}


export function asyncAddComment(parentId, body, author) {
    let newComment = {
        author,
        body,
        parentId,
        deleted: false,
        timestamp: Date.now(),
        id: lib.generateUUID(),
        voteScore: 1
    }
    let queryString = ROOT_URL + "comments";

    return function (dispatch) {
        let commentPromise = fetch(queryString, {
            method: 'post',
            headers: { 'Authorization': AUTHORIZATION_STRING, 'Content-Type': 'application/json' },
            body: JSON.stringify(newComment)
        })

        return commentPromise.then(function (response) {
            return response.json();
        }).catch(function (err) {
            console.log("comment add error:");
            console.log(err);
        }).then(function (comment) {
            dispatch(addComment(comment.parentId, comment.body, comment.author, comment.timestamp, comment.voteScore, comment.id)); 
            dispatch(fetchPost(parentId));//need this to update number of comments and to see if there are any other changes to comments
        });
    }
}


//===================================================================
//vote on post 
export function asyncUpVotePost(id) {
    let action = asyncVoteOnPost(id, "upVote");
    return action;
}


export function asyncDownVotePost(id) {
    let action = asyncVoteOnPost(id, "downVote");
    return action;
}

function asyncVoteOnPost(postId, option) {

    let updatedPost = { option }
    let queryString = ROOT_URL + "posts/" + postId;

    return function (dispatch) {
        let postPromise = fetch(queryString, {
            method: 'post',
            headers: { 'Authorization': AUTHORIZATION_STRING, 'Content-Type': 'application/json'},
            body: JSON.stringify(updatedPost)
        })

        return postPromise.then(function (response) {
            return response.json();
        }).catch(function (err) {
            console.log("voting on post error:");
            console.log(err); 
        }).then(function (post) {
            dispatch(addPost(post.author, post.body, post.category, post.title, post.timestamp, post.voteScore, post.id, post.deleted));
        });
    }
}


export function asyncDeletePost(postId) {

    let queryString = ROOT_URL + "posts/" + postId;

    return function (dispatch) {
        let postPromise = fetch(queryString, {
            method: 'delete',
            headers: {'Authorization': AUTHORIZATION_STRING}
        })

        return postPromise.then(function (response) {
            if (response.status == 200) {
                dispatch(deletePost(postId));
            }
        }).catch(function (err) {
            console.log("post delete error");
            console.log(err); 
        })
    }
}


export function asyncFetchCommentOrPost(item) {
    if (item.hasOwnProperty("parentId")) {
        store.dispatch(fetchComment())
    }
    else {
        store.dispatch(fetchPost(item.id))
    }
}


export function asyncEditPost(postId, title, body) {
    let updatedPost = {
        title,
        body
    }

    let queryString = ROOT_URL + "posts/" + postId;

    return function (dispatch) {

    let postPromise = fetch(queryString, {
            method: 'put',
            headers: {'Authorization': AUTHORIZATION_STRING, 'Content-Type': 'application/json'},
            body: JSON.stringify(updatedPost)
        })

        return postPromise.then(function (response) {
            return response.json();
        }).catch(function (err) {
            console.log("edit post  error");
            console.log(err);
        }).then(function (post) {
            dispatch(addPost(post.author, post.body, post.category, post.title, post.timestamp, post.voteScore, post.id, post.deleted));
        });
    }
}


export function asyncAddPost(author, body, category, title) {

    let newPost = {
        author,
        body,
        category,
        title,
        deleted: false,
        timestamp: Date.now(),
        id: lib.generateUUID(),
        voteScore: 1
    }
    
    let queryString = ROOT_URL + "posts"; 

    return function (dispatch) {

        let postPromise = fetch(queryString, {
            method: 'post',
            headers: { 'Authorization': AUTHORIZATION_STRING, 'Content-Type': 'application/json'},
            body: JSON.stringify(newPost)
        })

        return postPromise.then(function (response) {
            return response.json();
        }).catch(function (err) {
            console.log("error happened!");
        }).then(function (post) {
            dispatch(addPost(post.author, post.body, post.category, post.title, post.timestamp, post.voteScore, post.id, post.deleted));
        });
    }
}


export function fetchCommentsForPost(postId) {
    let queryString = ROOT_URL + "posts/" + postId + "/comments"
    return function (dispatch) {
        let commentsPromise = fetch(queryString, {
            method: 'get',
            headers: { 'Authorization': AUTHORIZATION_STRING }
        })

        return commentsPromise.then(function (response) {
            return response.json();
        }
        ).catch(function (err) {
            console.log("fetch comments for post error:");
            console.log(err); 
        }).then(function (comments) {
            let numberOfCommentsForPost = 0;
            dispatch(clearListOfCommentsForPost(postId))
            for (let idx in comments) {
                if (!comments[idx].deleted) {
                    numberOfCommentsForPost++;
                }
                dispatch(addComment(comments[idx].parentId, comments[idx].body, comments[idx].author, comments[idx].timestamp, comments[idx].voteScore, comments[idx].id, comments[idx].deleted))
            }
            dispatch(updateNumberOfCommentsForPost(postId, numberOfCommentsForPost))
        });
    }
}


export function fetchComment(commentId) {
    let queryString = ROOT_URL + "comments/" + commentId; 
    return function (dispatch) {

    let commentPromise = fetch(queryString, {
            method: 'get',
            headers: { 'Authorization': AUTHORIZATION_STRING }
    })

    return commentPromise.then(function (response) {
            return response.json();
    }
    ).catch(function (err) {
            console.log("fetch comment error");
            console.log(err); 
        }).then(function (comment) {
            dispatch(addComment(comment.parentId, comment.body, comment.author, comment.timestamp, comment.voteScore, comment.id, comment.deleted))
        });
    }
}


export function fetchPost(postId) {
    let queryString = ROOT_URL + "posts/" + postId
    return function (dispatch) {
        let postPromise = fetch(queryString, {
            method: 'get',
            headers: { 'Authorization': AUTHORIZATION_STRING }
        })

        return postPromise.then(function (response) {
            return response.json();
        }
        ).catch(function (err) {
            console.log("fetch post error");
            console.log(err);
        }).then(function (post) {
            dispatch(addPost(post.author, post.body, post.category, post.title, post.timestamp, post.voteScore, post.id, post.deleted));
            dispatch(fetchCommentsForPost(postId));
        });
    }
}

export function asyncFetchAllPosts() {
    let queryString = ROOT_URL + "posts"; 
    return function (dispatch) {

        let postsPromise = fetch(queryString, {
            method: 'get',
            headers: { 'Authorization': AUTHORIZATION_STRING }
        })

        return postsPromise.then(function (response) {
            return response.json();
        }
        ).catch(function (err) {
            console.log("fetch all posts error");
            console.log(err)
        }).then(function (posts) {
            dispatch(clearAllPosts())
            for (let idx in posts) {
                dispatch(addPost(posts[idx].author, posts[idx].body, posts[idx].category, posts[idx].title, posts[idx].timestamp, posts[idx].voteScore, posts[idx].id, posts[idx].deleted));
                dispatch(fetchCommentsForPost(posts[idx].id))
            }
        });
    }
}

export function asyncFetchAllCategories() {
    let queryString = ROOT_URL + "categories"; 
    return function (dispatch) {

        let postsPromise = fetch(queryString, {
            method: 'get',
            headers: { 'Authorization': AUTHORIZATION_STRING }
        })

        return postsPromise.then(function (response) {
            return response.json();
        }
        ).catch(function (err) {
            console.log("fetch all categories error");
            console.log(err);
        }).then(function (categories) {
            let categoriesArray = categories.categories
            dispatch(addCategories(categoriesArray.map(function (c) { return c.name })))
        });
    }

}

