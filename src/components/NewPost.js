import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import '../libs/bootstrap/dist/css/bootstrap.min.css';
import './Readable.css';
import  ApplicationHeader  from './ApplicationHeader';
import serializeForm from "form-serialize"
import { connect } from 'react-redux'
import { addPost } from "../actions/actions"

class NewPost extends Component {
    state={
        saved: {
            author : "", 
            body : "", 
            category : "", 
            title: ""
        }, 

        authorClass: "", 
        authorWarningMessage: "", 
        bodyClass: "", 
        bodyWarningMessage: ""
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
        console.log("values from the form"); 
        console.log(values); 

        if ((this.userEntryIsOk(values.author, "authorClass", "authorWarningMessage"))&
            (this.userEntryIsOk(values.body, "bodyClass", "bodyWarningMessage"))){
             this.props.dispatch(addPost(values.author, values.body, values.category, values.title)); 
           } else{
            //if either of the checks failed - save already entered data for next iteration
              this.setState({
                  saved: {
                    author : values.author, 
                    body : values.body, 
                    category : values.category, 
                    title: values.title
                  }

              })
           }


	}

    resetState() {
        this.setState({
            saved: {
                author: "",
                body: "",
                category: "",
                title: ""
            },

            nameClass: "",
            nameWarningMessage: "",
            bodyClass: "",
            bodyWarningMessage: ""
        }
      )
    }
    componentWillUnmount(){
    //if user  is leaving the page - just clear everything
       this.resetState(); 
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            saved: {
                category: nextProps.categories[0]
            }

        })
    }

    handleCategorySelect=(e)=>{ 
        this.setState({
            saved: {
                category: e.target.value
            }

        })
	}

    render() {


        return (   
    

    <div className="container">
        <ApplicationHeader/>

        <div className="row">
            <div className="col-md-4 text-center col-md-offset-4"><Link className="btn btn-default control-style" to="/">Back to main page</Link></div>
        </div>
        <div className="row">
            <div className="col-md-8 col-md-offset-2">
                <hr></hr>
            </div>
        </div>

        <div className="row">
            <div className="col-md-10 col-md-offset-1">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="selectCategory">Select category:</label>
                        <select className="form-control" id="selectCategory" name="category" value={this.state.saved.category}  onChange={this.handleCategorySelect}>
                            {this.props.categories.map((category)=>{
								  return <option key={category} value={category}>{category}</option>
							})}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="AuthorName" className={this.state.authorClass}>Your name: {this.state.authorWarningMessage}</label>
                        <input type="text" className="form-control" id="AuthorName" placeholder="User name" name="author" defaultValue={this.state.saved.author}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="PostTitle">Title:</label>
                        <input type="text" className="form-control" id="PostTitle" placeholder="Title of the post" name="title" defaultValue={this.state.saved.title}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="postText" className={this.state.bodyClass} defaultValue={this.state.saved.title}>Post: {this.state.bodyWarningMessage}</label>
                        <textarea className="form-control" id="postText" rows="10" name="body"></textarea>
                    </div>
                    <button type="submit" className="btn btn-default control-style">Create post</button>
                </form>
            </div>
        </div>
    </div>
    )}}

const mapStateToProps = (state, props) => { 
        return {
        categories: state.categories 
      }};

    //ref https://classroom.udacity.com/nanodegrees/nd019/parts/7b1b9b53-cd0c-49c9-ae6d-7d03d020d672/modules/c278315d-f6bd-4108-a4a6-139991a50314/lessons/c7a8f8a7-3922-473d-abc0-52870f9fac67/concepts/ee2b83a1-6f39-4392-be7f-acaaa0719f64export {MainView};
    
export default connect(mapStateToProps)(NewPost);