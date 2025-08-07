import React, { useState } from "react";
import type { Holding } from "../data/holdings";
import showToast from "../utils/toast";

interface OrderPadProps {
  stock: Holding;
  type: "buy" | "sell";
  onClose: () => void;
}

const OrderPad: React.FC<OrderPadProps> = ({ stock, type, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  const isBuy = type === "buy";

  const handleSubmit = () => {
    showToast(
      `${isBuy ? "Bought" : "Sold"} ${quantity} shares of ${stock.symbol}`,
      isBuy ? "success" : "error"
    );
    setQuantity(1); // Reset quantity after action
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg p-6 w-full max-w-md border-t-4 ${
          isBuy
            ? "border-green-600 dark:border-green-500"
            : "border-red-600 dark:border-red-500"
        }`}
      >
        <h2
          className={`text-xl font-bold mb-4 ${
            isBuy
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {isBuy ? "Buy" : "Sell"} {stock.symbol}
        </h2>

        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
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
            className="border dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2 w-full rounded mt-1"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-600 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition duration-200 ease-in-out"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 text-white rounded transition duration-200 ease-in-out ${
              isBuy
                ? "bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                : "bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
            }`}
          >
            Confirm {isBuy ? "Buy" : "Sell"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPad;
