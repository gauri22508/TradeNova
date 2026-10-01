import { useContext, useState } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";
import "./BuySellActionWindow.css";

const BuySellActionWindow = ({ name, price, mode }) => {

    const { closeBuySellWindow, showOrderNotice } =
        useContext(GeneralContext);

    const [stockQuantity, setStockQuantity] = useState(1);

    const [stockPrice, setStockPrice] = useState(price);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const handleOrderClick = async () => {
        const quantity = Number(stockQuantity);
        const orderPrice = Number(stockPrice);

        if (!Number.isInteger(quantity) || quantity <= 0 || !Number.isFinite(orderPrice) || orderPrice <= 0) {
            setErrorMessage("Enter a quantity above 0 and a valid price.");
            return;
        }

        setErrorMessage("");
        setIsSubmitting(true);
        try {
            await axios.post(
                "http://localhost:3002/addOrder",
                {
                    name: name,
                    qty: quantity,
                    price: orderPrice,
                    mode: mode,
                },
                { withCredentials: true }
            );

            window.dispatchEvent(new Event("trade:updated"));
            showOrderNotice(`${mode} order placed: ${quantity} ${name} at ₹${orderPrice.toFixed(2)}.`);
            closeBuySellWindow();

        } catch (err) {
            setErrorMessage(err.response?.data?.error || err.response?.data || "Unable to save order. Please try again.");
        } finally {
            setIsSubmitting(false);
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
                            min="1"
                            step="1"
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
                            min="0.01"
                            step="0.01"
                        />

                    </fieldset>

                </div>

            </div>


            <div className="buttons">

                <span>Estimated order value ₹{(Number(stockQuantity || 0) * Number(stockPrice || 0)).toFixed(2)}</span>

                {errorMessage && <p className="order-error" role="alert">{errorMessage}</p>}


                <div>

                    <button className="btn btn-blue" onClick={handleOrderClick} disabled={isSubmitting} type="button">
                        {mode === "BUY" ? "BUY" : "SELL"}
                    </button>


                    <button type="button" className="btn btn-grey" onClick={handleCancelClick} disabled={isSubmitting}>
                        Cancel
                    </button>

                </div>

            </div>

        </div>
    );
};

export default BuySellActionWindow;