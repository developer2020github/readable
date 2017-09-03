import React, { Component } from 'react';
import '../libs/bootstrap/dist/css/bootstrap.min.css';
import './Readable.css';
import serializeForm from "form-serialize"
import { connect } from 'react-redux'

//generic component to handle creation and update of posts and comments

class UpdateItem extends Component {
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
        bodyWarningMessage: "", 

    }
    
    userEntryIsOk(value, nameOfClass, nameOfMessageField){


        if (value&&value.trim()!==""){
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
              
             this.props.update(values)

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
    
    componentWillMount(){

        const item = this.props.item; 

        if(item){

        //need this because comments do not have titles and categories
            function getProp(o, prop){
            if (o.hasOwnProperty(prop)){
                 return o[prop]; 
                }
               return(""); //default value 
            }

            this.setState({
                saved: {
                    author: getProp(item, "author"), 
                    body:  getProp(item, "body"),  
                    category:  getProp(item, "category"), 
                    title:  getProp(item, "title"), 
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
            bodyWarningMessage: "", 
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
        let categories = null; 
        if (this.props.showCategories){
            categories = <div className="form-group">
                            <label htmlFor="selectCategory">Select category:</label>
                            <select className="form-control" id="selectCategory" name="category" value={this.state.saved.category}  onChange={this.handleCategorySelect}>
                                {this.props.categories.map((category)=>{
                                    return <option key={category} value={category}>{category}</option>
                                })}
                            </select>
                            </div>
        }

        let title = null; 
        if (this.props.showTitle){
          title =   <div className="form-group">
                        <label htmlFor="PostTitle">Title:</label>
                        <input type="text" className="form-control" id="PostTitle" placeholder="Title of the post" name="title" defaultValue={this.state.saved.title}></input>
                    </div>
        }

        return (   
            <div>
                <form onSubmit={this.handleSubmit}>
                    {categories}
                    <div className="form-group">
                        <label htmlFor="AuthorName" className={this.state.authorClass}>Your name: {this.state.authorWarningMessage}</label>
                        <input type="text" className="form-control" id="AuthorName" placeholder="User name" name="author" defaultValue={this.state.saved.author}></input>
                    </div>
                    {title}
                    <div className="form-group">
                        <label htmlFor="postText" className={this.state.bodyClass}>{this.props.bodyHeader} {this.state.bodyWarningMessage}</label>
                        <textarea className="form-control" id="postText" rows="10" name="body" defaultValue={this.state.saved.body}></textarea>
                    </div>
                    <button type="submit" className="btn btn-default control-style">{this.props.submitButtonName}</button>
                    <button  className="btn btn-default control-style" onClick={this.props.cancel}>Cancel</button>
                </form>
                <div><hr></hr></div>
                </div>
                 )            
                 }
}

const mapStateToProps = (state, props) => { 

        let currentItem = null; 
        if (props.itemId) {
            if (state.posts.hasOwnProperty(props.itemId)){
            currentItem = state.posts[props.itemId]
            }else if (props.parentId && state.comments.hasOwnProperty(props.parentId)){
                if (state.comments[props.parentId].hasOwnProperty(props.itemId)){}
                      currentItem = state.comments[props.parentId][props.itemId]
                }
            }
        
    
        return {
               categories: state.categories, 
               item: currentItem
      }};

    //ref https://classroom.udacity.com/nanodegrees/nd019/parts/7b1b9b53-cd0c-49c9-ae6d-7d03d020d672/modules/c278315d-f6bd-4108-a4a6-139991a50314/lessons/c7a8f8a7-3922-473d-abc0-52870f9fac67/concepts/ee2b83a1-6f39-4392-be7f-acaaa0719f64export {MainView};
    
export default connect(mapStateToProps)(UpdateItem);