import React from "react";

function Pricing() {
    return (<>
        <style>{
            `.price-link {
  color: rgb(46, 121, 235);
  transition: all 0.2s ease-in-out;
  text-decoration: none;
}

.price-link:hover {
  color: #89a4cc;
  text-decoration: none;
 }`}</style>

        <div className="container">
            <div className="row">
                <div className="col-lg-4 col-md-4 col-12 ">
                    <h1 className="mb-3 fs-2">Unbeatable pricing</h1>
                    <p>
                        We pioneered the concept of discount broking and price transparency
                        in India. Flat fees and no hidden charges.
                    </p>
                    <>

                        <a href="#" className="price-link" >
                            See Pricing {" "}
                            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                        </a>
                    </>
                </div>
                <div className=" col-lg-2 col-md-2 col-12"></div>
                <div className="col-lg-6 col-md-6 col-12  mb-5">
                    <div className="row text-center">
                        <div className="col p-3 border">
                            <h1 className="mb-3">₹0</h1>
                            <p>
                                Free equity delivery and
                                <br />
                                direct mutual funds
                            </p>
                        </div>
                        <div className="col p-3 border">
                            <h1 className="mb-3">₹20</h1>
                            <p>Intraday and F&O</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default Pricing;
