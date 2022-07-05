import React,{useState} from "react";
import './Login.css';
import {connect} from 'react-redux';
import { startloading,endloading } from '../action/loader';
import Loader from './Loader.js';
import swal from 'sweetalert';
import {post} from '../methods/api';
import { Link } from 'react-router-dom';


const Login = (props) => {

  const [userMail, setUserMail] = useState("");
  const [userPassword, setUserPassword] = useState("");


  const inputControl = () => {
    if(userMail == "" || userPassword == "")
      return true;
    else
      return false;
  }


  const login = () => {
    if(inputControl())
      swal("Tüm Alanlar Zorunludur!", "", "error");
    else{
      props.dispatch(startloading())
      post('User/Login',{Email: userMail, Password:userPassword})
      .then(resp=>{
        if(resp === 200){
          props.dispatch(endloading())
          window.location.href = "https://localhost:3000/";
        }else if(resp === 403){
          swal("Email yada parola hatalı!", "", "error");
          props.dispatch(endloading()) 
        }else if(resp === 401){
          swal("Lütfen üyeliğinizi onaylayınız.", "", "error");
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
      <div className="login-box">
        <h2>Giriş</h2>
        <form>
          <div className="user-box">
            <input onChange={(e)=>setUserMail(e.target.value)} autoComplete="none" type="text" name="" required=""/>
            <label>Mail</label>
          </div>
          <div className="user-box">
            <input onChange={(e)=>setUserPassword(e.target.value)} type="password" name="" required=""/>
            <label>Parola</label>
          </div>
          <Link to="#" onClick={login}>
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
      {props.Loader && <Loader/>}
    </>
  );
}


const mapStateToProps = (store) =>{     
  return {
      Loader:store.loaderBilgileri || ""
  }
}

export default connect(mapStateToProps)(Login);