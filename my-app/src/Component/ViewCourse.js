import axios from 'axios';

import React,{Component} from 'react';
import {Message} from 'primereact/message';
import { backendUploadImage, backendUrlCourseAdd, backendUrlGetCourse } from '../BckendURL';

class ViewCourse extends Component {

    state = {
        "Search":"",
        "imageUrl":null,
    }

    handlechange = event => {
        
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(name,value);
        this.setState({"Search": value});
        //this.validateData(name,value);
    };

    handleSubmit = event =>{
        event.preventDefault();
        this.searchCourse();
    } 


    searchCourse = () => {
        
        this.setState({errorMessage:"", successMessage:""});

        axios.get(backendUrlGetCourse + this.state.Search)
        .then(
            response => {
                console.log(response.data);

                this.setState({imageUrl : response.data[0].imageUrl})
            }).catch(error => {
                if(error.response) {
                    console.log(error.response.data);
                    //this.setState({errorMessage : error.response.data.message, successMessage : ""})
                }
                else{
                    //this.setState({errorMessage : "Please Check Your Details or Try Again Later", successMessage : ""})
                }
                
            });
    }

    render(){
        return(
            <div class="form-body">
            <div class="row">
                <div class="form-holder">
                    <div class="form-content">
                        <div class="form-items">
                            <h3>Login as Student</h3>
                            <form class="requires-validation" novalidate>
        
                                <div class="col-md-12">
                                    <input class="form-control" type="text" name="search" placeholder="Enter what you want to search!" onChange = {this.handlechange} required/>
                                 </div>
        
                                <div class="form-button mt-3">
                                    <button id="submit" type="submit" class="btn btn-primary" onClick = {this.handleSubmit}>Search</button>
                                </div>
                                {(this.state.imageUrl)?
                                <img src= {this.state.imageUrl} alt="Girl in a jacket" width="500" height="600"></img>:<></>
                                } 
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default ViewCourse;