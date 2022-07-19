import React from "react";
import './NotFound.css';

const NotFound = () => {
    return(
        <section className="page_404">
            <div className="container">
                <div className="row" style={{width:"100%"}}>	
                    <div className="col-sm-12">
                        <div className="col-sm-10 col-sm-offset-1  text-center" style={{width:"100%"}}>
                            <div className="four_zero_four_bg">
                                <h1 className="text-center ">404</h1>
                            </div>
                            <div className="contant_box_404">
                                <h3 className="h2">
                                Kaybolmuş gibi görünüyorsun...
                                </h3>
                                <p>aradığın sayfa bulunamadı!</p>
                                <a href="" className="link_404">Anasayfa</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NotFound;