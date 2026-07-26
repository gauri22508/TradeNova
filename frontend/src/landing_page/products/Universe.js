import React from 'react';

function Universe() {
    return (
        <div className="container ">
            <div className=" row  text-center ">
                <p className="fs-5 text-muted mt-5 mb-5">Want to know more about our technology stack? Check out the <a style={{ textDecoration: 'none' }} href="#">TradNova.tech</a> blog.</p>

                <h3 className="mt-3 mb-4">The TradeNova Universe</h3>
                <p className="text-muted">Extend your trading and investment experience even further with our partner platforms</p>



                <div className=" col-md-4 col-12 p-3 mt-3">
                    <img src="images/zerodhaFundhouse.png" className="img-fluid" style={{ width: "60%" }} alt="img" />
                    <p className="text-muted fs-35 mt-2">Our asset management venture that is creating simple ans transparent index funds to help you save for your goals.</p>
                </div>
                <div className=" col-md-4 col-12 p-3 mt-3">
                    <img src="images/streakLogo.png" className="img-fluid" style={{ width: "60%" }} alt="img" />
                    <p className="text-muted fs-35 mt-2">Systematic trading platform that allow you to create and backtest strategies without codinf.</p>
                </div>
                <div className=" col-md-4 col-12 p-3 mt-3">
                    <img src="images/sensibullLogo.svg" className="img-fluid" style={{ width: "60%" }} alt="img" />
                    <p className="text-muted fs-35 mt-2 mb-5">Options trading platform that lest you create  strategies,analyze positions , and examine data points like open intrest. FII?DII, and more.</p>
                </div>

                <div className=" col-md-4 col-12 p-3 mt-3">
                    <img src="images/smallcaseLogo.png" className="img-fluid" style={{ width: "60%" }} alt="img" />
                    <p className="text-muted fs-35 mt-2">Thrematic investing platform thet helps you invest in diversified baskets of dtocks on ETFs.</p>
                </div>
                <div className=" col-md-4 col-12 p-3 mt-3">
                    <img src="images/tijori.svg" className="img-fluid" style={{ width: "40%" }} alt="img" />
                    <p className="text-muted fs-35 mt-2">Investment research platform that offers detailed insights into market trends and opportunities.</p>
                </div>
                <div className=" col-md-4 col-12 p-3 mt-3">
                    <img src="images/dittoLogo.png" className="img-fluid" style={{ width: "40%" }} alt="img" />
                    <p className="text-muted fs-35 mt-2">Personalized financial planning tool that helps you set and achieve your long-term financial goals.</p>
                </div>

            <div className="d-grid d-sm-block mt-3 mb-5">
                        <button className="btn btn-primary fs-5 px-4">Sign up Now</button>
                    </div>
            </div>
        </div>
    );
}

export default Universe;
