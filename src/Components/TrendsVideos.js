import React from 'react';


const TrendsVideos = ({items, postModalData}) => {
    return(
            <div className="gallery-item" onClick={(e)=>postModalData(items)} data-bs-toggle="modal" data-bs-target="#video-detail">
                <img src={items.snippet.thumbnails.high.url} alt="videoImage"/>
                <div className="gallery-item-caption">               
                    <h2>{items.snippet.title}</h2>
                    <p>{items.snippet.channelTitle}</p>                       
                </div>
            </div>
    );
}

export default TrendsVideos;