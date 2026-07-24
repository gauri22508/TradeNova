import React from 'react';

function Hero() {
    return (
        <>
            <div className="container px-2 px-md-4">
                <div className="row py-3 py-md-5 mt-md-3 mb-md-4">
                    <h1 className="fs-5 fs-md-4 fs-lg-3 text-center mb-0 px-2">
                        We pioneered the discount broking model in India.<br />
                        Now, we are breaking ground with our technology.
                    </h1>
                </div>

                <div
                    className="row border-top pt-4 pt-md-5 text-muted"
                    style={{ lineHeight: '1.8'}}
                >
                    <div className="col-12 col-lg-6 px-2 px-md-4 py-3 py-lg-5">
                        <p>We kick-started operations on the 15th of August, 2010 with the goal of breaking all barriers that traders and investors face in India in terms of cost, support, and technology. We named the company Zerodha, a combination of Zero and "Rodha", the Sanskrit word for barrier.</p>

                        <p>Today, our disruptive pricing models and in-house technology have made us the biggest stock broker in India.</p>

                        <p>Over 1.6+ crore clients place billions of orders every year through our powerful ecosystem of investment platforms, contributing over 15% of all Indian retail trading volumes.</p>
                    </div>

                    <div className="col-12 col-lg-6 px-2 px-md-4 py-3 py-lg-5">
                        <p>In addition, we run a number of popular open online educational and community initiatives to empower retail traders and investors.</p>

                        <p><a style={{ textDecoration: 'none' }} href="#">Rainmatter</a>, our fintech fund and incubator, has invested in several fintech startups with the goal of growing the Indian capital markets.</p>

                        <p>And yet, we are always up to something new every day. Catch up on the latest updates on our <a style={{ textDecoration: 'none' }} href="#">blog</a> or see what the media is saying about us or learn more about our business and product <a style={{ textDecoration: 'none' }} href="#">philosophies.</a></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Hero;
