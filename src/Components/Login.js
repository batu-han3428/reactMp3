import React,{Component} from "react";
import './Login.css';
import {connect} from 'react-redux';
import { startloading,endloading } from '../action/loader';
import Loader from './Loader.js';
import swal from 'sweetalert';
import {post} from '../methods/api';
import { Link } from 'react-router-dom';


class Login extends Component{
  constructor(props){ 
    super(props) 
    this.state = {
      userMail: "",
      userPassword:""
    }
    this.login = this.login.bind(this);
    this.inputControl = this.inputControl.bind(this);
  }
 
  inputControl(){
      if(this.state.userName == "" || this.state.userPassword == "")
        return true;
      else
        return false;
  }

  login(){
    if(this.inputControl())
      swal("Tüm Alanlar Zorunludur!", "", "error");
    else{
      this.props.dispatch(startloading())
      post('User/Login',{Email: this.state.userMail, Password:this.state.userPassword})
      .then(resp=>{
        if(resp === 200){
          this.props.dispatch(endloading())
          window.location.href = "https://localhost:3000/";
        }else if(resp === 403){
          swal("Email yada parola hatalı!", "", "error");
          this.props.dispatch(endloading()) 
        }else if(resp === 401){
          swal("Lütfen üyeliğinizi onaylayınız.", "", "error");
          this.props.dispatch(endloading()) 
        }else{
          swal(resp.data || "", "", "error");
          this.props.dispatch(endloading())
        }
      })
    }
  }

  render(){
      return(
        <>
          <div className="login-box">
            <h2>Giriş</h2>
            <form>
              <div className="user-box">
                <input onChange={(e)=>this.setState({userMail:e.target.value})} autoComplete="none" type="text" name="" required=""/>
                <label>Mail</label>
              </div>
              <div className="user-box">
                <input onChange={(e)=>this.setState({userPassword:e.target.value})} type="password" name="" required=""/>
                <label>Parola</label>
              </div>
              <Link to="#" onClick={this.login}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Giriş
              </Link>
              <Link to="/register" className="register">
                <span></span>
                <span></span>
                <span></span>
                <span></span>         
                Kayıt Ol
              </Link>
            </form>
          </div>
          {this.props.Loader && <Loader/>}
        </>
      );
  }
} 

const mapStateToProps = (store) =>{     
  return {
      Loader:store.loaderBilgileri || ""
  }
}

export default connect(mapStateToProps)(Login);