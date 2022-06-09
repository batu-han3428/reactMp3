import React,{Component  } from "react";
import Banner from './Banner.js';
import Converter from './Converter.js';

class Home extends Component{
    render(){
        return(
            <>
                <Banner />
                <Converter />
            </>
        );
    }
}

export default Home;