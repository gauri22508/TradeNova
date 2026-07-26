import React from 'react';

function Hero() {
    return (
    <div className="container ">
        <div className="row border-bottom  text-center p-5  ">
            <h2 className="mt-5 mb-3">
                Charges </h2>
            <p className="text-muted  fs-5">List of all charges and taxes</p>
        </div>

        <div className="row  px-5 py-5 mt-3 text-center">
            <div className="col-12 col-md-4  ">
             <img src="images/pricingEquity.svg" className="img-fluid" style={{ width: "70%" }} alt="img" />
               <h3 className="mt-3">Free equity delivery</h3>
               <p className="test-muted mt-2">All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
               </div>
               <div className="col-12 col-md-4 ">
             <img src="images/intradayTrades.svg" className="img-fluid" style={{ width: "70%" }} alt="img" />
               <h3 className="mt-3">Intraday and F&O trades</h3>
               <p className="test-muted mt-2">Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
               </div>
               <div className="col-12 col-md-4 ">
             <img src="images/pricingEquity.svg" className="img-fluid" style={{ width: "70%" }} alt="img" />
               <h3  className="mt-3">Free direct MF</h3>
               <p className="test-muted mt-2">All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
               </div>
    </div>
    </div>


    );
}

export default Hero;
