import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Summary.css";

const Summary = ({ username = "User" }) => {
  const [holdings, setHoldings] = useState([]);
  const [realizedPnL, setRealizedPnL] = useState(0);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchPortfolio = () => {
      Promise.all([
        axios.get("https://tradenova-backend-ih11.onrender.com/allHoldings", { withCredentials: true }),
        axios.get("https://tradenova-backend-ih11.onrender.com/allOrders", { withCredentials: true }),
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

  useEffect(() => {
    let isMounted = true;
    const fetchBalance = () => {
      axios
        .get("https://tradenova-backend-ih11.onrender.com/balance", { withCredentials: true })
        .then(({ data }) => {
          if (isMounted) setBalance(data);
        })
        .catch((error) => console.error("Error fetching account balance:", error));
    };

    fetchBalance();
    window.addEventListener("trade:updated", fetchBalance);
    return () => {
      isMounted = false;
      window.removeEventListener("trade:updated", fetchBalance);
    };
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
            <h3>{balance ? formatAmount(balance.availableBalance) : "--"}</h3>
            <p>Margin available (demo)</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>{balance ? formatAmount(balance.usedBalance) : "--"}</span>{" "}
            </p>
            <p>
              Opening balance <span>{balance ? formatAmount(balance.initialBalance) : "--"}</span>{" "}
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
