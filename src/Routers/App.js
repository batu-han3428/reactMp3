import { Component } from 'react';
import {BrowserRouter,Routes ,Route} from 'react-router-dom'
import Header from "../Components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
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
