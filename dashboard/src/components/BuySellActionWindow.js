import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import GeneralContext from "./GeneralContext";
import "./BuySellActionWindow.css";

const BuySellActionWindow = ({ uid, name, mode }) => {

    const { closeBuySellWindow } =
        useContext(GeneralContext);

    const [stockQuantity, setStockQuantity] = useState(1);

    const [stockPrice, setStockPrice] =useState(0.0);


    const handleOrderClick = async () => {

        try {

            await axios.post(
                "http://localhost:3002/addOrder",
                {
                    name: name,
                    qty: stockQuantity,
                    price: stockPrice,
                    mode: mode,
                }
            );

            alert("Order Saved");

            closeBuySellWindow();

        } catch (err) {

            console.log("Order Error:", err);

            alert("Failed to save order");
        }
    };


    const handleCancelClick = () => {

        closeBuySellWindow();

    };


    return (
        <div
            className="buy-window-container"
            id="buy-window"
        >

            <div className="regular-order">

                <div className="inputs">

                    <fieldset>

                        <legend>Qty.</legend>

                        <input
                            type="number"
                            id="qty"
                            name="qty"
                            onChange={(e) =>
                                setStockQuantity(e.target.value)
                            }
                            value={stockQuantity}
                        />

                    </fieldset>


                    <fieldset>

                        <legend>Price</legend>

                        <input
                            type="number"
                            id="price"
                            name="price"
                            onChange={(e) =>
                                setStockPrice(e.target.value)
                            }
                            value={stockPrice}
                        />

                    </fieldset>

                </div>

            </div>


            <div className="buttons">

                <span>
                    Margin required ₹140.65
                </span>


                <div>

                    <Link
                        className="btn btn-blue"
                        onClick={handleOrderClick}
                    >
                        {mode === "BUY" ? "BUY" : "SELL"}
                    </Link>


                    <Link
                        to=""
                        className="btn btn-grey"
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default BuySellActionWindow;