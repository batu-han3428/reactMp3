import React,{useEffect} from "react";
import { BsJustify } from "react-icons/bs";
import { Link, useLocation  } from 'react-router-dom';
import './Header.css';
import {locations, domainTest, domainLiveNetwork, domainLiveLocal} from '../helpers/locations';
import {connect} from 'react-redux';
import { GrContact } from "react-icons/gr";
import { GoHome } from "react-icons/go";
import { BiUser } from "react-icons/bi";
import { GiLoveSong } from "react-icons/gi";


const Header = (props) =>{

    let location = useLocation();

    useEffect(() => {
        let slides = document.querySelectorAll('.slide');
        let result = locations.filter(x=>x.location === location.pathname || x.turkish === location.pathname || x.english === location.pathname);
        slides.forEach((slide) => {
            slide.classList.remove('active');
            if(slide.firstElementChild.firstElementChild.href.substr(domainTest.length) === result[0].location){
                slide.classList.add('active');
            }
        })
    }, [location]);

    useEffect(()=>{
 
        let slides = document.querySelectorAll('.slide');

        for (let slide of slides) {
            slide.addEventListener('click', () => {
                clearActiveClasses();
                slide.classList.add('active');
            })
        }
        
        function clearActiveClasses() {
            slides.forEach((slide) => {
                slide.classList.remove('active');
            })
        }

        // document.querySelector('.slider-left-button').addEventListener('click',function(){
        //     let id = null;
        //     let pos = 0;
        //     clearInterval(id);
        //     id = setInterval(frame, 5);
        //     function frame() {
        //         if (pos == 100) {
        //             clearInterval(id);
        //         } else {
        //             pos++; 
        //             document.querySelector('.offcanvas-container').style.right = pos + "px";
        //         }
        //     }
           
        // })
      
    },[])


    return(
        <nav className="navbar fixed-top">
            <div className="container">
                <Link to="/" className="navbar-brand"><img src={require('../img/bfLogo.png')} alt="logo" className="navbar-logo"/></Link>
                {props.User.isAuthenticated &&
                <div>
                    <h5>Hoşgeldin {props.User.name}</h5>
                </div>}
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <BsJustify />
                </button>
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">                
                    <div className="offcanvas-body">
                        <div className="frame">
                            <div className="boxes">
                                <div className="box one">
                                    <Link to="/contact"><span className="text">İletişim</span></Link>
                                    <span className="icon"><GrContact className="filter-white" /></span>
                                </div>
                                <div className="box two">
                                    <span className="text">Trendler</span>
                                    <span className="icon"><GiLoveSong className="filter-white" /></span>
                                </div>
                                <div className="box three">
                                    {props.User.isAuthenticated?<Link to="/logout"><span className="text">Çıkış</span></Link>:<Link to="/login"><span className="text">Giriş</span></Link>}
                                    <span className="icon"><BiUser className="filter-white" /></span>
                                </div>
                                <div className="box four">
                                    <Link to="/"><span className="text">Ana Sayfa</span></Link>
                                    <span className="icon"><GoHome className="filter-white" /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}


const mapStateToProps = (store) =>{     
    return {
        User:store.userBilgileri || null
    }
  }
  
export default connect(mapStateToProps)(Header);