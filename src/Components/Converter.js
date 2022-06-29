import React, {Component} from 'react';
import { BsPatchCheck } from "react-icons/bs";
import swal from 'sweetalert';
import Axios from 'axios';
import './Converter.css';
import Loader from './Loader.js';


class Converter extends Component{
    constructor(props){ 
        super(props) 
        this.state = {
            link:"",
            loader:false
        }
        this.convertLink = this.convertLink.bind(this);
        this.mp3Download = this.mp3Download.bind(this);
        this.error = this.error.bind(this);
    }

    linkCheck(str){
        var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        if(!regex.test(str)) {
            return false;
        } else {
            return true;
        }
    }

    mp3Download(data){
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = "data:audio/wav;base64,"+data.file;
        a.download = data.name;
        document.body.appendChild(a); 
        a.click();
        a.remove();
        this.setState({loader:false});
        this.props.message(true,"Mp3 Dönüştürme İşlemi Tamamlandı!");
    }

    error(data){
        console.log(data);
        swal("Beklenmeyen Bir Hata Oluştu!", "", "error");
        this.setState({loader:false});
    }
    
    convertLink(){
        if(!this.linkCheck(document.getElementById('video_link').value)){
            swal("Lütfen Geçerli Bir Link Giriniz!", "", "error");
        }else{
            this.setState({loader:true})
            Axios.post(`https://localhost:7024/api/Link/ConvertLink`, null, { params: {
                url:document.getElementById('video_link').value
              }})
              .then(resp=>resp.data)
              .then(data=>this.mp3Download(data))
              .catch(data=>this.error(data));
        }
    }

    render(){
        return(
            <>
                <div className="input-group w-25 converterMainDiv">
                    <button onClick={this.convertLink} id="donustur" type='button' className="btn btn-outline-secondary converterButton"><BsPatchCheck /></button>
                    <div className="form-floating converterUnderDiv">
                        <input type="text" className="form-control converterİnput" id="video_link" placeholder="." />
                        <label htmlFor="video_link" className="converterLabel">Video Adress</label>
                    </div>
                </div> 
               {this.state.loader && <Loader/>}
            </>
               
        );
    }
} 

export default Converter;