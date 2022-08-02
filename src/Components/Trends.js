import React, {useEffect, useState} from 'react';
import './Trends.css';
import { startloading, endloading } from '../action/loader';
import {connect} from 'react-redux';
import Loader from './Loader.js';
import {getYoutubeList} from '../helpers/api';
import TrendsVideos from './TrendsVideos';
import Modal from './Modal';
import { insertdata } from '../action/modal';
import $ from 'jquery';
import jQuery from 'jquery';

const Trends = (props) => {

    const [videoList, setVideoList] = useState([]);
    const [selectCountry, setSelectCountry] = useState("Dünya");

    useEffect(()=>{
        $(document).ready(function () {


            /*array positions for clockwise movement */
            var move_1 = {	center: [259,238],      radius: 224,    	start: 180, 	end: 126,   dir: -1	};
            var move_2 = {	center: [257,238],      radius: 224,    	start: 126, 	end: 87,    dir: -1	};
            var move_3 = {	center: [266,260],      radius: 224,    	start: 87, 		end: 49,    dir: -1	};
            var move_4 = {	center: [257,263],      radius: 224,    	start: 49, 		end: -3,    dir: -1	};
            var move_5 = {	center: [260,270],      radius: 224,    	start: -3, 		end: -52,   dir: -1	};
            var move_6 = {	center: [252,257],      radius: 224,    	start: -52, 	end: -94,   dir: -1	};
            var move_7 = {	center: [255,240],      radius: 224,    	start: -94, 	end: -126,  dir: -1	};
            var move_8 = {	center: [257,238],      radius: 224,    	start: -126, 	end: -180,	dir: -1	};
            
            /*array positions for anti-clockwise movement */	
            var reverse_1 = {	center: [251,238],      radius: 224,    start: 180, 	end: 234,   dir: 1	};
            var reverse_8 = {	center: [251,238],      radius: 224,    start: 234, 	end: 273,   dir: 1	};
            var reverse_7 = {	center: [251,260],      radius: 224,    start: 273, 	end: 312,   dir: 1	};
            var reverse_6 = {	center: [257,257],      radius: 224,    start: 312, 	end: 358,   dir: 1	};
            var reverse_5 = {	center: [260,270],      radius: 224,    start: 358, 	end: 411,   dir: 1	};
            var reverse_4 = {	center: [257,257],      radius: 224,    start: 411, 	end: 454,  	dir: 1	};
            var reverse_3 = {	center: [260,240],      radius: 224,    start: 454, 	end: 487,  	dir: 1	};
            var reverse_2 = {	center: [257,238],      radius: 224,    start: 487, 	end: 541,	dir: 1	};
                
                
            var slide=[move_1,move_2,move_3,move_4,move_5,move_6,move_7,move_8];
            var reverse=[reverse_1,reverse_2,reverse_3,reverse_4,reverse_5,reverse_6,reverse_7,reverse_8];
            var index_counter=[0,1,2,3,4,5,6,7];
            var fake_array=[7,6,5,4,3,2,1,0];
                
                
                
            $(".next-circle-btn").click(function(){
                for(var i=0;i<8;i++)
                {
                    $(".nav-circle div").eq(index_counter[i]).animate({path : new $.path.arc(slide[i])},1000);	
                    SelectCountry($(".nav-circle div").eq(index_counter[7]).text())
                }
                var checker=index_counter[0];
                if(checker==0)
                {
                    checker=7;
                    for(var i=0;i<8;i++)
                    {
                        if(fake_array.indexOf(checker)===-1)
                        {
                            checker=0;
                            index_counter[i]=checker;++checker;
                        }
                        else
                        {
                            index_counter[i]=checker;++checker;
                        }
                    }
                }
                else
                {
                    --checker;
                    for(var i=0;i<8;i++)
                    {
                        if(fake_array.indexOf(checker)===-1)
                        {
                            checker=0;
                            index_counter[i]=checker;++checker;
                        }
                        else
                        {
                            index_counter[i]=checker;++checker;
                        }
                    }
                }
            });

            $(".pre-circle-btn").click(function(){
                for(var i=0;i<8;i++)
                {
                    $(".nav-circle div").eq(index_counter[i]).animate({path : new $.path.arc(reverse[i])},1000);	              
                    SelectCountry($(".nav-circle div").eq(index_counter[1]).text())
                }
                var checker=index_counter[0];
                if(checker==7)
                {
                    checker=0;
                    for(var i=0;i<8;i++)
                    {
                        if(fake_array.indexOf(checker)===-1)
                        {
                            checker=0;
                            index_counter[i]=checker;++checker;
                        }
                        else
                        {
                            index_counter[i]=checker;++checker;
                        }
                    }
                }
                else
                {
                    ++checker;
                    for(var i=0;i<8;i++)
                    {
                        if(fake_array.indexOf(checker)===-1)
                        {
                            checker=0;
                            index_counter[i]=checker;++checker;
                        }
                        else
                        {
                        index_counter[i]=checker;++checker;
                        }
                    }
                }


               
            });
        });
        
        ;(function($){
    
            $.path = {};
        
            var V = {
            rotate: function(p, degrees) {
                var radians = degrees * Math.PI / 180,
                c = Math.cos(radians),
                s = Math.sin(radians);
                return [c*p[0] - s*p[1], s*p[0] + c*p[1]];
            },
            scale: function(p, n) {
                return [n*p[0], n*p[1]];
            },
            add: function(a, b) {
                return [a[0]+b[0], a[1]+b[1]];
            },
            minus: function(a, b) {
                return [a[0]-b[0], a[1]-b[1]];
            }
            };
        
            $.path.bezier = function( params, rotate ) {
            params.start = $.extend( {angle: 0, length: 0.3333}, params.start );
            params.end = $.extend( {angle: 0, length: 0.3333}, params.end );
        
            this.p1 = [params.start.x, params.start.y];
            this.p4 = [params.end.x, params.end.y];
        
            var v14 = V.minus( this.p4, this.p1 ),
                v12 = V.scale( v14, params.start.length ),
                v41 = V.scale( v14, -1 ),
                v43 = V.scale( v41, params.end.length );
        
            v12 = V.rotate( v12, params.start.angle );
            this.p2 = V.add( this.p1, v12 );
        
            v43 = V.rotate(v43, params.end.angle );
            this.p3 = V.add( this.p4, v43 );
        
            this.f1 = function(t) { return (t*t*t); };
            this.f2 = function(t) { return (3*t*t*(1-t)); };
            this.f3 = function(t) { return (3*t*(1-t)*(1-t)); };
            this.f4 = function(t) { return ((1-t)*(1-t)*(1-t)); };
        
            /* p from 0 to 1 */
            this.css = function(p) {
                var f1 = this.f1(p), f2 = this.f2(p), f3 = this.f3(p), f4=this.f4(p), css = {};
                if (rotate) {
                css.prevX = this.x;
                css.prevY = this.y;
                }
                css.x = this.x = ( this.p1[0]*f1 + this.p2[0]*f2 +this.p3[0]*f3 + this.p4[0]*f4 +.5 )|0;
                css.y = this.y = ( this.p1[1]*f1 + this.p2[1]*f2 +this.p3[1]*f3 + this.p4[1]*f4 +.5 )|0;
                css.left = css.x + "px";
                css.top = css.y + "px";
                return css;
            };
            };
        
            $.path.arc = function(params, rotate) {
            for ( var i in params ) {
                this[i] = params[i];
            }
        
            this.dir = this.dir || 1;
        
            while ( this.start > this.end && this.dir > 0 ) {
                this.start -= 360;
            }
        
            while ( this.start < this.end && this.dir < 0 ) {
                this.start += 360;
            }
        
            this.css = function(p) {
                var a = ( this.start * (p ) + this.end * (1-(p )) ) * Math.PI / 180,
                css = {};
        
                if (rotate) {
                css.prevX = this.x;
                css.prevY = this.y;
                }
                css.x = this.x = ( Math.sin(a) * this.radius + this.center[0] +.5 )|0;
                css.y = this.y = ( Math.cos(a) * this.radius + this.center[1] +.5 )|0;
                css.left = css.x + "px";
                css.top = css.y + "px";
                return css;
            };
            };
        
            $.fx.step.path = function(fx) {
            var css = fx.end.css( 1 - fx.pos );
            if ( css.prevX != null ) {
                $.cssHooks.transform.set( fx.elem, "rotate(" + Math.atan2(css.prevY - css.y, css.prevX - css.x) + ")" );
            }
            fx.elem.style.top = css.top;
            fx.elem.style.left = css.left;
            };
        
        })(jQuery);
    },[])

    const SelectCountry = (country) =>{
        if(country.toLowerCase() === "w")
            setSelectCountry("Dünya")
        else if(country.toLowerCase() === "tr")
            setSelectCountry("Türkiye")
        else if(country.toLowerCase() === "fr")
            setSelectCountry("Fransa")
        else if(country.toLowerCase() === "gb")
            setSelectCountry("Birleşik Krallık")
        else if(country.toLowerCase() === "es")
            setSelectCountry("İspanya")
        else if(country.toLowerCase() === "us")
            setSelectCountry("Amerika Birleşik Devletleri")
        else if(country.toLowerCase() === "de")
            setSelectCountry("Almanya")
        else if(country.toLowerCase() === "it")
            setSelectCountry("İtalya")
        else
            setSelectCountry("Dünya")
    }

    const GetRegionCode = (country) =>{     
        if(country === "Dünya")
            return "w"
        else if(country === "Türkiye")
            return "TR"
        else if(country === "Fransa")
            return "FR"
        else if(country === "Birleşik Krallık")
            return "GB"
        else if(country === "İspanya")
            return "ES"
        else if(country === "Amerika Birleşik Devletleri")
            return "US"
        else if(country === "Almanya")
            return "DE"
        else if(country === "İtalya")
            return "IT"
        else
            return "w"
    }

    useEffect(()=>{
        getVideoList();
    },[])

    const getVideoList = (country = "w") =>{
        props.dispatch(startloading())
        getYoutubeList(country)
        .then(resp=>{
            setVideoList([...resp]);
        })
        props.dispatch(endloading())
    }

    // useEffect(()=>{  
    //     $("#menu-button-countries").click(function(){
    //         $(".wrapper").css({"z-index":"999999999999"})
    //         $(".home-nav-my-overlay").slideToggle(2000).queue(function(){
    //             if($(".home-nav-my-overlay").css("display") === "none"){
    //                 console.log(selectCountry)
    //                 let veri = GetRegionCode(selectCountry);
    //                 getVideoList(veri);
    //             }
    //             $(this).dequeue();
    //         });
    //     });
    // },[])

    const modalMenuClose = () =>{
        $(".wrapper").css({"z-index":"999999999999"})
        $(".home-nav-my-overlay").slideToggle(2000).queue(function(){
            if($(".home-nav-my-overlay").css("display") === "none"){
                console.log(selectCountry)
                let veri = GetRegionCode(selectCountry);
                getVideoList(veri);
            }
            $(this).dequeue();
        });
    }

    const postModalData = (items) =>{
        props.dispatch(insertdata(items))
    }

    return(
        <>
        <div className='home-nav-my-overlay'>
            <div className="home-nav clear">
                <div className="nav-circle" id="nav-circle">
                    <div className="w"><a href="#">W</a></div>
                    <div className="tr" ><a href="#">TR</a></div>
                    <div className="fr"><a href="#">FR</a></div>
                    <div className="gb"><a href="#">GB</a></div>
                    <div className="es"><a href="#">ES</a></div>
                    <div className="us"><a href="#">US</a></div>
                    <div className="de"><a href="#">DE</a></div>
                    <div className="it" id="html5"><a href="#">IT</a></div>
                </div>
                <div className="circle-btns">
                <a className="pre-circle-btn" href="#">previous</a>
                <a className="next-circle-btn" href="#">next</a>
                </div>
                <div className="circle-head">
                    <div className="circle-head-inner">
                        <h2>
                            <span className="bigFont">Youtube Trendler </span>
                            <br />
                            <span className="green-txt">{selectCountry} </span> 
                            Seçili Ülke
                        </h2>
                    </div>
                </div>
            </div>
        </div>
        <div className="content">
            <div className="section-header">
                <h1>Trend İlk 10 Şarkı ({selectCountry})</h1>  
                <div className="wrapper">
                    <input className="hidden-trigger" id="toogle" type="checkbox" />
                    <label onClick={modalMenuClose} id="menu-button-countries" className="circle" htmlFor="toogle">
                        <img src="https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/btw_ic_speeddial_white_24dp_2x.png" alt="" />
                    </label>
                </div>
            </div>
            <div className="video-gallery">
            {videoList.length > 0 && videoList.map((item, index)=>{
                return (<TrendsVideos key={index} items={item} postModalData={postModalData} />)
            })}               
            </div>
        </div>
        <Modal />
        {props.Loader && <Loader/>}
        </>
    );
}

const mapStateToProps = (store) =>{     
    return {
        Loader:store.loaderBilgileri || ""
    }
}

export default connect(mapStateToProps)(Trends);