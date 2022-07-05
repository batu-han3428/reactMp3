import React,{useEffect} from "react";
import { BsJustify } from "react-icons/bs";
import { Link, useLocation  } from 'react-router-dom';
import './Header.css';
import locations from '../helpers/locations';


const Header = () =>{

    let location = useLocation();

    useEffect(() => {
        let slides = document.querySelectorAll('.slide');

        slides.forEach((slide) => {
            slide.classList.remove('active');
            let result = locations.filter(x=>x.location === location.pathname || x.turkish === location.pathname || x.english === location.pathname);
            if(slide.firstElementChild.firstElementChild.href.substr(22) === result[0].location){
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
      
    },[])


    return(
        <nav className="navbar fixed-top">
            <div className="container">
                <Link to="/" className="navbar-brand"><img src={require('../img/bfLogo.png')} alt="logo" className="navbar-logo"/></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <BsJustify />
                </button>
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header border-bottom">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Mp3 Converter</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <div className="container">
                            <div className="slide active" 
                                style={{backgroundImage:`url(${require('../img/song.png')})` }}>
                                <h3><Link to="/">Ana Sayfa</Link></h3>
                            </div>
                            <div 
                                className="slide" 
                                style={{backgroundImage:`url(${require('../img/mp3MenuSound5.png')})` }}>
                                <h3><Link to="/login">Giriş</Link></h3>
                            </div>
                            <div 
                                className="slide" 
                                style={{backgroundImage:`url(${require('../img/mp3MenuSound4.jpg')})` }}>
                                <h3><Link to="/contact">İletişim</Link></h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}


export default Header;