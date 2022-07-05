import React,{useEffect, useState} from "react";
import Banner from './Banner.js';
import Converter from './Converter.js';
import './Home.css';
import Message from './Message.js';


const Home = () => {

    const [message, setMessage] = useState({active:false,description:""});

    const messageShow = (act,desc) => {
        setMessage({active:act, description:desc});
    }

    const messageHide = () => {
        setMessage({active:false, description:""});
    }

    useEffect(()=>{
        if(message.active){
            var bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
            var toastElList = [].slice.call(document.querySelectorAll('.toast'))
            var toastList = toastElList.map(function(toastEl) {
              return new bootstrap.Toast(toastEl)
            });
           toastList.forEach(toast => toast.show()); 
        }
    },[message])

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <Banner />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <Converter message={messageShow} />
                </div>
            </div>
            {message.active && <Message messageHide={messageHide} message={message} />}
        </div>     
    );
}


export default Home;