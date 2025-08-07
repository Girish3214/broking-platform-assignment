import { useState, useEffect } from "react";
import { mockHoldings, type Holding } from "../data/holdings";
import OrderPad from "../components/OrderPad";
import FloatingActionButton from "../components/FloatingActionButton";
import { convertToCurrency } from "../utils";

const Holdings = () => {
  const [data, setData] = useState<Holding[]>([]);

  const [selectedStock, setSelectedStock] = useState<Holding | null>(null);
  const [actionType, setActionType] = useState<"buy" | "sell" | null>(null);

  useEffect(() => {
    // simulate API call
    const fetchData = async () => {
      await new Promise(r => setTimeout(r, 500)); // simulate delay
      setData(mockHoldings);
    };
    fetchData();
  }, []);

  return (
    <>
      {selectedStock && actionType && (
        <OrderPad
          stock={selectedStock}
          type={actionType}
          onClose={() => {
            setSelectedStock(null);
            setActionType(null);
          }}
        />
      )}
      {data.length > 0 && (
        <FloatingActionButton
          stocks={data}
          onAction={(type, stock) => {
            setSelectedStock(stock);
            setActionType(type);
          }}
        />
      )}

      <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 shadow-sm rounded-lg">
        <h2 className="text-xl font-semibold mb-4">📊 Your Holdings</h2>

        {data.length === 0 ? (
          <div>Loading holdings...</div>
        ) : (
          <div className="space-y-4">
            {data.map(stock => {
              const marketValue = stock.quantity * stock.currentPrice;
              const profitLoss =
                (stock.currentPrice - stock.avgPrice) * stock.quantity;
              const isProfit = profitLoss >= 0;

              return (
                <div
                  key={stock.symbol}
                  className="border p-4 bg-white dark:bg-gray-100/10 cursor-pointer border-gray-200 dark:border-gray-700 shadow-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 "
                  onClick={() => {
                    console.log(stock);
                    setSelectedStock(stock);
                    setActionType("sell"); // default action, we'll change this later for FAB
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold">{stock.symbol}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Qty: {stock.quantity} @{" "}
                        {convertToCurrency(stock.avgPrice)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-md font-semibold">
                        {convertToCurrency(marketValue)}
                      </p>
                      <p
                        className={`text-sm font-medium flex items-center gap-1 ${
                          isProfit ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        <span> {isProfit ? "📈" : "📉"}</span>
                        {convertToCurrency(Math.abs(profitLoss))}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Holdings;
