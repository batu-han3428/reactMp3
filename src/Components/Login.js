import React,{useState} from "react";
import './Login.css';
import {connect} from 'react-redux';
import { startloading,endloading } from '../action/loader';
import { loginuser, logoutuser } from '../action/user';
import Loader from './Loader.js';
import swal from 'sweetalert';
import {post} from '../helpers/api';
import { Link, Navigate } from 'react-router-dom';
import {onLogin, onLogout} from '../auth/useAuth';



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
          let result = onLogin("AccessToken");
          if(result === false){
            onLogout();
            props.dispatch(logoutuser()); 
          }else{
            props.dispatch(loginuser(result)); 
          }
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
    <> {props.User.isAuthenticated ? (
      <Navigate to="/" />
    ) : (
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
      
      )}{props.Loader && <Loader/>}
    </>
  );
}


const mapStateToProps = (store) =>{     
  return {
      Loader:store.loaderBilgileri || "",
      User:store.userBilgileri || null
  }
}

export default connect(mapStateToProps)(Login);