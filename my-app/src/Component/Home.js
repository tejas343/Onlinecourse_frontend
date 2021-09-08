import { Component } from "react";


class Home extends Component{

    render(){
        return(
            <>
            <br/>
            <div class="row">

            <div class="col-md-8 mb-4 offset-md-2"  >

                <form class="form-inline md-form ">
                <input class="form-control mr-sm-2 mr-auto" type="text" placeholder="Search" style={{"width":"70%","marginLeft":10}} aria-label="Search"/>
                <button class="btn btn-primary btn-rounded btn-sm my-0 waves-effect waves-light" type="submit">Search</button>
                </form>

            </div>
            </div>
            <hr class="my-4" style = {{"color":"grey"}}></hr>

            <div className = "row row-cols-1 row-cols-md-4 g-4" style= {{"display": "flex", "justify-content": "center", "margin":10}}>
     
                <div className = "col">
                <div class="card text-grey bg-light">
                    <img src="download.jfif" class="card-img-top" alt="..." style={{maxHeight:"200px", minHeight:"200px", borderBlockColor:"grey" }}/>
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
                </div>


                <div className = "col">
                <div class="card text-grey bg-light">
                    <img src="download.jfif" class="card-img-top" alt="..." style={{maxHeight:"200px", minHeight:"200px", borderBlockColor:"grey" }}/>
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
                </div>



                <div className = "col">
                <div class="card text-grey bg-light">
                    <img src="download.jfif" class="card-img-top" alt="..." style={{maxHeight:"200px", minHeight:"200px", borderBlockColor:"grey" }}/>
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
                </div>


                <div className = "col">
                <div class="card text-grey bg-light">
                    <img src="download.jfif" class="card-img-top" alt="..." style={{maxHeight:"200px", minHeight:"200px", borderBlockColor:"grey" }}/>
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
                </div>
 
            </div>
            </>
        );
    }
}

export default Home;