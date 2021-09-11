import { Component } from "react";
import { Modal,Button} from "react-bootstrap";
import Typography from '@material-ui/core/Typography';

class CreateCard extends Component{

    constructor(){
        super()
        this.state = {
            course : null,
            errorMessage: "",
            showModal:false,
           
        }
    }

    handleClose = () => {this.setState({showModal:false})}
    hanfleShow = () => {this.setState({showModal:true})}

    addDataModal(){
        this.hanfleShow();
    }

    componentWillMount(){
        this.setState({course : this.props.course});
        /*if(this.props.package.availability <= 0){
            this.setState({buttonActive:true});
        }*/
    }


    render(){
        var item = this.state.course;

        return(

            <>
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
                        <br/>
                        <button type = "button" className = "btn btn-primary float-left" onClick = {() => this.addDataModal()}>View Details</button>
                    </div>
                </div>
                </div>

                <Modal show = {this.state.showModal} onHide = {this.handleClose} size = "lg" animationType = {"fade"}>
                        <Modal.Header closeButton>
                            <Modal.Title>{item.courseName}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h5>Student List</h5>
                            <hr></hr>
                            {(item.enrollmentlist.length > 0)?
                               <table class="table">
                               <thead>
                                 <tr>
                                   <th scope="col">Student Id</th>
                                   <th scope="col">Student Name</th>
                                   <th scope="col">Contact Number</th>
                                   <th scope="col">Email Id</th>
                                 </tr>
                               </thead>
                               <tbody>
                                   {
                                       item.enrollmentlist.map(
                                           (enrollData) => <>
                                                <tr>
                                                <th scope="row">{enrollData.studentDto.studentId}</th>
                                                <td>{enrollData.studentDto.studentName}</td>
                                                <td>{enrollData.studentDto.contactNumber}</td>
                                                <td>{enrollData.studentDto.emailId}</td>
                                                </tr>
                                           </>
                                       )
                                   }
                               </tbody>
                               </table>
                            :
                            <div class="alert alert-danger" role="alert" style = {{"display": "flex", "justify-content": "center", "margin":10}}>
                                No one enrolled yet !
                            </div>
                            }

                        </Modal.Body>
                        <Modal.Footer>
                            
                        </Modal.Footer>

                    </Modal>
                
                </div> 

            </>
        );
    }

}

export default CreateCard;