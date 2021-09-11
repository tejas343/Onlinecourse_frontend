import { Component } from "react";
import axios from 'axios';
import { backendUrlGetCourseByTeacher } from "../BckendURL";

import CreateCard from "./CreateCard";


class CourseCreated extends Component{


    constructor(){
        super()
        this.state = {
            courses : [],
            errorMessage: "",
            showModal:false,
            user:sessionStorage.getItem("userId")
        }
    }

    componentWillMount(){
        this.getCourses();
    }

    getCourses = () =>{

        this.setState({errorMessage:""})
        axios.get(backendUrlGetCourseByTeacher+this.state.user)
        .then(
            response =>{
                console.log(response.data);
                this.setState({courses : response.data})
            }
        ).catch(error => {
            if(error.response) {
                console.log(error.response.data);
                this.setState({errorMessage : error.response.data.message})
            }
            else{
                this.setState({errorMessage : "Please Check Your Details or Try Again Later"})
            }
            
        });
    }


    

    render(){
        var courses = this.state.courses;

        return(

            <>
            {(this.state.errorMessage.trim().length > 0 )?
                <div class="alert alert-danger" role="alert" style = {{"display": "flex", "justify-content": "center", "margin":10}}>
                    {this.state.errorMessage}
                </div>:<></>
            }
            <div className = "row row-cols-1 row-cols-md-4 g-4" style= {{"display": "flex", "justify-content": "center", "margin":10}}>
            
            
                {(courses.length > 0)?
                    courses.map(item => (
                        <CreateCard key = {item.corseId} course = {item}></CreateCard>
                
                    ))
                
                
                :null}
                

            </div>
            </>
        );
    }


}

export default CourseCreated;