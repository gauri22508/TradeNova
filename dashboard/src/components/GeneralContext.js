import React, { useState } from "react";

import BuySellActionWindow from "./BuySellActionWindow";

const GeneralContext = React.createContext({
    openBuySellWindow: (uid, name, mode) => {},
    closeBuySellWindow: () => {},
});

export const GeneralContextProvider = (props) => {

    const [isBuySellWindowOpen, setIsBuySellWindowOpen] =
        useState(false);

    const [selectedStockUID, setSelectedStockUID] =
        useState("");

    const [selectedStockName, setSelectedStockName] =
        useState("");

    const [orderMode, setOrderMode] =
        useState("BUY");


    const handleOpenBuySellWindow = (uid, name, mode) => {

        setIsBuySellWindowOpen(true);

        setSelectedStockUID(uid);

        setSelectedStockName(name);

        setOrderMode(mode);
    };


    const handleCloseBuySellWindow = () => {

        setIsBuySellWindowOpen(false);

        setSelectedStockUID("");

        setSelectedStockName("");

        setOrderMode("BUY");
    };


    return (
        <GeneralContext.Provider
            value={{
                openBuySellWindow: handleOpenBuySellWindow,
                closeBuySellWindow: handleCloseBuySellWindow,
            }}
        >

            {props.children}

            {isBuySellWindowOpen && (
                <BuySellActionWindow
                    uid={selectedStockUID}
                    name={selectedStockName}
                    mode={orderMode}
                />
            )}

        </GeneralContext.Provider>
    );
};

export default GeneralContext;