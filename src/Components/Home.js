import React from "react";
import Banner from './Banner.js';
import Converter from './Converter.js';
import './Home.css';

const Home = () =>(
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

export default Home;