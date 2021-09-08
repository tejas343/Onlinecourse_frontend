import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../custom.css'
 

class Teacherlogin extends Component {


    handleSubmit = event =>{
        event.preventDefault();
        this.login();
    }

    login = () => {
        //const {formValue} = this.state;
        this.setState({errorMessage:"", successMessage:""});
        sessionStorage.setItem("userId", "101");
        sessionStorage.setItem("userName", "Rahul Chavan");
        sessionStorage.setItem("userRole","teacher");
        window.location.href = "/";

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
                                            <input class="form-control" type="text" name="Contactnumber" placeholder="Contactnumber" required/>
                                             <div class="valid-feedback">contact field is valid!</div>
                                             <div class="invalid-feedback">contact field cannot be blank!</div>
                                         </div>
        
                                        <div class="col-md-12">
                                            <input class="form-control" type="password" name="password" placeholder="password" required/>
                                             <div class="valid-feedback">Password field is valid!</div>
                                             <div class="invalid-feedback">Password field cannot be blank!</div>
                                         </div>
                
                                        <div class="form-button mt-3">
                                            <button id="submit" type="submit" class="btn btn-primary" onClick = {this.handleSubmit}>Login</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                )

}


}
export default Teacherlogin;