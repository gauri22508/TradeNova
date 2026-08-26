import { useState, useEffect } from "react";


import "./Shared.css";
import axios from "axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/allOrders")
      .then((res) => {
        console.log(res.data);
        setAllOrders(res.data);
      })
      .catch((err) => {
        console.log("Error fetching Orders:", err);
      });
  }, []);

  return (
    <>
      <h3 className="title">Orders ({allOrders.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>NAME</th>
              <th>QTY.</th>
              <th>PRICE</th>
              <th>MODE</th>
            </tr>
          </thead>

          <tbody>
            {allOrders.map((stock, index) => {
              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.price}</td>
                  <td>{stock.mode}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

      </div>
    </>
  );
};

export default Orders;