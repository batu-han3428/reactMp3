import React,{Component} from "react";
import './Register.css';
import {connect} from 'react-redux';
import { startloading,endloading } from '../action/loader';
import Loader from './Loader.js';
import swal from 'sweetalert';
import {post} from '../methods/api';
import { Link } from 'react-router-dom';


class Register extends Component{
  constructor(props){ 
    super(props) 
    this.state = {
      userName: "",
      userSurName:"",
      userMail:"",
      userPassword:"",
      userRPassword:""
    }
    this.register = this.register.bind(this);
    this.inputControl = this.inputControl.bind(this);
    this.passwordControl = this.passwordControl.bind(this);
  }
 
  inputControl(){
      if(this.state.userName == "" || this.state.userPassword == "" || this.state.userMail == "" || this.state.userRPassword == "" || this.state.userSurName == "")
        return true;
      else
        return false;
  }

  passwordControl(){
    if(this.state.userPassword === this.state.userRPassword)
      return false;
    else
      return true;
  }

  register(){
    if(this.inputControl())
      swal("Tüm Alanlar Zorunludur!", "", "error");
    else if(this.passwordControl())
      swal("Parolalar Aynı Olmalı!", "", "error");
    else{
      this.props.dispatch(startloading())
      post('User/Register',{Email: this.state.userMail, Name: this.state.userName, Surname: this.state.userSurName, Password: this.state.userPassword})
      .then(resp=>{
        console.log(resp);
        if(resp === 200){
          this.props.dispatch(endloading())
          window.location.href = "https://localhost:3000/login";
        }else if(resp === 400){
          swal("Beklenmeyen Bir Hata Oluştu!", "", "error");
          this.props.dispatch(endloading()) 
        }else if(resp === 403){
          swal("Kullanıcı Zaten Kayıtlı!", "", "error");
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
          <div className="register-box">
            <h2>Giriş</h2>
            <form>
              <div className="user-box">
                <input onChange={(e)=>this.setState({userName:e.target.value})} autoComplete="none" type="text" name="" required=""/>
                <label>Ad</label>
              </div>
              <div className="user-box">
                <input onChange={(e)=>this.setState({userSurName:e.target.value})} autoComplete="none" type="text" name="" required=""/>
                <label>Soyad</label>
              </div>
              <div className="user-box">
                <input onChange={(e)=>this.setState({userMail:e.target.value})} autoComplete="none" type="text" name="" required=""/>
                <label>Mail</label>
              </div>
              <div className="user-box">
                <input onChange={(e)=>this.setState({userPassword:e.target.value})} type="password" name="" required=""/>
                <label>Parola</label>
              </div>
              <div className="user-box">
                <input onChange={(e)=>this.setState({userRPassword:e.target.value})} type="password" name="" required=""/>
                <label>T-Parola</label>
              </div>
              <Link to="#" onClick={this.register}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Kaydet
              </Link>
              <Link to="/login" className="back"> 
                <span></span>
                <span></span>
                <span></span>
                <span></span>         
                Geri
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

export default connect(mapStateToProps)(Register);