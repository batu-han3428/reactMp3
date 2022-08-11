import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import './Header.css';
import {locations, domainTest, domainLiveNetwork, domainLiveLocal} from '../helpers/locations';
import {connect} from 'react-redux';
import { BsJustify, BsClockHistory } from "react-icons/bs";
import { GrContact } from "react-icons/gr";
import { GoHome } from "react-icons/go";
import { BiUser } from "react-icons/bi";
import { GiLoveSong } from "react-icons/gi";
import { FcSettings } from "react-icons/fc";
import { CgClose } from "react-icons/cg";
import { AiOutlineMessage } from "react-icons/ai";
import { TbLanguage } from "react-icons/tb";
import { FiSettings, FiHelpCircle } from "react-icons/fi";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";
import { useTranslation } from 'react-i18next';



const Header = (props) =>{

    const { t, i18n } = useTranslation();

    const userLanguageActive = (e) => {
        document.getElementById('user-settings-language').firstChild.firstChild.childNodes.forEach((item)=>item.classList.remove('active'));
        e.target.classList.add('active')
        i18n.changeLanguage(e.target.id)
    }

    // useEffect(()=>{

    //     document.getElementById('user-settings-language').firstChild.childNodes.forEach((item)=>{
    //         item.addEventListener('click',function(){
    //             document.getElementById('user-settings-language').firstChild.childNodes.forEach((item)=>item.classList.remove('active'));
    //             this.classList.add('active');
    //         });
    //     });
    //     i18n.changeLanguage('en-US')
    // },[])
    

    return(
        <nav className="navbar fixed-top">
            <div className="container">
                <Link to="/" className="navbar-brand"><img src={require('../img/bfLogo.png')} alt="logo" className="navbar-logo"/></Link>
                {props.User.isAuthenticated &&
                <div className="d-flex position-relative" id="user-information">
                    <h5>{t('Hoşgeldin')} {props.User.name}</h5>
                    <button className="btn" type="button" data-bs-toggle="collapse" data-bs-target="#user-settings" aria-expanded="false" aria-controls="user-settings">
                        <FcSettings style={{cursor:"pointer"}}  />
                    </button>
                    <div className="collapse" id="user-settings">
                        <div className="card card-body p-0">
                            <div className="list-group">
                                <a href="#" className="list-group-item list-group-item-action"><BsClockHistory /> İndirme Geçmişim</a>
                                <a href="#" className="list-group-item list-group-item-action"><AiOutlineMessage /> Mesajlarım</a>
                                <Link data-bs-toggle="collapse" data-bs-target="#user-settings-language" to="#" className="list-group-item list-group-item-action"><TbLanguage /> Dil Ayarı <MdOutlineArrowForwardIos /></Link>
                                <a href="#" className="list-group-item list-group-item-action"><FiSettings /> Ayarlar</a>
                                <a href="#" className="list-group-item list-group-item-action"><FiHelpCircle /> Yardım</a>
                                <Link to="/logout" className="list-group-item list-group-item-action"><IoExitOutline /> Çıkış</Link>
                            </div>
                            <div className="collapse" id="user-settings-language">
                                <div className="card card-body p-0">
                                    <div className="list-group">
                                        <Link id="tr-TR" onClick={(e)=>userLanguageActive(e)} to="#" className="list-group-item list-group-item-action active"><TbLanguage /> Türkçe</Link>
                                        <Link id="en-US" onClick={(e)=>userLanguageActive(e)} to="#" className="list-group-item list-group-item-action"><TbLanguage /> İngilizce</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                  
                </div>}               
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <BsJustify />
                </button>
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">                
                    <div className="offcanvas-body">
                        <div className="frame" style={{position:"relative"}}>         
                            <button id="menu-in-close" className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                                <CgClose />
                            </button>                
                            <div className="boxes">
                                <div className="box one">
                                    <Link to="/contact"><span className="text">İletişim</span></Link>
                                    <span className="icon"><GrContact className="filter-white" /></span>
                                </div>
                                <div className="box two">
                                    <Link to="/trends"><span className="text">Trendler</span></Link>
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