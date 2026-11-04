import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Funds.css";
import "./Shared.css";

const Funds = () => {
  const [balance, setBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchBalance = async () => {
      try {
        const { data } = await axios.get(
          "https://tradenova-backend-ih11.onrender.com/balance",
          { withCredentials: true }
        );
        if (isMounted) {
          setBalance(data);
          setErrorMessage("");
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(
            error.response?.data?.error || "Unable to load account balance."
          );
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchBalance();
    window.addEventListener("trade:updated", fetchBalance);
    return () => {
      isMounted = false;
      window.removeEventListener("trade:updated", fetchBalance);
    };
  }, []);

  const formatBalance = (amount) => {
    if (isLoading) return "Loading...";
    if (!Number.isFinite(Number(amount))) return "--";
    return `₹${Number(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI </p>
        <Link className="btn btn-green">Add funds</Link>
        <Link className="btn btn-blue">Withdraw</Link>
      </div>
      {errorMessage && <p role="alert">{errorMessage}</p>}

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available Balance</p>
              <p className="imp colored">{formatBalance(balance?.availableBalance)}</p>
            </div>
            <div className="data">
              <p>Used Balance</p>
              <p className="imp">{formatBalance(balance?.usedBalance)}</p>
            </div>
            <div className="data">
              <p>Total Balance</p>
              <p className="imp">{formatBalance(balance?.totalBalance)}</p>
            </div>
            <hr />
            <div className="data">
              <p>Initial Balance</p>
              <p>{formatBalance(balance?.initialBalance)}</p>
            </div>
            <div className="data">
              <p>Opening Balance</p>
              <p>--</p>
            </div>
            <div className="data">
              <p>Payin</p>
              <p>--</p>
            </div>
            <div className="data">
              <p>SPAN</p>
              <p>--</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>--</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>--</p>
            </div>
            <div className="data">
              <p>Options premium</p>
              <p>--</p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>--</p>
            </div>
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>--</p>
            </div>
            <div className="data">
              <p>Total Collateral</p>
              <p>--</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <Link className="btn btn-blue">Open Account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
