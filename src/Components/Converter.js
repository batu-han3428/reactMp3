import React, {Component} from 'react';
import { BsPatchCheck } from "react-icons/bs";
import swal from 'sweetalert';
import Axios from 'axios';
import './Converter.css';


class Converter extends Component{
    constructor(props){ 
        super(props) 
        this.state = {
            link:""
        }
        this.linkDonustur = this.linkDonustur.bind(this);
    }

    linkKontrol(str){
        var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        if(!regex .test(str)) {
        return false;
        } else {
        return true;
        }
    }

    linkDonustur(){
        if(!this.linkKontrol(document.getElementById('video_link').value)){
            swal("Lütfen Geçerli Bir Link Giriniz!", "", "error");
        }else{
            Axios.post(`https://localhost:7024/api/Link/ConvertLink`, null, { params: {
                url:document.getElementById('video_link').value
              }})
              .then(resp=>resp.data)
              .then(function (data) {
                var binaryData = [];
                binaryData.push(data);
                const url = window.URL.createObjectURL( new Blob(binaryData, {type: "audio/mp3"}));
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'dada.mp3';
                document.body.appendChild(a); 
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    }

    render(){
        return(
            <div className="input-group w-25 converterMainDiv">
                <button onClick={this.linkDonustur} id="donustur" type='button' className="btn btn-outline-danger converterButton"><BsPatchCheck /></button>
                <div className="form-floating converterUnderDiv">
                    <input type="text" className="form-control converterİnput" id="video_link" placeholder="." />
                    <label htmlFor="video_link" className="converterLabel">Video Adress</label>
                </div>
            </div>    
        );
    }
} 

export default Converter;