import React from 'react';

function Brokerage() {
    return (
        <div className="container">
            <div className="row p-4 mt-4 border-top">
                <div className="col-sm-12 col-md-6 p-3">
                    <a style={{ textDecoration: 'none' }} className="fs-5 mb-5" href="#">Brokerage calculator</a>
                    <ul className="ps-3 mb-0 text-muted" style={{ lineHeight: window.innerWidth < 768 ? '1.5' : '2.5' }} >
                        <li>Estimate brokerage for equity delivery trades</li>
                        <li>Check charges for intraday and F&O orders</li>
                        <li>View applicable STT, GST, and SEBI fees</li>
                        <li>Compare charges before placing a trade</li>
                        <li>Understand impact of quantity and order type</li>
                        <li>Get a quick idea of net transaction cost</li>
                        <li>Use it for simple and faster trading decisions</li>
                    </ul>
                </div>

                <div className="col-sm-12 col-md-6 p-3">
                    <a style={{ textDecoration: 'none' }} className="fs-5 mb-5" href="#">List of charges</a>
                    <ul className="ps-3 mb-0 text-muted" style={{ lineHeight: window.innerWidth < 768 ? '1.5' : '2.5' }}>
                        <li>Brokerage charged on buy and sell orders</li>
                        <li>Exchange transaction charges and clearing fees</li>
                        <li>STT, GST, and SEBI turnover fees</li>
                        <li>Stamp duty on securities transactions</li>
                        <li>DP charges for demat credit and debit</li>
                        <li>Transaction taxes applied to delivery trades</li>
                        <li>All charges shown in a simple format</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Brokerage;
