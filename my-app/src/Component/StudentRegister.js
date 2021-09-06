import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../custom.css'
import axios from 'axios';
import {Message} from 'primereact/message';
import { backendUrlstudentRegister } from "../BckendURL";

class StudentRegister extends Component {

    state = {
        successMessage: "",
        errorMessage: "",
        
        formValue:{
            studentName:"",
            emailId:"",
            contactNumber:"",
            password:""
        },

        formErrorMessage:{
            studentName:"",
            emailId:"",
            contactNumber:"",
            password:""
        },

        formValid :{
            studentName:false,
            emailId:false,
            contactNumber:false,
            password:false,
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

            case "studentName":
                const userNameregex= /^(((?<!^)\s(?!$)|[-a-zA-Z])*)$/;
                if(value === ""){
                    formValidationError.studentName = "Field Required";
                    formValid.studentName = false;
                }
                else if(!value.match(userNameregex)){
                    formValidationError.studentName = "UserName should contain only alphabates and should not start and end with space";
                    formValid.studentName = false;
                }else{
                    formValidationError.studentName = "";
                    formValid.studentName = true;
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

            case "contactNumber":
                const contactNumberRegex = /^[6-9][0-9]{9}$/;
                if(value === ""){
                    formValidationError.contactNumber = "Field Required";
                    formValid.contactNumber = false;
                }
                else if(!value.match(contactNumberRegex)){
                    formValidationError.contactNumber = "Plaese enter valid indian Mobile Number";
                    formValid.contactNumber = false;
                }
                else{
                    formValidationError.contactNumber = "";
                    formValid.contactNumber = true;
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

        formValid.ButtonActive = formValid.contactNumber && formValid.password && formValid.studentName && formValid.emailId;

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

        axios.post(backendUrlstudentRegister,formValue)
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
                            <h3>Register as Student</h3>
                            <p>Fill in the data below.</p>
                            <form class="requires-validation" novalidate>
        
                                <div class="col-md-12">
                                   <input class="form-control" type="text" name="studentName" placeholder="Enter your name" onChange = {this.handlechange} required/>
                                   <Message severity = "error" text = {this.state.formErrorMessage.studentName} style = {{"color" : "red", "max-width": 400}}></Message>
                                </div>
        
                                <div class="col-md-12">
                                    <input class="form-control" type="email" name="emailId" placeholder="E-mail Address"onChange = {this.handlechange} required/>
                                    <Message severity = "error" text = {this.state.formErrorMessage.emailId} style = {{"color" : "red", "max-width": 400}}></Message>
                                </div>
                                <div class="col-md-12">
                                    <input class="form-control" type="text" name="contactNumber" placeholder="Contactnumber"onChange = {this.handlechange} required/>
                                    <Message severity = "error" text = {this.state.formErrorMessage.contactNumber} style = {{"color" : "red", "max-width": 400}}></Message>
                                 </div>

                                <div class="col-md-12">
                                    <input class="form-control" type="password" name="password" placeholder="password"onChange = {this.handlechange} required/>
                                    <Message severity = "error" text = {this.state.formErrorMessage.password} style = {{"color" : "red", "max-width": 400}}></Message> 
                                 </div>
        
                                 
                                
                                 <div class="form-button mt-3">
                                    <button id="submit" type="submit" class="btn btn-primary"disabled = {!this.state.formValid.ButtonActive} onClick = {this.handleSubmit}>Register</button>
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
export default StudentRegister;
 