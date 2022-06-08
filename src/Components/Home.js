import React,{Component  } from "react";

class Home extends Component{
    render(){
        return(
            <div className="card bg-dark text-white" style={{margin:"150px auto",borderColor:"red", width:"40%"}}>
                <img src={require('../img/homePhoto.png')} className="card-img" alt="HomePhoto"/>
                <div className="card-img-overlay d-flex align-items-end justify-content-end">
                    <div style={{width:"400px"}}>
                    <p className="card-text">Türkiyenin en hızlı, en iyi video dönüştürme platformu.</p>
                    </div>
                   
                </div>
          </div>
        );
    }
}

export default Home;