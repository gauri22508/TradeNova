import { useState, useEffect } from "react";
import axios from "axios";
import "./Shared.css";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);

  useEffect(() => {
    const fetchPositions = () => {
      axios
        .get("http://localhost:3002/allPositions", { withCredentials: true })
        .then((res) => setAllPositions(res.data))
        .catch((err) => console.log("Error fetching positions:", err));
    };

    fetchPositions();
    window.addEventListener("trade:updated", fetchPositions);
    return () => window.removeEventListener("trade:updated", fetchPositions);
  }, []);

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&amp;L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allPositions.map((stock, index) => {
              const quantity = Number(stock.qty) || 0;
              const averagePrice = Number(stock.avg) || 0;
              const currentPrice = Number(stock.price) || 0;
              const profitLoss = (currentPrice - averagePrice) * quantity;
              const profClass = profitLoss >= 0 ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={stock._id || index}>
                  <td>{stock.product}</td>
                  <td>{stock.name}</td>
                  <td>{quantity}</td>
                  <td>{averagePrice.toFixed(2)}</td>
                  <td>{currentPrice.toFixed(2)}</td>
                  <td className={profClass}>{profitLoss.toFixed(2)}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
