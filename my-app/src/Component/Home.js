import { Component } from "react";
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import { backendUrlEnrollCourse, backendUrlgetAllCourses, backendUrlgetCoursesBySearch } from "../BckendURL";


  const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
      color: "#1e3c6e",
    },
    tooltip: {
      backgroundColor: theme.palette.common.black, 
      minHeight:200
     
    },
  }));
  
  function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();
  
    return <Tooltip arrow classes={classes} {...props} />;
  }


class Home extends Component{

    constructor(){
        super()
        this.state = {
            courses : [],
            errorMessage: "",
            successMessage: "",
            serchResult:"",
            userRole:sessionStorage.getItem("userRole")
        }
    }

    componentWillMount(){
        this.getCourses();
    }

    getCourses = () =>{

        this.setState({errorMessage:""})
        axios.get(backendUrlgetAllCourses)
        .then(
            response =>{
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

    handleChange = (event) =>{
        const target = event.target;
        const value = target.value;
        this.setState({serchResult:value})
        console.log(value);
    }

    handleSubmit = (e) =>{
        e.preventDefault();

        this.setState({errorMessage:""})
        axios.get(backendUrlgetCoursesBySearch+this.state.serchResult)
        .then(
            response =>{
                this.setState({courses : response.data})
            }
        ).catch(error => {
            if(error.response) {
                console.log(error.response.data);
                this.setState({errorMessage : error.response.data.message, courses:[]})
                
            }
            else{
                this.setState({errorMessage : "Please Check Your Details or Try Again Later"})
            }
            
        });
    }
    

    enroll = (courseId) => {
        //event.preventDefault();
        
        if(sessionStorage.getItem("userRole") !== "student"){
            this.setState({errorMessage : "Please log in as student to enroll"});
        }
        else{
            console.log(courseId);
            var data = {
                "studentDto":{
                    "studentId": sessionStorage.getItem("userId")
                },
                "courseDto":{
                    "courseId":courseId
                }
            }

        this.setState({errorMessage:"",successMessage:""})
        axios.post(backendUrlEnrollCourse, data)
        .then(
            response =>{
                this.setState({successMessage : response.data})
            }
        ).catch(error => {
            if(error.response) {
                console.log(error.response.data);
                this.setState({errorMessage : error.response.data.message,successMessage:""})
                
            }
            else{
                this.setState({errorMessage : "Please Check Your Details or Try Again Later"})
            }
            
        });
        }
    }
    render(){
        if(this.state.courses !== null){
            console.log(this.state.courses);
        }
        var courses = this.state.courses;
        
        return(
            <>
            <br/>
            
            <div class="row">
            
            <div class="col-md-8 mb-4 offset-md-2"  >

                <form class="form-inline md-form ">
                <input class="form-control mr-sm-2 mr-auto" type="text" placeholder="Search" style={{"width":"70%","marginLeft":10}} onChange = {this.handleChange} aria-label="Search"/>
                <button class="btn btn-primary btn-rounded btn-sm my-0 waves-effect waves-light" type="submit" onClick = {this.handleSubmit}>Search</button>
                </form>

            </div>
            </div>
            <hr class="my-4" style = {{"color":"grey"}}></hr>
            <br/>
            {(this.state.successMessage.trim().length > 0 )?
                                    <div class="alert alert-success" role="alert" style = {{"display": "flex", "justify-content": "center", "margin":10}}>
                                        {this.state.successMessage}
                                    </div>:<></>
                                }

            {(this.state.errorMessage.trim().length > 0 )?
                <div class="alert alert-danger" role="alert" style = {{"display": "flex", "justify-content": "center", "margin":10}}>
                    {this.state.errorMessage}
                </div>:<></>
            }
            <div className = "row row-cols-1 row-cols-md-4 g-4" style= {{"display": "flex", "justify-content": "center", "margin":10}}>
            
            
                {(courses.length > 0)?
                    courses.map(item => (
                        <div className = "col" key = {item.courseId}>
                <BootstrapTooltip
                    title={
                    <React.Fragment>
                        <br/>
                        <Typography variant = "h5" color="primary">Description</Typography>
                        <br/>
                        <Typography variant = "body2"  align = "justify">{item.description}</Typography>
                    </React.Fragment>
                    }
                    placement = "right"
                >
                <div>
                <div class="card text-grey bg-light" id = "TooltipExample">
                    <img src={item.imageUrl} class="card-img-top" alt="..." style={{maxHeight:"200px", minHeight:"200px", borderBlockColor:"grey" }}/>
                    <div class="card-body">
                        <Typography class="card-title" variant = "h5" color = "textPrimary">{item.courseName}</Typography>
                        <Typography class="card-text" variant = "inherit" color = "textSecondary">By {item.educatorName}</Typography>
                        <br/>
                        <br/>
                        <span style={{"font-size": "1.5em"}}>
                        <i class="far fa-calendar-alt"></i>
                        
                        </span>&nbsp;<Typography variant = "inherit" color = "secondary">{item.dateTime.replace("T"," ")}</Typography>
                        
                        <br/>
                        {(sessionStorage.getItem("userRole") === "student")?<button class="btn btn-primary" onClick = {() => this.enroll(item.courseId)}>Enroll</button>:null}
                    </div>
                </div>
                </div>
                </BootstrapTooltip>
                </div> 
                    ))
                
                
                :null}
                

            </div>
            
            </>
        );
    }
}

export default Home;