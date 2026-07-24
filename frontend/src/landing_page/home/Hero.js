import React from 'react';

function Hero() {
  return (
    <div className="container py-5 mb-5">
      <div className="row justify-content-center text-center">
        <div className="col-lg-10 col-md-6 col-sm-4">
          <img src="images/homeHero.png" alt="Hero Image" className="img-fluid mb-4" />
          <h1 className="mt-3">Invest in everything</h1>
          <p>Online platform to invest in stocks, derivatives, mutual funds, and more</p>

          <div className="d-grid d-sm-block mt-3">
            <button className="btn btn-primary fs-5 px-4">Signup Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;