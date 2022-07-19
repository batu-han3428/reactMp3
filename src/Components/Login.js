import React,{useState} from "react";
import './Login.css';
import {connect, useSelector} from 'react-redux';
import { startloading,endloading } from '../action/loader';
import { loginuser } from '../action/user';
import Loader from './Loader.js';
import swal from 'sweetalert';
import {post} from '../helpers/api';
import { Link, Navigate } from 'react-router-dom';
import {onLogin} from '../auth/useAuth';



const Login = (props) => {

  // const Authenticated = useSelector((state)=>state.userBilgileri)

  const [userMail, setUserMail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [accessError, setAccessError] = useState(false);


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
          //props.dispatch(loginuser({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2NTczNzMyNTMsImV4cCI6MTY1NzQ1OTY1MywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiaXNBdXRoZW50aWNhdGVkIjp0cnVlLCJuYW1lIjoiQmF0dWhhbiIsInJvbGVzIjpbXX0.rJ80q3-UBodApszPpPgiCuo19zc4ecduwthGkYUh_zc",name:"batuhan",roles:["admin"],isAuthenticated:true,exp:1021310}));       
         
          if(result === false){
            setAccessError(true);
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
    <>{ accessError ?  <Navigate to="/logout" />:
      props.User.isAuthenticated ? (
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