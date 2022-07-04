import React,{Component} from "react";
import './Register.css';
import {connect} from 'react-redux';
import { startloading,endloading } from '../action/loader';
import Loader from './Loader.js';
import swal from 'sweetalert';
import {post} from '../methods/api';
import { Link } from 'react-router-dom';
import { AiFillCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";


class Register extends Component{
  constructor(props){ 
    super(props) 
    this.state = {
      userName: "",
      userSurName:"",
      userMail:"",
      userPassword:"",
      userRPassword:"",
      validateEmail:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      checkLength:false,
      checkLowerCase:false,
      checkUpperCase:false,
      checkNumber:false
    }
    this.register = this.register.bind(this);
    this.inputControl = this.inputControl.bind(this);
    this.passwordControl = this.passwordControl.bind(this);
    this.passwordValidation = this.passwordValidation.bind(this);
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

  mailControl(){
    if(!this.state.validateEmail.test(String(this.state.userMail).toLowerCase()))
      return true;
    else
      return false;
  }

  passwordValidation(value){
    this.setState({
      checkLength:value.length >= 8,
      checkLowerCase:/[a-z|ç|ş|ö|ü|ı|ğ]/u.test(value),
      checkUpperCase:/[A-Z|Ç|Ş|Ö|Ü|İ|Ğ]/u.test(value),
      checkNumber:/[0-9]/.test(value)
    })
  }

  clearInputs(){
    this.setState({
      userName: "",
      userSurName:"",
      userMail:"",
      userPassword:"",
      userRPassword:"",
      checkLength:false,
      checkLowerCase:false,
      checkUpperCase:false,
      checkNumber:false
    })
  }

  register(){
    if(this.inputControl())
      swal("Tüm Alanlar Zorunludur!", "", "warning");
    else if(this.passwordControl())
      swal("Parolalar Eşleşmiyor!", "", "warning");
    else if(this.mailControl()){
      swal("Lütfen Geçerli Bir Mail Adresi Giriniz!", "", "warning");
    }
    else if(!this.state.checkLength || !this.state.checkLowerCase || !this.state.checkNumber || !this.state.checkUpperCase){
      swal("Lütfen Geçerli Bir Parola Giriniz!", "", "warning");
    }
    else{
      this.props.dispatch(startloading())
      post('User/Register',{Email: this.state.userMail, Name: this.state.userName, Surname: this.state.userSurName, Password: this.state.userPassword})
      .then(resp=>{
        if(resp === 200){
          this.props.dispatch(endloading());
          this.clearInputs();
          swal({title: "Üyeliğinizi Onaylamak İçin Size Mail Gönderdik..",
          text: "",
          icon: "warning",
          dangerMode: true,});
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
            <div className="validationPassword">
              Parola:
              <ul>
                <li><span>{this.state.checkLength && <AiFillCheckCircle  /> || <AiOutlineCloseCircle viewBox="0 0 1000 1000" />}</span> En az 8 karakterli olmalı..</li>
                <li><span>{this.state.checkLowerCase && <AiFillCheckCircle /> || <AiOutlineCloseCircle />}</span> En az 1 küçük harf olmalı..</li>
                <li><span>{this.state.checkUpperCase && <AiFillCheckCircle /> || <AiOutlineCloseCircle />}</span> En az 1 büyük harf olmalı..</li>
                <li><span>{this.state.checkNumber && <AiFillCheckCircle /> || <AiOutlineCloseCircle />}</span> En az bir rakam olmalı..</li>
              </ul>
            </div>
            <form>
              <div className="user-box">
                <input value={this.state.userName} onChange={(e)=>this.setState({userName:e.target.value})} autoComplete="none" type="text" name="" required=""/>
                <label>Ad</label>
              </div>
              <div className="user-box">
                <input value={this.state.userSurName} onChange={(e)=>this.setState({userSurName:e.target.value})} autoComplete="none" type="text" name="" required=""/>
                <label>Soyad</label>
              </div>
              <div className="user-box">
                <input value={this.state.userMail} onChange={(e)=>this.setState({userMail:e.target.value})} autoComplete="none" type="text" name="" required=""/>
                <label>Mail</label>
              </div>
              <div className="user-box">
                <input value={this.state.userPassword} onChange={(e)=>{this.setState({userPassword:e.target.value}); this.passwordValidation(e.target.value);}} type="password" name="" required=""/>
                <label>Parola</label>
              </div>
              <div className="user-box">
                <input value={this.state.userRPassword} onChange={(e)=>this.setState({userRPassword:e.target.value})} type="password" name="" required=""/>
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