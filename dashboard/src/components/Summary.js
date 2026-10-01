import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Summary.css";

const Summary = ({ username = "User" }) => {
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/allHoldings", { withCredentials: true })
      .then(({ data }) => setHoldings(data))
      .catch(() => setHoldings([]));
  }, []);

  const investment = holdings.reduce((sum, item) => sum + Number(item.avg || 0) * Number(item.qty || 0), 0);
  const currentValue = holdings.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0);
  const profitLoss = currentValue - investment;
  const returnPercent = investment ? (profitLoss / investment) * 100 : 0;
  const formatAmount = (amount) => `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

  return (
    <>
      <div className="username">
        <h6>Hi, {username}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{formatAmount(Math.max(0, 100000 - currentValue))}</h3>
            <p>Margin available (demo)</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>{formatAmount(currentValue)}</span>{" "}
            </p>
            <p>
              Opening balance <span>{formatAmount(100000)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className="profit">
              {formatAmount(profitLoss)} <small>{returnPercent.toFixed(2)}%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{formatAmount(currentValue)}</span>{" "}
            </p>
            <p>
              Investment <span>{formatAmount(investment)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
