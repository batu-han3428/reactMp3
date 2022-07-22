import React from 'react';
import {connect} from 'react-redux';
import swal from 'sweetalert';
import {post} from '../helpers/api';
import { startloading,endloading } from '../action/loader';
import { resetdata } from '../action/modal';


const Modal = (props) => {

    const mp3Download = (data) => {
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = "data:audio/wav;base64,"+data.file;
        a.download = data.name;
        document.body.appendChild(a); 
        a.click();
        a.remove();
        props.dispatch(endloading())
    }

    const error = (data) => {
        swal("Beklenmeyen Bir Hata Oluştu!", "", "error");
        props.dispatch(endloading())
    }

    const convertLink = () => {
        props.dispatch(startloading())
        post('Link/ConvertLink',{url:`https://www.youtube.com/watch?v=${props.ModalData.id}`})
        .then(data=>mp3Download(data))
        .catch(data=>error(data));
    }

    return(
        <div className="modal fade" data-bs-backdrop="static" id="video-detail" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{Object.keys(props.ModalData).length !== 0?props.ModalData.snippet.title:""}</h5>
                        <button type="button" onClick={()=>props.dispatch(resetdata())} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <iframe 
                            width="100%" 
                            height="315" 
                            src={Object.keys(props.ModalData).length !== 0?`https://www.youtube-nocookie.com/embed/${props.ModalData.id}?origin=https://localhost:3000`:""} 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>
                        </iframe>
                    </div>
                    <div className="modal-footer">
                        <button onClick={convertLink} type="button" className="btn btn-primary">İndir</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


const mapStateToProps = (store) =>{     
    return {
        ModalData:store.modalBilgileri || {},
        Loader:store.loaderBilgileri || "",
    }
}

export default connect(mapStateToProps)(Modal);