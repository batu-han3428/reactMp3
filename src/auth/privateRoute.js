import { useEffect, useRef } from "react";
import {connect} from 'react-redux';


const PrivateRoute = ({ children, User }) => {
  
  const isInitialMount = useRef(true);

  useEffect(()=>{

    if (isInitialMount.current) {
      isInitialMount.current = false;
   } else {   
    //  console.log(isInitialMount)
    // console.log(User)
   }
   
  },[User])

  return <>{children}</>;
};


const mapStateToProps = (store) =>{     
  return {
      User:store.userBilgileri || null
  }
}

export default connect(mapStateToProps)(PrivateRoute);