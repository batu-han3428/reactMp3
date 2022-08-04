import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import {onLogin} from '../auth/useAuth';
import {connect} from 'react-redux';
import { loginuser, logoutuser } from '../action/user';


const NewPasswordLayout = (props) => {
  useEffect(()=>{
    let result = onLogin("NewPasswordToken");

    if(result !== false)
        props.dispatch(loginuser(result));
  },[])
  return (
    <>
      <Outlet />
    </>
  );
};

export default connect()(NewPasswordLayout);