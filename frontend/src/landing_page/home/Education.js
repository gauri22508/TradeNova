import React from "react";

function Education() {
  return (<>
 <style>{
            `.edu-link {
  color: rgb(46, 121, 235);
  transition: all 0.2s ease-in-out;
  text-decoration: none;
}

.edu-link:hover {
  color: #89a4cc;
  text-decoration: none;
 }`}</style>
    <div className="container mt-5">
      <div className="row">
        <div className=" col-md-6 col-12">
          <img src="images/education.svg" className="img-fluid" style={{ width: "90%" }} />
        </div>
        <div className=" col-md-6 col-12 p-5  p-sm-1">
          <h1 className="mb-3 fs-2">Free and open market education</h1>
          <p>
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>
          <a href="" className="edu-link">
            Versity <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
          <p className="mt-5">
            TradingQ&A, the most active trading and investment community in
            India for all your market related queries.
          </p>
          <a href="" className="edu-link">
            TradingQ&A <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
    </>
  );
}

export default Education;