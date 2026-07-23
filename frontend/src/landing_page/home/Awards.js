import React from "react";

function Awards() {
  return (
    <div className="container mt-5 ">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 col-lg-6 p-3 p-md-4 p-lg-5">
          <img src="images/largestBroker.svg" className="img-fluid w-100 w-md-75" />
        </div>
        <div className="col-12 col-md-6 col-lg-6 p-3 p-md-4 p-lg-5 mt-4 mt-md-0">
          <h1>Largest stock broker in India</h1>
          <p className="mb-5">
            2+ million TradeNova clients contribute to over 15% of all retail
            order volumes in India daily by trading and investing in:
          </p>
          <div className="row g-3">
            <div className="col-12 col-md-6 col-lg-6 p-lg-5 p-md-2 p-1">
              <ul>
                <li>
                  <p>Futures and Options</p>
                </li>
                <li>
                  <p>Commodity derivatives</p>
                </li>
                <li>
                  <p>Currency derivatives</p>
                </li>
              </ul>
            </div>
            <div className="col-12 col-md-6 col-lg-6 p-lg-5 p-md-2 p-1">
              <ul>
                <li>
                  <p>Stocks & IPOs</p>
                </li>
                <li>
                  <p>Direct mutual funds</p>
                </li>
                <li>
                  <p>Bonds and Govt. Securities</p>
                </li>
              </ul>
            </div>
          </div>
          <img src="images/pressLogos.png" className="img-fluid" style={{ width: "90%" }} />
        </div>
      </div>
    </div>
  );
}

export default Awards;
