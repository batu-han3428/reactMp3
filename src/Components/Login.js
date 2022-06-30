import React,{Component} from "react";
import './Login.css';
import {connect} from 'react-redux';
import { UpdateToken } from '../action/token';
import Loader from './Loader.js';
import swal from 'sweetalert';
import {post} from '../methods/api';


class Login extends Component{
  constructor(props){ 
    super(props) 
    this.state = {
        user:{
            loader:false
        }
    }
    this.login = this.login.bind(this);
  }
 
  inputControl(){
    if(document.querySelectorAll('input').forEach(a=>a.value == ""))
      return true;
    else
      return false;
  }



  login(){
    
    if(this.inputControl())
      swal("Tüm Alanlar Zorunludur!", "", "error");
    else{
      this.setState({loader:true})
      post('User/Login',{Email: document.getElementById('userName').value,Password:document.getElementById('password').value })
      .then(resp=>{
        if(resp != "" && resp != undefined){
          this.setState({loader:false});
          console.log(resp)
          // window.location.href = "http://localhost:3000/";
        }else{
          swal("Giriş Başarısız!", "", "error");
          this.setState({loader:false});
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
                <input type="text" name="" required="" id="userName"/>
                <label>Kullanıcı Adı</label>
              </div>
              <div className="user-box">
                <input type="password" name="" required="" id="password"/>
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
                Kayıt Ol
              </a>
            </form>
          </div>
          {this.state.loader && <Loader/>}
        </>
      );
  }
} 

export default connect()(Login);