import { useState, useEffect, React } from "react";
import "./Shared.css";
import axios from "axios";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
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
    const fetchHoldings = () => {
      axios
        .get("http://localhost:3002/allHoldings", { withCredentials: true })
        .then((res) => setAllHoldings(res.data))
        .catch((err) => console.log("Error fetching holdings:", err));
    };

    fetchHoldings();
    window.addEventListener("trade:updated", fetchHoldings);
    return () => window.removeEventListener("trade:updated", fetchHoldings);
  }, []);

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
              const curValue = stock.price * stock.qty;
              const profitLoss =
                curValue - stock.avg * stock.qty;

              const isProfit = profitLoss >= 0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={stock._id || index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
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
          <p>Total investment</p>
        </div>

        <div className="col">
          <h5>{currentValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h5>
          <p>Current value</p>
        </div>

        <div className="col">
          <h5 className={totalProfitLoss >= 0 ? "profit" : "loss"}>
            {totalProfitLoss.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({totalReturn.toFixed(2)}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Holdings;