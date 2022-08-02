import React, { useEffect } from 'react';
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
import ConfirmLayout from '../Routers/ConfirmLayout';
import NotFound from '../Components/NotFound';
import Trends from '../Components/Trends';
import { locations } from '../helpers/locations';


const App = () =>{
  return(
    <BrowserRouter>
      <Routes>
          <Route element={<Layout />}>
            <Route exact path={locations.Home.location} element={<Home/>} />
            <Route path={locations.Home.english} element={<Home/>} />
            <Route path={locations.Home.turkish} element={<Home/>} />
            <Route path={locations.Contact.english} element={<Contact/>} />  
            <Route path={locations.Contact.turkish}  element={<Contact/>} />  
            <Route path={locations.Trends.english} element={
              <PrivateRoute pageRoles={["basic"]}>
                <Trends/>
              </PrivateRoute>}
            />  
            <Route path={locations.Trends.turkish} element={
              <PrivateRoute pageRoles={["basic"]}>
                <Trends/>
              </PrivateRoute>}
            />  
            <Route path={locations.Login.english} element={<Login/>} />
            <Route path={locations.Login.turkish} element={<Login/>} />
            <Route path={locations.Register.english} element={<Register/>} />
            <Route path={locations.Register.turkish} element={<Register/>} />
          </Route>
          <Route element={<ConfirmLayout />}>
            <Route path={locations.ConfirmEmail.location+"/:state"} element={
              <PrivateRoute pageRoles={["api"]}>
                <ConfirmEmail />
              </PrivateRoute>
            } />
          </Route>
          <Route path={locations.Logout.location} element={<Logout />} />
          <Route path={locations.NotFound.location} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
