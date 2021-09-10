import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {backendUrlteacherRegister} from '../BckendURL';
import axios from 'axios';
import {Message} from 'primereact/message';


class TeacherRegister extends Component {

    state = {
        successMessage: "",
        errorMessage: "",
        
        formValue:{
            teacherName:"",
            emailId:"",
            contactNo:"",
            password:""
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

    }

    handlechange = event => {
        
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(name,value);
        const {formValue} = this.state;
        this.setState({formValue : {...formValue,[name] : value} } );
        this.validateData(name,value);
    };

    validateData = (fieldname,value) => {
        let formValidationError = this.state.formErrorMessage;
        let formValid = this.state.formValid;

        switch(fieldname){

            case "secretCode":
                console.log(value=== "2021")
                if(value === ""){
                    formValidationError.secretCode = "Field Required";
                    formValid.secretCode = false;
                }
                else if(value !== "2021"){
                    formValidationError.secretCode = "Invalid Secret Code!";
                    formValid.secretCode = false;
                }else{
                    formValidationError.secretCode = "";
                    formValid.secretCode = true;
                }
                break;

            case "teacherName":
                const userNameregex= /^(((?<!^)\s(?!$)|[-a-zA-Z])*)$/;
                if(value === ""){
                    formValidationError.teacherName = "Field Required";
                    formValid.teacherName = false;
                }
                else if(!value.match(userNameregex)){
                    formValidationError.teacherName = "UserName should contain only alphabates and should not start and end with space";
                    formValid.teacherName = false;
                }else{
                    formValidationError.teacherName = "";
                    formValid.teacherName = true;
                }
                break;

                case "emailId":
                    const emailIdregex= /^[a-zA-Z0-9._]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                    if(value === ""){
                        formValidationError.emailId = "Field Required";
                        formValid.emailId= false;
                    }
                    else if(!value.match(emailIdregex)){
                        formValidationError.emailId = "Please enter vlid email id";
                        formValid.emailId = false;
                    }else{
                        formValidationError.emailId = "";
                        formValid.emailId = true;
                    }
                    break;

            case "contactNo":
                const contactNumberRegex = /^[6-9][0-9]{9}$/;
                if(value === ""){
                    formValidationError.contactNo = "Field Required";
                    formValid.contactNo = false;
                }
                else if(!value.match(contactNumberRegex)){
                    formValidationError.contactNo = "Plaese enter valid indian Mobile Number";
                    formValid.contactNo = false;
                }
                else{
                    formValidationError.contactNo = "";
                    formValid.contactNo = true;
                }
                break;

            case "password":
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                if(value === ""){
                    formValidationError.password = "Field Required";
                    formValid.password=false;
                }
                else if(!value.match(passwordRegex)){
                    formValidationError.password = "password must contain atleast 1 uppercase, 1 lowercase, 1 number and 1 special character, minimum length is 8";
                    formValid.password = false;
                }

                else{
                    formValidationError.password="";
                    formValid.password=true;
                }
                break;
        }

        formValid.ButtonActive = formValid.contactNo && formValid.password && formValid.teacherName && formValid.emailId && formValid.secretCode;

        this.setState({
            formErrorMessage:formValidationError,
            formValid: formValid,
            successMessage: "",
            errorMessage: ""
        })
    }


    handleSubmit = event =>{
        event.preventDefault();
        this.register();
    }

    register = () => {
        const {formValue} = this.state;
        this.setState({errorMessage:"", successMessage:""});

        axios.post(backendUrlteacherRegister,formValue)
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

 render(){

    return(
        <div class="form-body">
            <div class="row">
                <div class="form-holder">
                    <div class="form-content">
                        <div class="form-items">
                            <h3>Register as Teacher</h3>
                            <p>Fill in the data below.</p>
                            <form class="requires-validation" autocomplete="off" novalidate>
                                <input autocomplete="false" name="hidden" type="text" class="hidden"/>
                                <div class="col-md-12">
                                    <input class="form-control" type="text" name="secretCode" placeholder="Enter Secret code" onChange = {this.handlechange} required/>
                                    <Message severity = "error" text = {this.state.formErrorMessage.secretCode} style = {{"color" : "red","max-width": 400}}></Message>
                                 </div>
        
                                <div class="col-md-12">
                                   <input class="form-control" type="text" name="teacherName" placeholder="Enter your name" onChange = {this.handlechange} required/>
                                   <Message severity = "error" text = {this.state.formErrorMessage.teacherName} style = {{"color" : "red", "max-width": 400}}></Message>
                                </div>
        
                                <div class="col-md-12">
                                    <input class="form-control" type="email" name="emailId" placeholder="E-mail Address" onChange = {this.handlechange} required/>
                                    <Message severity = "error" text = {this.state.formErrorMessage.emailId} style = {{"color" : "red","max-width": 400}}></Message>
                                </div>
                                <div class="col-md-12">
                                    <input class="form-control" autoComplete = "off" type="text" name="contactNo" placeholder="Contactnumber" onChange = {this.handlechange} required/>
                                    <Message severity = "error" text = {this.state.formErrorMessage.contactNo} style = {{"color" : "red","max-width": 400}}></Message>
                                 </div>

                                <div class="col-md-12">
                                    <input class="form-control" type="password" name="password" placeholder="password" onChange = {this.handlechange} required/>
                                    <Message severity = "error" text = {this.state.formErrorMessage.password} style = {{"color" : "red","max-width": 400}}></Message>
                                 </div>
        
                                 <div class="form-button mt-3">
                                    <button id="submit" type="submit" class="btn btn-primary" disabled = {!this.state.formValid.ButtonActive} onClick = {this.handleSubmit}>Register</button>
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
    )
 }


}
export default TeacherRegister;