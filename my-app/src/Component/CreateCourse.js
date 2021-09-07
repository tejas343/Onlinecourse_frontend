import axios from 'axios';

import React,{Component} from 'react';
import {Message} from 'primereact/message';
import { backendUploadImage, backendUrlCourseAdd } from '../BckendURL';

class CreateCourse extends Component {

	state = {

	// Initially, no file is selected
	    selectedFile: null,

        successMessage: "",
        errorMessage: "",
        
        formValue:{
            courseName:"",
            description:"",
            imageUrl:""
        },

        formErrorMessage:{
            teacherName:"",
            emailId:"",
            contactNo:"",
            password:"",
            secretCode:""
        },

        formValid :{
            teacherName:false,
            emailId:false,
            contactNo:false,
            password:false,
            secretCode:false,
            ButtonActive:false
        }


	};
	
	// On file select (from the pop up)
	onFileChange = event => {
	
	// Update the state
	this.setState({ selectedFile: event.target.files[0] });
	
	};
	
	// On file upload (click the upload button)
	onFileUpload = (event) => {
        // Create an object of formData
        const formData = new FormData();
        
        // Update the formData object
        if (this.state.selectedFile) {
        formData.append(
            "imageFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        axios.post(backendUploadImage, formData);
        const {formValue} = this.state;
        this.setState({formValue : {...formValue, imageUrl: this.state.selectedFile.name} } );
        }
	};
	
	
	fileData = () => {
	
	if (this.state.selectedFile) {
		
		return (
		<div>
		</div>
		);
	} else {
		return (
		<div>
			<br />
			<h4>Choose before Pressing the Upload button</h4>
		</div>
		);
	}
	};

    handlechange = event => {
        
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(name,value);
        const {formValue} = this.state;
        this.setState({formValue : {...formValue,[name] : value} } );
        //this.validateData(name,value);
    };


    handleSubmit = event =>{
        event.preventDefault();
        this.register();
    }

    register = () => {
        const {formValue} = this.state;
        this.setState({errorMessage:"", successMessage:""});

        axios.post(backendUrlCourseAdd,formValue)
        .then(
            response => {
                console.log(response.data);
                this.setState({errorMessage : "", successMessage : response.data})
            }).catch(error => {
                if(error.response) {
                    console.log(error.response.data);
                    this.setState({errorMessage : error.response.data.message, successMessage : ""})
                }
                else{
                    this.setState({errorMessage : "Please Check Your Details or Try Again Later", successMessage : ""})
                }
                
            });
    }
	
	render() {
	
	return (
		<div class="form-body">
            <div class="row">
                <div class="form-holder">
                    <div class="form-content">
                        <div class="form-items">
                            <h3>Create Course</h3>
                            <form class="requires-validation" novalidate>
                                <div className = "row">
                                <div class="col-md-8">
                                    <input class="form-control" type="file" name="courseImage" onChange={this.onFileChange} required/>
                                 </div>
                                 <div class="col-md-4">
                                    <button class="btn btn-primary" onClick={this.onFileUpload}>Upload</button>
                                 </div>
                                 </div>
        
                                 <div class="col-md-12">
                                    <input class="form-control" type="text" name="courseName" placeholder="Enter course name." onChange = {this.handlechange} required/>
                                    <Message severity = "error" text = {this.state.formErrorMessage.emailId} style = {{"color" : "red","max-width": 400}}></Message>
                                </div>
                                <br/>
                                <div class="col-md-12">
                                    <textarea class="form-control" type="text" name="description" placeholder="Enter course description. (Minimum 50 characters)" onChange = {this.handlechange} required/>
                                    <Message severity = "error" text = {this.state.formErrorMessage.emailId} style = {{"color" : "red","max-width": 400}}></Message>
                                </div>
                                <div class="form-button mt-3">
                                    <button id="submit" type="submit" class="btn btn-primary" onClick = {this.handleSubmit}>Add Course</button>
                                </div>
                                <br/>
                                {(this.state.successMessage.trim().length > 0 )?
                                    <div class="alert alert-success" role="alert" style = {{"max-width": 400}}>
                                        {this.state.successMessage}
                                    </div>:<></>
                                }

                                {(this.state.errorMessage.trim().length > 0 )?
                                    <div class="alert alert-danger" role="alert" style = {{"max-width": 400}}>
                                        {this.state.errorMessage}
                                    </div>:<></>
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

export default CreateCourse;
