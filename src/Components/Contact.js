import React, {Component} from 'react';
import './Contact.css';

class Contact extends Component{

    componentDidMount(){
        (function () {
            'use strict'

            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.querySelectorAll('.needs-validation')

            // Loop over them and prevent submission
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
        // document.querySelector('.contact-photo-1').style='transform: rotateX(0deg); transition: 4s;';
        //document.querySelector('.contact-photo-1').style='transition: 4s transform; transform: rotateX(0deg); ';
        //setInterval(() => {
 

           
        //     if(document.querySelector('.contact-photo-1').style.transform == "rotateX(0deg)"){
        //         document.querySelector('.contact-photo-1').style='transform: rotateX(180deg); transition: 4s;';
        //         document.querySelector('.contact-photo-2').style='transform: rotateX(0deg); transition: 4s;';
        //     }else{
        //         document.querySelector('.contact-photo-1').style='transform: rotateX(0deg); transition: 4s;';
        //         document.querySelector('.contact-photo-2').style='transform: rotateX(-180deg); transition: 4s;';
        //     }
        // }, 5000);
    }

    render(){
        return(
            <div className='container main-contact'>
                <div className='row row-contact'>
                    <div className='col-md-12 mx-auto d-flex align-items-center'>
                        <div className='row'>
                                <div className='col-md-6'>
                                    <img className="img-fluid" src={require('../img/contactPhoto.jfif')} alt='ContactPhoto' />                             
                                </div>
                                <div className='col-md-6 d-flex align-items-center'>
                                    <form className="row g-3 needs-validation" noValidate>
                                        <div className="col-md-6">
                                            <div class="form-floating">
                                                <input id="name" type="text" placeholder=' ' className="form-control" required />
                                                <label for="name">Ad</label>
                                            </div>                                       
                                        </div>
                                        <div className="col-md-6">
                                            <div class="form-floating">
                                                <input id="surname" type="text" placeholder=' ' className="form-control" required />
                                                <label for="surname">Soyad</label>
                                            </div>    
                                        </div>
                                        <div className="col-md-12">
                                            <div class="form-floating">
                                                <input placeholder=' ' id="email" type="email" className="form-control" required />
                                                <label for="email">E-Mail</label>
                                            </div>    
                                        </div>
                                        <div className="col-12">
                                            <div class="form-floating">
                                                <textarea id="mesaj" className="form-control" style={{height: "100px"}} placeholder=" " required></textarea>
                                                <label for="mesaj">Mesaj</label>
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
        );
    }
}

export default Contact;