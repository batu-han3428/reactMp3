import React,{Component} from "react";
import Banner from './Banner.js';
import Converter from './Converter.js';
import './Home.css';
import Message from './Message.js';


class Home extends Component{
    constructor(props){ 
        super(props) 
        this.state = {
            message:{
                active:false,
                description:""
            }
        }
        this.messageShow = this.messageShow.bind(this);
        this.messageHide = this.messageHide.bind(this);
    }

    messageShow(act,desc){
        this.setState({
            message:{
                active:act,
                description:desc
            }
        })
    }

    messageHide(){
        this.setState({
            message:{
                active:false,
                description:""
            }
        })
    }

    componentDidUpdate(){
        if(this.state.message.active){
            var bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
            var toastElList = [].slice.call(document.querySelectorAll('.toast'))
            var toastList = toastElList.map(function(toastEl) {
              return new bootstrap.Toast(toastEl)
            });
           toastList.forEach(toast => toast.show()); 
        }
    }

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
                        <Converter message={this.messageShow} />
                    </div>
                </div>
                {this.state.message.active && <Message messageHide={this.messageHide} message={this.state.message} />}
            </div>     
        );
    }
} 

export default Home;