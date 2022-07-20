import React, {useEffect, useState} from 'react';
import './Contact.css';
import {post} from '../helpers/api';
import swal from 'sweetalert';
import { startloading, endloading } from '../action/loader';
import {connect, useSelector} from 'react-redux';
import Loader from './Loader.js';


const Contact = (props) => {

    const [name, setName] = useState("");
    const [surName, setSurName] = useState("");
    const [mail, setMail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");


    useEffect(()=>{
        (function () {

            var forms = document.querySelectorAll('.needs-validation')

            Array.prototype.slice.call(forms)
                .forEach(function (form) {
                    form.addEventListener('submit', function (event) {
                        if (!form.checkValidity()) {
                            event.preventDefault()
                            event.stopPropagation()
                        }

                        form.classList.add('was-validated')
                    }, false)
                })
        })()
    },[])

    
    const sendMail = () =>{
        props.dispatch(startloading())
        console.log(props.Loader)
        post("user/userContact",{name:name, surname:surName, mail:mail, subject:subject, message: message})
        .then(resp=>{
            if(resp === 200)
                swal("Size en yakın sürede dönüş yapacağız :)", "", "success");            
            else
                swal("Beklenmeyen bir hata oluştu!", "", "error");
            props.dispatch(endloading())
        })
    }


    
    return(
        <>
        <div className='container main-contact'>
            <div className='row row-contact'>
                <div className='col-md-12 mx-auto d-flex align-items-center'>
                    <div className='row'>
                            <div className='col-md-6'>
                                <img className="img-fluid" src={require('../img/contactPhoto.jfif')} alt='ContactPhoto' />                             
                            </div>
                            <div className='col-md-6 d-flex align-items-center'>
                                <form onSubmit={(e)=>{e.preventDefault(); sendMail()}} className="row g-3 needs-validation" noValidate>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input onChange={(e)=>setName(e.target.value)} id="name" type="text" placeholder=' ' className="form-control" required />
                                            <label htmlFor="name">Ad</label>
                                        </div>                                       
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input onChange={(e)=>setSurName(e.target.value)} id="surname" type="text" placeholder=' ' className="form-control" required />
                                            <label htmlFor="surname">Soyad</label>
                                        </div>    
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <input onChange={(e)=>setMail(e.target.value)} placeholder=' ' id="email" type="email" className="form-control" required />
                                            <label htmlFor="email">E-Mail</label>
                                        </div>    
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-floating">
                                            <input onChange={(e)=>setSubject(e.target.value)} placeholder=' ' id="subject" type="text" className="form-control" required />
                                            <label htmlFor="subject">Konu</label>
                                        </div>    
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea onChange={(e)=>setMessage(e.target.value)} id="mesaj" className="form-control" style={{height: "100px"}} placeholder=" " required></textarea>
                                            <label htmlFor="mesaj">Mesaj</label>
                                        </div>                                             
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-outline-primary w-100" type="submit">Gönder</button>
                                    </div>
                                </form>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        {props.Loader && <Loader/>}
        </>
    );
}

const mapStateToProps = (store) =>{     
    return {
        Loader:store.loaderBilgileri || ""
    }
}

export default connect(mapStateToProps)(Contact);