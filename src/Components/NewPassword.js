import React,{useState} from "react";
import './ResetPassword.css';
import {connect} from 'react-redux';
import { startloading,endloading } from '../action/loader';
import Loader from './Loader.js';
import swal from 'sweetalert';
import {post} from '../helpers/api';
import { Link } from 'react-router-dom';




const NewPassword = (props) => {

    const [userPassword, setuserPassword] = useState("");
    const [userRPassword, setuserRPassword] = useState("");
    const [checkLength, setcheckLength] = useState(false);
    const [checkLowerCase, setcheckLowerCase] = useState(false);
    const [checkUpperCase, setcheckUpperCase] = useState(false);
    const [checkNumber, setcheckNumber] = useState(false);


    const inputControl = () => {
        if(userPassword == "" || userRPassword == "")
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

    const passwordValidation = (value) => {
        setcheckLength(value.length >= 8);
        setcheckLowerCase(/[a-z|ç|ş|ö|ü|ı|ğ]/u.test(value));
        setcheckUpperCase(/[A-Z|Ç|Ş|Ö|Ü|İ|Ğ]/u.test(value));
        setcheckNumber(/[0-9]/.test(value));
    }


    const resetPassword = () => {
        if(inputControl())
            swal("Tüm Alanlar Zorunludur!", "", "warning");
        else if(passwordControl())
            swal("Parolalar Eşleşmiyor!", "", "warning");
        else if(!checkLength || !checkLowerCase || !checkNumber || !checkUpperCase){
            swal("Lütfen Geçerli Bir Parola Giriniz!", "", "warning");
        }else{
            props.dispatch(startloading())
            post('User/NewPassword',{Email: props.User.mail, Password:userPassword})
            .then(resp=>{
                if(resp === 200){
                    props.dispatch(endloading());
                    swal({title: "Şifreniz Başarılı Şekilde Değiştirildi..",
                    text: "",
                    icon: "success",
                    dangerMode: true});
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
        <h5>Şifre Sıfırlama</h5>
        <form>
            <div className="user-box">
                <input value={userPassword} onChange={(e)=>{setuserPassword(e.target.value); passwordValidation(e.target.value);}} type="password" name="" required=""/>
                <label>Parola</label>
            </div>
            <div className="user-box">
                <input value={userRPassword} onChange={(e)=>setuserRPassword(e.target.value)} type="password" name="" required=""/>
                <label>T-Parola</label>
            </div>
            <div className="resetPasswordMain">
                <Link onClick={resetPassword} to="#" className="resetPassword">Kaydet</Link>
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

export default connect(mapStateToProps)(NewPassword);