import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const ConfirmEmail = () =>{
  const params = useParams();
  const [gif, setGif] = useState("");
  useEffect(()=>{
    if(params === true)
      setGif(true)
    else if(params === false)
      setGif(false)
  },[])
  return (
      <div id="mainDiv" style={{display:"flex",justifyContent:"center", height:"100vh", alignItems:"center"}}>
        <img style={{width:"40%", height:"50vh"}} src={require(`../img/${gif}`)} alt="successEmailPhoto"/>
      </div>
  )
}


export default ConfirmEmail;