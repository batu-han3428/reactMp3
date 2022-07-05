import React, {useEffect} from 'react';
import './Contact.css';



const Contact = () => {
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
                                    <div className="form-floating">
                                        <input id="name" type="text" placeholder=' ' className="form-control" required />
                                        <label htmlFor="name">Ad</label>
                                    </div>                                       
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input id="surname" type="text" placeholder=' ' className="form-control" required />
                                        <label htmlFor="surname">Soyad</label>
                                    </div>    
                                </div>
                                <div className="col-md-12">
                                    <div className="form-floating">
                                        <input placeholder=' ' id="email" type="email" className="form-control" required />
                                        <label htmlFor="email">E-Mail</label>
                                    </div>    
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <textarea id="mesaj" className="form-control" style={{height: "100px"}} placeholder=" " required></textarea>
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
    );
}


export default Contact;