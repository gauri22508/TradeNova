import { useState, useEffect } from "react";
import "./Shared.css";
import { VerticalGraph } from "./VerticalGraph";
import axios from "axios";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [realizedPnL, setRealizedPnL] = useState(0);
  const totalInvestment = allHoldings.reduce(
    (total, stock) => total + Number(stock.avg || 0) * Number(stock.qty || 0),
    0
  );
  const currentValue = allHoldings.reduce(
    (total, stock) => total + Number(stock.price || 0) * Number(stock.qty || 0),
    0
  );
  const totalProfitLoss = currentValue - totalInvestment;
  const totalReturn = totalInvestment ? (totalProfitLoss / totalInvestment) * 100 : 0;

  useEffect(() => {
    const fetchPortfolio = () => {
      const holdingsRequest = axios.get("http://localhost:3002/allHoldings", { withCredentials: true });
      const ordersRequest = axios.get("http://localhost:3002/allOrders", { withCredentials: true });

      Promise.all([holdingsRequest, ordersRequest])
        .then(([holdingsResponse, ordersResponse]) => {
          setAllHoldings(holdingsResponse.data);
          setRealizedPnL(
            ordersResponse.data.reduce(
              (total, order) => total + Number(order.realizedPnL || 0),
              0
            )
          );
        })
        .catch((err) => console.error("Error fetching portfolio:", err));
    };

    fetchPortfolio();
    window.addEventListener("trade:updated", fetchPortfolio);
    return () => window.removeEventListener("trade:updated", fetchPortfolio);
  }, []);

  const data = {
    labels: allHoldings.map((stock) => stock.name),
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => Number(stock.price) || 0),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>

          <tbody>
            {allHoldings.map((stock, index) => {
              const quantity = Number(stock.qty) || 0;
              const averagePrice = Number(stock.avg) || 0;
              const currentPrice = Number(stock.price) || 0;
              const curValue = currentPrice * quantity;
              const profitLoss =
                curValue - averagePrice * quantity;

              const isProfit = profitLoss >= 0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={stock._id || index}>
                  <td>{stock.name}</td>
                  <td>{quantity}</td>
                  <td>{averagePrice.toFixed(2)}</td>
                  <td>{currentPrice.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>

                  <td className={profClass}>
                    {profitLoss.toFixed(2)}
                  </td>

                  <td className={profClass}>
                    {stock.net}
                  </td>

                  <td className={dayClass}>
                    {stock.day}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>{totalInvestment.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h5>
          <p>Open investment</p>
        </div>

        <div className="col">
          <h5>{currentValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h5>
          <p>Current value</p>
        </div>

        <div className="col">
          <h5 className={totalProfitLoss >= 0 ? "profit" : "loss"}>
            {totalProfitLoss.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({totalReturn.toFixed(2)}%)
          </h5>
          <p>Unrealized P&amp;L</p>
        </div>
        <div className="col">
          <h5 className={realizedPnL >= 0 ? "profit" : "loss"}>
            {realizedPnL.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h5>
          <p>Realized P&amp;L from sells</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;