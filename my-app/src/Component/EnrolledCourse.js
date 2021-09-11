import { Component } from "react";
import { backendUrlGetStudentEnrollCourse } from "../BckendURL";
import axios from 'axios';
import Typography from '@material-ui/core/Typography';

class EnrolledCourse extends Component{

    constructor(){
        super()
        this.state = {
            courses : [],
            errorMessage: "",
            user:sessionStorage.getItem("userId")
        }
    }

    componentWillMount(){
        this.getCourses();
    }

    getCourses = () =>{

        this.setState({errorMessage:""})
        axios.get(backendUrlGetStudentEnrollCourse+this.state.user)
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
                        <div className = "col" key = {item.courseId}>
                
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
                       
                    </div>
                </div>
                </div>
                
                </div> 
                    ))
                
                
                :null}
                

            </div>
            </>
        );
    }

}

export default EnrolledCourse;