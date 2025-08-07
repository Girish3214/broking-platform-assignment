import { useState, useEffect } from "react";
import { mockHoldings, type Holding } from "../data/holdings";
import OrderPad from "../components/OrderPad";
import FloatingActionButton from "../components/FloatingActionButton";

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

      <div>
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
                  className="border p-4 rounded shadow-sm bg-white hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    console.log(stock);
                    setSelectedStock(stock);
                    setActionType("sell"); // default action, we'll change this later for FAB
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold">{stock.symbol}</h3>
                      <p className="text-sm text-gray-500">
                        Qty: {stock.quantity} @ ₹{stock.avgPrice}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-md font-semibold">
                        ₹{marketValue.toFixed(2)}
                      </p>
                      <p
                        className={`text-sm ${
                          isProfit ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {isProfit ? "+" : "-"}₹{Math.abs(profitLoss).toFixed(2)}
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
