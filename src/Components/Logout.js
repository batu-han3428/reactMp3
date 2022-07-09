import React,{useEffect} from "react";
import { Navigate } from 'react-router-dom';
import { onLogout} from '../auth/useAuth';
import { logoutuser } from '../action/user';
import {connect} from 'react-redux';


const Logout = (props) => {
    useEffect(()=>{
        props.dispatch(logoutuser()); 
        onLogout();
    },[])

  return <Navigate to="/login" />
}

export default connect()(Logout);