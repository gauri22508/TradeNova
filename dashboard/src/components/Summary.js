import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Summary.css";

const Summary = ({ username = "User" }) => {
  const [holdings, setHoldings] = useState([]);
  const [realizedPnL, setRealizedPnL] = useState(0);

  useEffect(() => {
    const fetchPortfolio = () => {
      Promise.all([
        axios.get("http://localhost:3002/allHoldings", { withCredentials: true }),
        axios.get("http://localhost:3002/allOrders", { withCredentials: true }),
      ])
        .then(([holdingsResponse, ordersResponse]) => {
          setHoldings(holdingsResponse.data);
          setRealizedPnL(
            ordersResponse.data.reduce(
              (total, order) => total + Number(order.realizedPnL || 0),
              0
            )
          );
        })
        .catch((error) => console.error("Error fetching portfolio summary:", error));
    };

    fetchPortfolio();
    window.addEventListener("trade:updated", fetchPortfolio);
    return () => window.removeEventListener("trade:updated", fetchPortfolio);
  }, []);

  const investment = holdings.reduce((sum, item) => sum + Number(item.avg || 0) * Number(item.qty || 0), 0);
  const currentValue = holdings.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0);
  const unrealizedPnL = currentValue - investment;
  const totalProfitLoss = unrealizedPnL + realizedPnL;
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
            <h3 className={totalProfitLoss >= 0 ? "profit" : "loss"}>
              {formatAmount(totalProfitLoss)}
            </h3>
            <p>Total P&amp;L (realized + open)</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{formatAmount(currentValue)}</span>{" "}
            </p>
            <p>
              Investment <span>{formatAmount(investment)}</span>{" "}
            </p>
            <p>
              Realized P&amp;L <span>{formatAmount(realizedPnL)}</span>{" "}
            </p>
            <p>
              Open P&amp;L <span>{formatAmount(unrealizedPnL)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
