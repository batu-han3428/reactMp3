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
    }

    render(){
        return(
            <div className='container main-contact'>
                <div className='row row-contact'>
                    <div className='col-md-12 mx-auto d-flex align-items-center'>
                        <div className='row'>
                                <div className='col-md-6 contact-photo-div'>
                                    <div className="contact-photo-1">  
                                        <img className="img-fluid" src={require('../img/contactPhoto.jfif')} alt='ContactPhoto' />
                                    </div>
                                    <div className="contact-photo-2">  
                                        <img className="img-fluid" src={require('../img/contactPhoto1.png')} alt='ContactPhoto' />
                                    </div>
                                </div>
                                <div className='col-md-6 d-flex align-items-center'>
                                    <form className="row g-3 needs-validation" noValidate>
                                        <div className="col-md-6">
                                            <label className="form-label">Ad</label>
                                            <input type="text" className="form-control" required />
                                            <div className="invalid-feedback">
                                                Boş Geçilemez!
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Soyad</label>
                                            <input type="text" className="form-control" required />
                                            <div className="invalid-feedback">
                                                Boş Geçilemez!
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <label className="form-label">E-Mail</label>
                                            <div className="input-group has-validation">
                                                <input type="mail" className="form-control" required />
                                                <div className="invalid-feedback">
                                                    Boş Geçilemez!
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label">Mesaj</label>
                                            <textarea className="form-control" rows="3" placeholder="Mesaj"></textarea>
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