import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import {onLogin, onLogout} from '../auth/useAuth';
import {connect} from 'react-redux';
import { loginuser, logoutuser } from '../action/user';


const Layout = (props) => {
  useEffect(()=>{
    let result = onLogin("AccessToken");
    // console.log(result);
    if(result === false){
      onLogout();
      props.dispatch(logoutuser()); 
    }else{
      //console.log("sdda")
      props.dispatch(loginuser(result)); 
    }
  },[])
  return (
    <>
      <Header  />
      <Outlet />
    </>
  );
};

export default connect()(Layout);