import React from 'react';

function Team() {
    return (
        <div className="container py-3 py-md-4">
            <div className="row mb-3">
                <h3 className="text-center mb-0">People</h3>
            </div>

            <div
                className="row align-items-center g-3 g-md-4 text-muted"
                style={{ lineHeight: '1.8', fontFamily: "'Open Sans', sans-serif" }}
            >
                <div className="col-12 col-md-6 text-center px-3 px-md-4">
                    <img
                        src="images/nithinKamath.jpg"
                        alt="Nithin Kamath"
                        className="img-fluid rounded-circle w-50"
                        style={{ width: '40%', maxWidth: '220px' }}
                    />

                    <h4 className="mt-4 mb-1">Nithin Kamath</h4>
                    <h6 className="mb-0">Founder, CEO</h6>
                </div>

                <div className="col-12 col-md-6 px-3 px-md-4">
                    <p className="mb-3">Nithin bootstrapped and founded TradeNova in 2010 to overcome the hurdles he faced during his decade long stint as a trader. Today, TradeNova has changed the landscape of the Indian broking industry.</p>

                    <p className="mb-3">He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).</p>

                    <p className="mb-3">Playing basketball is his zen.</p>
                    <p className="mb-0">Connect on <a style={{ textDecoration: 'none' }} href="#">HomePage</a> / <a style={{ textDecoration: 'none' }} href="#">TrendingQ/A</a> / <a style={{ textDecoration: 'none' }} href="#">Twitter</a></p>
                </div>
            </div>
        </div>
    );
}

export default Team;
