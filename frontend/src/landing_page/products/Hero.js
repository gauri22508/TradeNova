import React from 'react';

function Hero() {
    return (
        <div className="container py-5  border-bottom mb-5 ">
            <div className="row justify-content-center text-center">
                <div className="col-lg-12 col-md-8 col-sm-4 mt-5 p-3">
                 
                    <h3>TradeNova Products</h3>
                    <h7 className="fs-5 mt-4 text-muted mb-5">Sleek, modern, and intuitive trading platforms</h7>
                    <p className='mt-4  mb-5 text-muted'>Check out our <a style={{ textDecoration: 'none' }} href="#">investment offerings →</a> </p>

                
                </div>
            </div>
        </div>
    );
}

export default Hero;
