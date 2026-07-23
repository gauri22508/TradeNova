import React from 'react';

function Hero() {
    return (
        <>
            <div className="container">
                <div className="row p-lg-5  mt-md-5 mb-md-5 mt-lg-5 mb-lg-5 mb-sm-2 mt-sm-2">
                    <h1 className="fs-4 text-center ">We pioneered the discount broking model in India.<br></br>
                        Now, we are breaking ground with our technology.</h1>
                </div>
                <div className="row p-lg-5  p-md-5 mt-md-5 mt-lg-5 p-sm-2 mt-sm-2 text-muted "
                style={{lineheight :"1.8" , fontSize:"1.1em" , fontFamily:"'Open Sans', sans-serif"}}>
                    <div className='col-lg-6 col-md-6 col-12  p-sm-2 p-md-5 p-lg-5' >
                        <p >We kick-started operations on the 15th of August, 2010 with the goal of breaking all barriers that traders and investors face in India in terms of cost, support, and technology. We named the company Zerodha, a combination of Zero and "Rodha", the Sanskrit word for barrier.</p>

                        <p>Today, our disruptive pricing models and in-house technology have made us the biggest stock broker in India.</p>

                        <p>Over 1.6+ crore clients place billions of orders every year through our powerful ecosystem of investment platforms, contributing over 15% of all Indian retail trading volumes.,</p>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12   p-sm-2 p-md-5 p-lg-5">
                        <p> In addition, we run a number of popular open online educational and community initiatives to empower retail traders and investors.</p>

                        <p><a style={{ textDecoration: 'none' }} href="#">Rainmatter</a>, our fintech fund and incubator, has invested in several fintech startups with the goal of growing the Indian capital markets.</p>

                        <p>And yet, we are always up to something new every day. Catch up on the latest updates on our <a style={{ textDecoration: 'none' }} href="#">blog</a> or see what the media is saying about us or learn more about our business and product <a style={{ textDecoration: 'none' }} href="#">philosophies.</a></p>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Hero;
