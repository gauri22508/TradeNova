import React from "react";
import "./Stats.css";

function Stats() {
  return (
    <div className="container p-3">
      <div className="row align-items-center p-lg-5 p-md-2 p-1">
        <div className="col-12 col-md-6 col-lg-6 p-3 p-md-4 p-lg-5">
          <h1 className="fs-2 mb-5">Trust with confidence</h1>
          <h2 className="fs-4">Customer-first always</h2>
          <p className="text-muted">
            That's why 1.3+ crore customers trust TradeNova with ₹3.5+ lakh crores
            worth of equity investments.
          </p>
          <h2 className="fs-4">No spam or gimmicks</h2>
          <p className="text-muted">
            No gimmicks, spam, "gamification", or annoying push notifications.
            High quality apps that you use at your pace, the way you like.
          </p>
          <h2 className="fs-4">The TradeNova universe</h2>
          <p className="text-muted">
            Not just an app, but a whole ecosystem. Our investments in 30+
            fintech startups offer you tailored services specific to your needs.
          </p>
          <h2 className="fs-4">Do better with money</h2>
          <p className="text-muted">
            With initiatives like Nudge and Kill Switch, we don't just
            facilitate transactions, but actively help you do better with your
            money.
          </p>
        </div>
        <div className="col-12 col-md-6 col-lg-6 p-3 p-md-4 p-lg-5 mt-4 mt-md-0">
          <img src="images/ecosystem.png" className="img-fluid" style={{ width: "90%" }} />
          <div className="row text-center mt-4 g-3">
            <div className="col-12 col-md-6 col-lg-6">
              <a
                href=""
                className="stats-link d-inline-flex align-items-center text-decoration-none fw-semibold"
              >
                Explore our products{" "}
                <i className="fa fa-long-arrow-right ms-2" aria-hidden="true"></i>
              </a>
            </div>
            <div className="col-12 col-lg-6">
              <a
                href=""
                className="stats-link d-inline-flex align-items-center text-decoration-none fw-semibold"
              >
                Try Kite demo{" "}
                <i className="fa fa-long-arrow-right ms-2" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
