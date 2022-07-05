import React,{useState} from "react";
import './Register.css';
import {connect} from 'react-redux';
import { startloading,endloading } from '../action/loader';
import Loader from './Loader.js';
import swal from 'sweetalert';
import {post} from '../methods/api';
import { Link } from 'react-router-dom';
import { AiFillCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";


const Register = (props) =>{

  const [userName, setUserName] = useState("");
  const [userSurName, setuserSurName] = useState("");
  const [userMail, setuserMail] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [userRPassword, setuserRPassword] = useState("");
  const [validateEmail, setvalidateEmail] = useState(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  const [checkLength, setcheckLength] = useState(false);
  const [checkLowerCase, setcheckLowerCase] = useState(false);
  const [checkUpperCase, setcheckUpperCase] = useState(false);
  const [checkNumber, setcheckNumber] = useState(false);


  const inputControl = () => {
    if(userName == "" || userPassword == "" || userMail == "" || userRPassword == "" || userSurName == "")
      return true;
    else
      return false;
  }


  const passwordControl = () => {
    if(userPassword === userRPassword)
      return false;
    else
      return true;
  }


  const mailControl = () => {
    if(!validateEmail.test(String(userMail).toLowerCase()))
      return true;
    else
      return false;
  }


  const passwordValidation = (value) => {
    setcheckLength(value.length >= 8);
    setcheckLowerCase(/[a-z|ç|ş|ö|ü|ı|ğ]/u.test(value));
    setcheckUpperCase(/[A-Z|Ç|Ş|Ö|Ü|İ|Ğ]/u.test(value));
    setcheckNumber(/[0-9]/.test(value));
  }


  const clearInputs = () => {
    setUserName("");
    setuserSurName("");
    setuserMail("");
    setuserPassword("");
    setuserRPassword("");
    setcheckLength(false);
    setcheckLowerCase(false);
    setcheckUpperCase(false);
    setcheckNumber(false);
  }


  const register = () => {
    if(inputControl())
      swal("Tüm Alanlar Zorunludur!", "", "warning");
    else if(passwordControl())
      swal("Parolalar Eşleşmiyor!", "", "warning");
    else if(mailControl()){
      swal("Lütfen Geçerli Bir Mail Adresi Giriniz!", "", "warning");
    }
    else if(!checkLength || !checkLowerCase || !checkNumber || !checkUpperCase){
      swal("Lütfen Geçerli Bir Parola Giriniz!", "", "warning");
    }
    else{
      props.dispatch(startloading())
      post('User/Register',{Email: userMail, Name: userName, Surname: userSurName, Password: userPassword})
      .then(resp=>{
        if(resp === 200){
          props.dispatch(endloading());
          clearInputs();
          swal({title: "Üyeliğinizi Onaylamak İçin Size Mail Gönderdik..",
          text: "",
          icon: "warning",
          dangerMode: true,});
        }else if(resp === 403){
          swal("Kullanıcı Zaten Kayıtlı!", "", "error");
          props.dispatch(endloading()) 
        }else{
          swal(resp.data || "", "", "error");
          props.dispatch(endloading())
        }
      })
    }
  }


  return(
        <>
          <div className="register-box">
            <h2>Giriş</h2>
            <div className="validationPassword">
              Parola:
              <ul>
                <li><span>{checkLength && <AiFillCheckCircle  /> || <AiOutlineCloseCircle viewBox="0 0 1000 1000" />}</span> En az 8 karakterli olmalı..</li>
                <li><span>{checkLowerCase && <AiFillCheckCircle /> || <AiOutlineCloseCircle />}</span> En az 1 küçük harf olmalı..</li>
                <li><span>{checkUpperCase && <AiFillCheckCircle /> || <AiOutlineCloseCircle />}</span> En az 1 büyük harf olmalı..</li>
                <li><span>{checkNumber && <AiFillCheckCircle /> || <AiOutlineCloseCircle />}</span> En az bir rakam olmalı..</li>
              </ul>
            </div>
            <form>
              <div className="user-box">
                <input value={userName} onChange={(e)=>setUserName(e.target.value)} autoComplete="none" type="text" name="" required=""/>
                <label>Ad</label>
              </div>
              <div className="user-box">
                <input value={userSurName} onChange={(e)=>setuserSurName(e.target.value)} autoComplete="none" type="text" name="" required=""/>
                <label>Soyad</label>
              </div>
              <div className="user-box">
                <input value={userMail} onChange={(e)=>setuserMail(e.target.value)} autoComplete="none" type="text" name="" required=""/>
                <label>Mail</label>
              </div>
              <div className="user-box">
                <input value={userPassword} onChange={(e)=>{setuserPassword(e.target.value); passwordValidation(e.target.value);}} type="password" name="" required=""/>
                <label>Parola</label>
              </div>
              <div className="user-box">
                <input value={userRPassword} onChange={(e)=>setuserRPassword(e.target.value)} type="password" name="" required=""/>
                <label>T-Parola</label>
              </div>
              <Link to="#" onClick={register}>
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
          {props.Loader && <Loader/>}
        </>
  );
}


const mapStateToProps = (store) =>{     
  return {
      Loader:store.loaderBilgileri || ""
  }
}

export default connect(mapStateToProps)(Register);