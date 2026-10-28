import React, { useState } from "react";
import "./WatchList.css";

import { watchlist } from "../data/data";
import WatchListItem from "./WatchListItem";
import { DoughnutGraph } from "./DoughnutGraph";

const WatchList = () => {
    const [open, setOpen] = useState(false);

    const data = {
        labels: watchlist.map((stock) => stock.name),
        datasets: [
            {
                label: "Price",
                data: watchlist.map((stock) => stock.price),
                backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                    "rgba(153, 102, 255, 0.5)",
                    "rgba(255, 159, 64, 0.5)",
                    "rgba(99, 255, 132, 0.5)",
                    "rgba(162, 54, 235, 0.5)",
                    "rgba(86, 206, 255, 0.5)",
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <>
            <button
                className="watchlist-toggle"
                onClick={() => setOpen(true)}
            >
                WatchList
            </button>

            <div className={`watchlist-container ${open ? "open" : ""}`}>
                <div className="watchlist-mobile-header">
                    <span>WatchList</span>

                    <button onClick={() => setOpen(false)}>
                        Close
                    </button>
                </div>

                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search"
                        className="search"
                    />

                    <p className="counts">{watchlist.length}</p>
                </div>

                <ul className="list">
                    {watchlist.map((stock, index) => (
                        <WatchListItem stock={stock} key={stock.name || index} />
                    ))}
                </ul>
                <DoughnutGraph data={data} />
            </div>
        </>
    );
};

export default WatchList;