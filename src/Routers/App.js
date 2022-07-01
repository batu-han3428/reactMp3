import { Component } from 'react';
import {BrowserRouter,Routes ,Route} from 'react-router-dom'
import Header from "../Components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from '../Components/Home';
import Contact from '../Components/Contact';
import Login from '../Components/Login';
import Register from '../Components/Register';


class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/ev" element={<Home/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/iletisim" element={<Contact/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/giris" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/kayit" element={<Register/>} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
