import React, {Component} from 'react';
import { BsPatchCheck } from "react-icons/bs";
import swal from 'sweetalert';
import Axios from 'axios';


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
            <div className="input-group w-25" style={{margin:"0 auto"}}>
                <button onClick={this.linkDonustur} id="donustur" type='button' className="btn btn-outline-danger"><BsPatchCheck /></button>
                <div className="form-floating" style={{width:"90%"}}>
                    <input type="text" className="form-control" id="video_link" placeholder="." style={{borderColor:"red"}} />
                    <label htmlFor="video_link" style={{color:"rgb(226, 77, 89)"}}>Video Adress</label>
                </div>
            </div>    
        );
    }
} 

export default Converter;