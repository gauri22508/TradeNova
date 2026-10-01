import React, { useEffect, useState } from "react";

import BuySellActionWindow from "./BuySellActionWindow";

const GeneralContext = React.createContext({
    openBuySellWindow: (uid, name, mode) => { },
    closeBuySellWindow: () => { },
});

export const GeneralContextProvider = (props) => {

    const [isBuySellWindowOpen, setIsBuySellWindowOpen] =
        useState(false);

    const [selectedStockUID, setSelectedStockUID] =
        useState("");

    const [selectedStockName, setSelectedStockName] =
        useState("");

    const [selectedStockPrice, setSelectedStockPrice] =
        useState(0);

    const [orderMode, setOrderMode] =
        useState("BUY");

    const [orderNotice, setOrderNotice] = useState("");

    useEffect(() => {
        if (!orderNotice) return undefined;

        const timeoutId = window.setTimeout(() => setOrderNotice(""), 4000);
        return () => window.clearTimeout(timeoutId);
    }, [orderNotice]);


    const handleOpenBuySellWindow = (uid, name, mode, price) => {

        setIsBuySellWindowOpen(true);

        setSelectedStockUID(uid);

        setSelectedStockName(name);

        setSelectedStockPrice(price);

        setOrderMode(mode);
    };


    const handleCloseBuySellWindow = () => {

        setIsBuySellWindowOpen(false);

        setSelectedStockUID("");

        setSelectedStockName("");

        setSelectedStockPrice(0);

        setOrderMode("BUY");
    };


    return (
        <GeneralContext.Provider
            value={{
                openBuySellWindow: handleOpenBuySellWindow,
                closeBuySellWindow: handleCloseBuySellWindow,
                showOrderNotice: setOrderNotice,
            }}
        >

            {props.children}

            {orderNotice && (
                <div className="order-toast" role="status" aria-live="polite">
                    {orderNotice}
                </div>
            )}

            {isBuySellWindowOpen && (
                <BuySellActionWindow
                    uid={selectedStockUID}
                    name={selectedStockName}
                    price={selectedStockPrice}
                    mode={orderMode}
                />
            )}

        </GeneralContext.Provider>
    );
};

export default GeneralContext;