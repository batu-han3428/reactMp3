import React,{Component} from "react";
import './Login.css';

class Login extends Component{
    render(){
        return(
          <div className="login-box">
            <h2>Giriş</h2>
            <form>
              <div className="user-box">
                <input type="text" name="" required="" />
                <label>Kullanıcı Adı</label>
              </div>
              <div className="user-box">
                <input type="password" name="" required="" />
                <label>Parola</label>
              </div>
              <a href="#">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Giriş
              </a>
              <a href="#" className="register">             
                Kayıt Ol
              </a>
            </form>
          </div>
        );
    }
} 

export default Login;