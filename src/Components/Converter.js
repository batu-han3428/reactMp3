import React, {useState} from 'react';
import { BsPatchCheck } from "react-icons/bs";
import swal from 'sweetalert';
import Axios from 'axios';
import './Converter.css';
import Loader from './Loader.js';


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
    }

    const error = (data) => {
        swal("Beklenmeyen Bir Hata Oluştu!", "", "error");
        setLoader(false);
    }

    const convertLink = () => {
        if(!linkCheck(document.getElementById('video_link').value)){
            swal("Lütfen Geçerli Bir Link Giriniz!", "", "error");
        }else{
            setLoader(true);
            Axios.post(`https://localhost:7024/api/Link/ConvertLink`, null, { params: {
                url:document.getElementById('video_link').value
              }})
              .then(resp=>resp.data)
              .then(data=>mp3Download(data))
              .catch(data=>error(data));
        }
    }

    return(
        <>
            <div className="input-group w-25 converterMainDiv">
                <button onClick={convertLink} id="donustur" type='button' className="btn btn-outline-secondary converterButton"><BsPatchCheck /></button>
                <div className="form-floating converterUnderDiv">
                    <input type="text" className="form-control converterİnput" id="video_link" placeholder="." />
                    <label htmlFor="video_link" className="converterLabel">Video Adress</label>
                </div>
            </div> 
            {loader && <Loader/>}
        </>
    );
}


export default Converter;