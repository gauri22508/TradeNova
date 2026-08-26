import React, { useState } from "react";

import BuySellActionWindow from "./BuySellActionWindow";

const GeneralContext = React.createContext({
  openBuySellWindow: (uid , mode) => {},
  closeBuySellWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuySellWindowOpen, setIsBuySellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [orderMode , setOrderMode] = useState("BUY")

  const handleOpenBuySellWindow = (uid , mode) => {
    setIsBuySellWindowOpen(true);
    setSelectedStockUID(uid);
    setOrderMode(mode);
  };

  const handleCloseBuySellWindow = () => {
    setIsBuySellWindowOpen(false);
    setSelectedStockUID("");
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
      {isBuySellWindowOpen && <BuySellActionWindow uid={selectedStockUID}  mode={orderMode}/>}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;