import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../custom.css'
import {Message} from 'primereact/message';
import { backendUrlteacherLogin } from "../BckendURL";
import axios from 'axios';
class Teacherlogin extends Component {

    state = {
        errorMessage:"",
        formValue:{
            contactNo:"",
            password:""
        },

        formErrorMessage:{
            
            contactNo:"",
            password:"",
            
        },

        formValid :{
            contactNo:false,
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
                if(value === ""){
                    formValidationError.password = "Field Required";
                    formValid.password=false;
                }
                else{
                    formValidationError.password="";
                    formValid.password=true;
                }
                break;
        }

        formValid.ButtonActive = formValid.contactNo && formValid.password ;

        this.setState({
            formErrorMessage:formValidationError,
            formValid: formValid,
        })
    }

    handleSubmit = event =>{
        event.preventDefault();
        this.login();
    }

    login = () => {
        const {formValue} = this.state;
        axios.post(backendUrlteacherLogin,formValue)
        .then(
            response => {
                console.log(response.data);
                sessionStorage.setItem("userId",response.data.teacherId );
                sessionStorage.setItem("userName", response.data.teacherName);
                sessionStorage.setItem("userRole","teacher");
                window.location.href = "/";
                
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
                                    <h3>Login as Teacher</h3>
                                    <form class="requires-validation" novalidate>
                
                                        <div class="col-md-12">
                                            <input class="form-control" type="text" name="contactNo" placeholder="Contactnumber" onChange = {this.handlechange} required/>
                                            <Message severity = "error" text = {this.state.formErrorMessage.contactNo} style = {{"color" : "red","max-width": 400}}></Message>
                                         </div>
        
                                        <div class="col-md-12">
                                            <input class="form-control" type="password" name="password" placeholder="password" onChange={this.handlechange} required/>
                                            <Message severity = "error" text = {this.state.formErrorMessage.password} style = {{"color" : "red","max-width": 400}}></Message>
                                         </div>
                
                                        <div class="form-button mt-3">
                                            <button id="submit" type="submit" class="btn btn-primary" disabled = {!this.state.formValid.ButtonActive} onClick = {this.handleSubmit}>Login</button>
                                        </div>
                                    </form>
                                    <br/>
                                    {(this.state.errorMessage.trim().length > 0 )?
                                    <div class="alert alert-danger" role="alert" style = {{"max-width": 400}}>
                                        {this.state.errorMessage}
                                    </div>:<></>
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                )

}


}
export default Teacherlogin;