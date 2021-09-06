import { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

class Navigation extends Component{

    render(){
        return(
            <nav class="navbar navbar-dark bg-dark">
                <a class="navbar-brand">Navbar</a>
                <form class="form-inline">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </nav>
        )
    }
}

export default Navigation;