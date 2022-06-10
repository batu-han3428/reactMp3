// import logo from '../logo.svg';
// import '../App.css';
import { Component } from 'react';
import {BrowserRouter,Routes ,Route} from 'react-router-dom'
import Header from "../Components/Header";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Home from '../Components/Home';


class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <Header/>
        <Routes >
          <Route path="/" element={<Home/>} />
        </Routes >
      </BrowserRouter>
    );
  }
}

export default App;
