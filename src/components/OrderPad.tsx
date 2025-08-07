import React, { useState } from "react";
import type { Holding } from "../data/holdings";

interface OrderPadProps {
  stock: Holding;
  type: "buy" | "sell";
  onClose: () => void;
}

const OrderPad: React.FC<OrderPadProps> = ({ stock, type, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  const isBuy = type === "buy";
  const color = isBuy ? "green" : "red";

  const handleSubmit = () => {
    alert(
      `${isBuy ? "Buying" : "Selling"} ${quantity} shares of ${stock.symbol}`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-md border-t-4 border-${color}-600`}
      >
        <h2 className={`text-xl font-bold mb-4 text-${color}-600`}>
          {isBuy ? "Buy" : "Sell"} {stock.symbol}
        </h2>

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Current Price: ₹{stock.currentPrice}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Quantity</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            className="border px-3 py-2 w-full rounded mt-1"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 bg-${color}-600 text-white rounded hover:bg-${color}-700`}
          >
            Confirm {isBuy ? "Buy" : "Sell"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPad;
