import { useEffect, useState } from "react";
import { mockPositions, type Position } from "../data/positions";
import { convertToCurrency } from "../utils";

const Positions = () => {
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(r => setTimeout(r, 400));
      setPositions(mockPositions);
    };
    fetchData();
  }, []);

  const getPNL = (pos: Position) =>
    (pos.currentPrice - pos.avgPrice) * pos.quantity;

  const totalPNL = positions.reduce((acc, p) => acc + getPNL(p), 0);

  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 dark:text-white p-4 border border-gray-200 dark:border-gray-700 shadow-sm rounded-lg">
      <h2 className="text-xl font-semibold">📍 Active Positions</h2>

      {/* PNL Card */}
      <div className="bg-white dark:bg-gray-100/10 shadow p-4 rounded border border-gray-200">
        <h3 className="text-lg font-semibold mb-2">Total PNL</h3>
        <div className="flex justify-between text-sm">
          <span>Unrealized PNL:</span>
          <span className={totalPNL >= 0 ? "text-green-600" : "text-red-600"}>
            {convertToCurrency(totalPNL)}
          </span>
        </div>
      </div>

      {/* Position List */}
      <div className="space-y-3 ">
        {positions.map(pos => {
          const pnl = getPNL(pos);
          return (
            <div
              key={pos.symbol}
              className="bg-white dark:bg-gray-100/10 shadow p-4 rounded border  hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{pos.symbol}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {pos.quantity} shares @ {convertToCurrency(pos.avgPrice)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {convertToCurrency(pos.currentPrice)}
                  </p>
                  <p
                    className={`text-sm font-semibold flex items-center gap-1 ${
                      pnl >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    <span>{pnl >= 0 ? "📈" : "📉"}</span>
                    {convertToCurrency(Math.abs(pnl))}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Positions;
