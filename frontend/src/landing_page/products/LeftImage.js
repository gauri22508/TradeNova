import React from 'react';

function LeftImage({ imageURL, productName, productDescription, tryDemo, learnMore, googlePlay, appStore, }) {
    return (
        <div className="container pt-5">
            <div className="row">

                <div className=" col-md-6 col-12 ">
                    <img src={imageURL} className="img-fluid" style={{ width: "90%" }} alt={productName} />
                </div>
                <div className="col-md-2 col-sm-1"></div>
                <div className=" col-md-4 col-12 p-5  p-sm-1 mt-3 ">

                    <h1 className="mb-4 fs-2">{productName}</h1>
                    <p>{productDescription}</p>

                    <div className="d-flex flex-column flex-lg-row gap-3 gap-lg-4 mt-3">
                        <a href={tryDemo} className="text-decoration-none">
                            Try Demo <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                        </a>

                        <a href={learnMore} className="text-decoration-none">
                            Learn More <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                        </a>
                    </div>

                    <div className="d-flex flex-column flex-lg-row gap-3 gap-lg-4 mt-4 mt-lg-5">
                        <a href={googlePlay} className="d-inline-block">
                            <img src="images/googlePlayBadge.svg" alt="Google Play" className="img-fluid" />
                        </a>

                        <a href={appStore} className="d-inline-block">
                            <img src="images/appstoreBadge.svg" alt="App Store" className="img-fluid" />
                        </a>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default LeftImage;
