import React,{Component} from "react";
import './Login.css';
import {connect} from 'react-redux';
import { startloading,endloading } from '../action/loader';
import Loader from './Loader.js';
import swal from 'sweetalert';
import {post} from '../methods/api';


class Login extends Component{
  constructor(props){ 
    super(props) 
    this.state = {
      userName: "",
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
      post('User/Login',{Email: document.getElementById('userName').value,Password:document.getElementById('password').value })
      .then(resp=>{
        if(resp === "success"){
          this.props.dispatch(endloading())
          window.location.href = "https://localhost:3000/";
        }else{
          swal("Giriş Başarısız!", "", "error");
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
                <input onChange={(e)=>this.setState({userName:e.target.value})} autoComplete="none" type="text" name="" required="" id="userName"/>
                <label>Kullanıcı Adı</label>
              </div>
              <div className="user-box">
                <input onChange={(e)=>this.setState({userPassword:e.target.value})} type="password" name="" required="" id="password"/>
                <label>Parola</label>
              </div>
              <a href="#" onClick={this.login}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Giriş
              </a>
              <a href="#" className="register">    
              <span></span>
                <span></span>
                <span></span>
                <span></span>         
                Kayıt Ol
              </a>
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