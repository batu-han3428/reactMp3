import React, {useState} from 'react';
import { BsPatchCheck } from "react-icons/bs";
import swal from 'sweetalert';
import './Converter.css';
import Loader from './Loader.js';
import {post} from '../helpers/api';


const Converter = (props) =>{

    const [link, setLink] = useState("");
    const [loader, setLoader] = useState(false);

    const linkCheck = (str) => {
        let regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        if(!regex.test(str)) {
            return false;
        } else {
            return true;
        }
    }

    const mp3Download = (data) => {
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = "data:audio/wav;base64,"+data.file;
        a.download = data.name;
        document.body.appendChild(a); 
        a.click();
        a.remove();
        setLoader(false);
        props.message(true,"Mp3 Dönüştürme İşlemi Tamamlandı!");
        setLink("");
    }

    const error = (data) => {
        swal(data, "", "error");
        setLoader(false);
    }

    const convertLink = () => {
        if(!linkCheck(link)){
            swal("Lütfen Geçerli Bir Link Giriniz!", "", "error");
        }else{
            setLoader(true);
            post('Link/ConvertLink',{url:link})
            .then(data=>{
                if(data.data !== undefined)
                    error(data.data);
                else
                    mp3Download(data);
            })
            .catch(data=>error(data));
        }
    }

    return(
        <>
            <div className="input-group w-25 converterMainDiv">
                <button onClick={convertLink} id="donustur" type='button' className="btn btn-outline-secondary converterButton"><BsPatchCheck /></button>
                <div className="form-floating converterUnderDiv">
                    <input type="text" value={link} onChange={(e)=>setLink(e.target.value)} className="form-control converterİnput" id="video_link" placeholder="." />
                    <label htmlFor="video_link" className="converterLabel">Video Adress</label>
                </div>
            </div> 
            {loader && <Loader/>}
        </>
    );
}


export default Converter;