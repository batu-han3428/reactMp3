import React,{useLayoutEffect, useState, useRef} from "react";
import './ResetPassword.css';
import {connect} from 'react-redux';
import { startloading, endloading } from '../action/loader';
import Loader from './Loader.js';
import swal from 'sweetalert';
import {post} from '../helpers/api';
import { Link } from 'react-router-dom';



const ResetPassword = (props) => {

  const [userMail, setUserMail] = useState("");
  const [validateEmail, setvalidateEmail] = useState(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  const [counter, setCounter] = useState();
  const [disabledLink, setDisabledLink] = useState(false);
  const [myInterval, setMyInterval] = useState(false);
  const [intervalId, setIntervalId] = useState(0);
  const firstUpdate = useRef(true);

  const inputControl = () => {
    if(userMail == "")
      return true;
    else
      return false;
  }
  
  const mailControl = () => {
    if(!validateEmail.test(String(userMail).toLowerCase()))
      return true;
    else
      return false;
  }

  const resetPassword = (e) => { 
    if(!disabledLink){
      if(inputControl())
        swal("Mail Zorunludur!", "", "error");
      else if(mailControl())
        swal("Lütfen Geçerli Bir Mail Adresi Giriniz!", "", "error");
      else{
        props.dispatch(startloading())
        post('User/ResetPassword',{Mail: userMail})
        .then(resp=>{
          if(resp === 200){
            swal({title: "Şifrenizi Sıfırlamanız İçin Size Mail Gönderdik..",
            text: "",
            icon: "warning",
            dangerMode: true,});
            props.dispatch(endloading());
            setDisabledLink(true);
            e.target.classList.add('disabledLink');
            setMyInterval(0);
          }else if(resp === 403){
            swal("Kayıtlı Mail Adresi Bulunamadı!", "", "error");
            props.dispatch(endloading()) 
          }else{
            swal(resp.data || "", "", "error");
            props.dispatch(endloading())
          }
        })
      }
    }
  }

  useLayoutEffect(()=>{
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if(!myInterval) setIntervalId(startCounter())
    else{
      clearInterval(intervalId);  
      document.getElementById('resetPassword').classList.remove('disabledLink');
      setDisabledLink(false);
    } 
  },[myInterval])

  const startCounter = () =>{
    let dakika = 4
    let saniye = 60;
    return setInterval(() => {
      if(saniye === "00"){
        saniye = 60;
        dakika = dakika - 1;
      }
      if(saniye < 11){
          let veri = saniye-1;
          saniye = 0+""+veri;
      }else{
          saniye = saniye-1;
      }
    
      setCounter(dakika+":"+saniye)

      if(dakika === 0 && saniye === "00"){
        setMyInterval(true)
      }
    }, 1000);
  }

  return(
    <>
      <div className="login-box">
        <h5>Şifre Sıfırlama</h5>
        <form>
          <div className="user-box">
            <input onChange={(e)=>setUserMail(e.target.value)} autoComplete="none" type="text" name="" required=""/>
            <label>Mail</label>
          </div>
          <div className="resetPasswordMain">
            <Link onClick={(e)=>resetPassword(e)} to="#" id="resetPassword" className="resetPassword">Gönder</Link>        
            <span className="counter">{counter}</span>  
          </div>
        </form>
      </div>
      {props.Loader && <Loader/>}
    </>
  );
}


const mapStateToProps = (store) =>{     
  return {
      Loader:store.loaderBilgileri || "",
      User:store.userBilgileri || null
  }
}

export default connect(mapStateToProps)(ResetPassword);