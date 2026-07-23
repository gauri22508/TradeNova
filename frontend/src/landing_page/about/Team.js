import React from 'react';

function Team() {
    return (<div className="container">
        <div className="row p-lg-5  mt-md-5 mb-md-5 mt-lg-5 mb-lg-5 ">
            <h1 className=" text-center">People</h1>
        </div>
        <div className="row p-lg-5  p-md-5 mt-md-5 mt-lg-5  mt-sm-2 p-sm-2 text-muted "
            style={{ lineheight: "1.8", fontSize: "1.1em", fontFamily: "'Open Sans', sans-serif" }}>
            <div className='col-lg-6 col-md-6 col-12 text-center   p-sm-2 p-md-5 p-lg-5'>
                <img src="images/nithinKamath.jpg" className="img-fluid w-100 w-md-75" style={{ borderRadius: "100%", width: "60%" }} />

                <h4 className="mt-5">Nithin Kamath</h4>
                <h6>Founder, CEO</h6>


            </div>
            <div className="col-lg-6 col-md-6 col-12 p-sm-2 p-md-5 p-lg-5 fs-sm-5">
                <p> Nithin bootstrapped and founded Zerodha in 2010 to overcome the hurdles he faced during his decade long stint as a trader. Today, Zerodha has changed the landscape of the Indian broking industry.</p>

                <p>He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).</p>

                <p>Playing basketball is his zen.</p>
                <p>Connect on <a style={{ textDecoration: 'none' }} href="#">HomePage</a>/ <a style={{ textDecoration: 'none' }} href="#">TrendingQ/A</a>/ <a style={{ textDecoration: 'none' }} href="#">Twitter</a> </p>

            </div>
        </div>
    </div>);
}

export default Team;
