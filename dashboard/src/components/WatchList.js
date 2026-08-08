import React, { useState } from "react";
import "./WatchList.css";

import { watchlist } from "../data/data";
import WatchListItem from "./WatchListIItem";

const WatchList = () => {
    const [open, setOpen] = useState(false);

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

                    <p className="counts">
                        {watchlist.length}
                    </p>
                </div>

               
                <ul className="list">
                    {watchlist.map((stock, index) => (
                        <WatchListItem
                            stock={stock}
                            key={index}
                        />
                    ))}
                </ul>

            </div>
        </>
    );
};

export default WatchList;