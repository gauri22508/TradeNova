import React from 'react';

function RightImage({ imageURL, productName, productDescription, learnMore }) {
    return (
        <div className="container pt-5 mt-3">
            <div className="row align-items-center">
                <div className="col-md-5 col-12 p-4 p-sm-2 mt-3 d-flex flex-column justify-content-center">
                    <h1 className="mb-4 fs-2">{productName}</h1>
                    <p>{productDescription}</p>

                    <div className="mt-3">
                        <a href={learnMore} className="text-decoration-none">
                            Learn More <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>

                <div className="col-md-1 d-none d-md-block"></div>

                <div className="col-md-6 col-12 mt-3">
                    <img src={imageURL} className="img-fluid" style={{ width: "90%" }} alt={productName} />
                </div>
            </div>
        </div>
    );
}

export default RightImage;
