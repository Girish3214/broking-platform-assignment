import { useEffect, useState } from "react";
import { mockPositions, type Position } from "../data/positions";

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
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">📍 Active Positions</h2>

      {/* PNL Card */}
      <div className="bg-white shadow p-4 rounded border border-gray-200">
        <h3 className="text-lg font-semibold mb-2">Total PNL</h3>
        <div className="flex justify-between text-sm">
          <span>Unrealized PNL:</span>
          <span className={totalPNL >= 0 ? "text-green-600" : "text-red-600"}>
            ₹{totalPNL.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Position List */}
      <div className="space-y-3">
        {positions.map(pos => {
          const pnl = getPNL(pos);
          return (
            <div
              key={pos.symbol}
              className="bg-white shadow p-4 rounded border hover:bg-gray-50"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{pos.symbol}</p>
                  <p className="text-xs text-gray-500">
                    {pos.quantity} shares @ ₹{pos.avgPrice}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    ₹{pos.currentPrice.toFixed(2)}
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      pnl >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {pnl >= 0 ? "+" : "-"}₹{Math.abs(pnl).toFixed(2)}
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
