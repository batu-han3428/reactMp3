import React from 'react';
import './Banner.css';

const Banner = () =>(
    <div className="card bg-dark text-white bannerCard">
        <img src={require('../img/mp3ConverterPhoto.png')} className="card-img bannerImage" alt="BannerPhoto"/>
        <div className="card-img-overlay d-flex align-items-end justify-content-end">
            <p className="card-text bannerText">Türkiyenin en hızlı, en iyi video dönüştürme platformu.</p>
        </div>
    </div>
);

export default Banner;