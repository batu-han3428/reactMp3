import React,{Component  } from "react";
import Banner from './Banner.js';
import Converter from './Converter.js';
import './Home.css';

class Home extends Component{
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <Banner />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                    <Converter />
                    </div>
                </div>
            </div>          
        );
    }
}

export default Home;