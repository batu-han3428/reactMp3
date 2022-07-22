import React, {useEffect, useState} from 'react';
import './Trends.css';
import { startloading, endloading } from '../action/loader';
import {connect} from 'react-redux';
import Loader from './Loader.js';
import {getYoutubeList} from '../helpers/api';
import TrendsVideos from './TrendsVideos';
import Modal from './Modal';
import { insertdata } from '../action/modal';


const Trends = (props) => {

    const [videoList, setVideoList] = useState([]);

    useEffect(()=>{
        props.dispatch(startloading())
        getYoutubeList()
        .then(resp=>{
            setVideoList([...resp]);
        })
        props.dispatch(endloading())
    },[])

    const postModalData = (items) =>{
        props.dispatch(insertdata(items))
    }

    return(
        <>
        <div className="content">
            <div className="section-header">
                <h1>Trend İlk 10 Şarkı</h1>  
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