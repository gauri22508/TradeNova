
import { useState, useContext } from "react";
import "./WatchList.css";

import { Tooltip, Grow } from "@mui/material";
import {
    KeyboardArrowDown,
    KeyboardArrowUp,
    BarChartOutlined,
    MoreHoriz,
} from "@mui/icons-material";

import GeneralContext from "./GeneralContext";

const WatchListItem = ({ stock }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseExit = () => {
        setIsHovered(false);
    };

    return (
        <li
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseExit}
        >
            <div className="item">
                <p className={stock.isDown ? "down" : "up"}>
                    {stock.name}
                </p>

                <div className="itemInfo">
                    <span className="percent">
                        {stock.percent}
                    </span>

                    {stock.isDown ? (
                        <KeyboardArrowDown className="down" />
                    ) : (
                        <KeyboardArrowUp className="up" />
                    )}

                    <span className="price">
                        {stock.price}
                    </span>
                </div>
            </div>

            {isHovered && (
                <WatchListAction
                    uid={stock.uid}
                    name={stock.name}
                />
            )}
        </li>
    );
};

export default WatchListItem;


const WatchListAction = ({ uid, name }) => {

    const { openBuySellWindow } = useContext(GeneralContext);

    return (
        <span className="actions">
            <span>

                <Tooltip
                    title="Buy (B)"
                    placement="top"
                    arrow
                    TransitionComponent={Grow}
                >
                    <button
                        className="buy"
                        onClick={() =>
                            openBuySellWindow(uid, name, "BUY")
                        }
                    >
                        Buy
                    </button>
                </Tooltip>


                <Tooltip
                    title="Sell (S)"
                    placement="top"
                    arrow
                    TransitionComponent={Grow}
                >
                    <button
                        className="sell"
                        onClick={() =>
                            openBuySellWindow(uid, name, "SELL")
                        }
                    >
                        Sell
                    </button>
                </Tooltip>


                <Tooltip
                    title="Analytics (A)"
                    placement="top"
                    arrow
                    TransitionComponent={Grow}
                >
                    <button className="action">
                        <BarChartOutlined className="icon" />
                    </button>
                </Tooltip>


                <Tooltip
                    title="More"
                    placement="top"
                    arrow
                    TransitionComponent={Grow}
                >
                    <button className="action">
                        <MoreHoriz className="icon" />
                    </button>
                </Tooltip>

            </span>
        </span>
    );
};
