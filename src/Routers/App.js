import React from 'react';
import {BrowserRouter,Routes ,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from '../Components/Home';
import Contact from '../Components/Contact';
import Login from '../Components/Login';
import Register from '../Components/Register';
import ConfirmEmail from '../Components/ConfirmEmail';
import Layout from './Layout';
import PrivateRoute from '../auth/privateRoute';
import Logout from '../Components/Logout';


const App = () =>{
  return(
    <BrowserRouter>
      <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/ev" element={<Home/>} />
            <Route path="/contact" element={
              <PrivateRoute>
                <Contact/>
              </PrivateRoute>}
            />  
            <Route path="/iletisim" element={
              <PrivateRoute>
                <Contact/>
              </PrivateRoute>}
            />  
            <Route path="/login" element={<Login/>} />
            <Route path="/giris" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/kayit" element={<Register/>} />
          </Route>
          <Route path="/ConfirmEmail/:state" element={<ConfirmEmail />} />
          <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
