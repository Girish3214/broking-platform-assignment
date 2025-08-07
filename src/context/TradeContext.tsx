import React, { createContext, useContext, useState } from "react";

interface Trade {
  type: "buy" | "sell";
  stock: { symbol: string; currentPrice: number };
  quantity: number;
  timestamp: string;
}

export interface Stock {
  symbol: string;
  quantity: number;
  currentPrice: number;
  avgPrice?: number; // from Holdings or Positions
  pnl?: number; // optional: derived for display (Positions)
  entryPrice?: number; // optional: from Positions
  type?: "buy" | "sell"; // optional: for Order Pad context
}

const TradeContext = createContext<{
  trades: Trade[];
  selectedStock: Stock | null;
  tradeType: "buy" | "sell" | null;
  isOrderPadOpen: boolean;
  addTrade: (trade: Trade) => void;
  openOrderPad: (stock: Stock, type: "buy" | "sell") => void;
}>({
  trades: [],
  addTrade: () => {},
  openOrderPad: () => {},
  selectedStock: null,
  tradeType: null,
  isOrderPadOpen: false,
});

export const TradeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [trades, setTrades] = useState<Trade[]>([]);

  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [tradeType, setTradeType] = useState<"buy" | "sell" | null>(null);
  const [isOrderPadOpen, setIsOrderPadOpen] = useState(false);

  const addTrade = (trade: Trade) => {
    setTrades(prev => [...prev, trade]);
  };

  const openOrderPad = (stock: Stock, type: "buy" | "sell") => {
    setSelectedStock(stock);
    setTradeType(type);
    setIsOrderPadOpen(true);
  };
  return (
    <TradeContext.Provider
      value={{
        trades,
        selectedStock,
        tradeType,
        isOrderPadOpen,
        addTrade,
        openOrderPad,
      }}
    >
      {children}
    </TradeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTrades = () => {
  const context = useContext(TradeContext);
  if (!context) throw new Error("useTrades must be used within TradeProvider");
  return context;
};
