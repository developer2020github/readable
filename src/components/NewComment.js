import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'; 
import '../libs/bootstrap/dist/css/bootstrap.min.css';
import './Readable.css';
import  ApplicationHeader  from './ApplicationHeader';
import serializeForm from "form-serialize"
import { connect } from 'react-redux'
import { addComment } from "../actions/actions"


class NewComment extends Component {
        state={
            saved: {
                author : "", 
                body : ""
            }, 
    
            authorClass: "", 
            authorWarningMessage: "", 
            bodyClass: "", 
            bodyWarningMessage: "", 
           
    
        }
        
        userEntryIsOk(value, nameOfClass, nameOfMessageField){
    
    
            if (value&&value.trim()!=""){
                this.setState({
                    [nameOfClass]: "", 
                    [nameOfMessageField]: ""
                })
                return true; 
        
            }else{
                this.setState({
                    [nameOfClass]: "form-item-warning", 
                    [nameOfMessageField]: " *  this field is requred"
                })
                return false; 
            }
        }
    
        handleSubmit = (e)=>{
            e.preventDefault();     
            const values = serializeForm(e.target, {hash : true}); 
           
            if ((this.userEntryIsOk(values.author, "authorClass", "authorWarningMessage"))&
                (this.userEntryIsOk(values.body, "bodyClass", "bodyWarningMessage"))){
                 //export function addComment(parentId, body, author,  timestamp=null, voteScore=null)
                 this.props.dispatch(addComment(this.props.parentPostId, values.body, values.author)); 
                 this.props.handleCancelNewComment(); 

               } else{
                //if either of the checks failed - save already entered data for next iteration
                  this.setState({
                      saved: {
                        author : values.author, 
                        body : values.body
                      }
    
                  })
               }
    
    
        }
    
        resetState() {
            this.setState({
                saved: {
                    author: "",
                    body: "",
                },
    
                nameClass: "",
                nameWarningMessage: "",
                bodyClass: "",
                bodyWarningMessage: "", 
            }
          )
        }
    
    
        componentWillUnmount(){

           this.resetState(); 
           this.props.handleCancelNewComment();
        }
    
       
    
        render() {
                
            //if (this.state.postUpdated){
            //       console.log
            //       return <Redirect to={"/posts/"+this.props.post.id}/>;  
            //}
            
            return (   
      
            <div>
                
                <h3>Add new comment: </h3>
        
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="AuthorName" className={this.state.authorClass}>Your name: {this.state.authorWarningMessage}</label>
                            <input type="text" className="form-control" id="AuthorName" placeholder="User name" name="author" defaultValue={this.state.saved.author}></input>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="postText" className={this.state.bodyClass} defaultValue={this.state.saved.title}>Comment: {this.state.bodyWarningMessage}</label>
                            <textarea className="form-control" id="postText" rows="10" name="body" defaultValue={this.state.saved.body}></textarea>
                        </div>
                        <button type="submit" className="btn btn-default control-style">Add comment</button>
                        <button className="btn btn-default control-style" onClick={this.props.handleCancelNewComment}>Cancel</button>
                    </form>
                </div>
    
        
                <div>
                    <hr></hr>
                </div>
        
            </div>
        
        )}}

        
export default connect()(NewComment);