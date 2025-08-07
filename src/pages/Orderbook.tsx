import { useEffect, useState } from "react";
import { mockOrders, type Order } from "../data/orderbook";
import { convertToCurrency } from "../utils";

const Orderbook = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(r => setTimeout(r, 400));
      setOrders(mockOrders);
    };
    fetchData();
  }, []);

  const totalRealized = orders.reduce((acc, o) => acc + o.realizedPnL, 0);
  const totalUnrealized = orders.reduce((acc, o) => acc + o.unrealizedPnL, 0);

  return (
    <div className="space-y-6 bg-white dark:bg-gray-800 dark:text-white p-4 border border-gray-200 dark:border-gray-700 shadow-sm rounded-lg">
      <h2 className="text-xl font-semibold">📈 Orderbook</h2>

      {/* PNL Card */}
      <div className="bg-white dark:bg-gray-100/10 shadow p-4 rounded border border-gray-200">
        <h3 className="text-lg font-semibold mb-2">PNL Summary</h3>
        <div className="flex justify-between text-sm">
          <span>Realized PNL:</span>
          <span
            className={totalRealized >= 0 ? "text-green-600" : "text-red-600"}
          >
            {convertToCurrency(totalRealized)}
          </span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span>Unrealized PNL:</span>
          <span
            className={totalUnrealized >= 0 ? "text-green-600" : "text-red-600"}
          >
            {convertToCurrency(totalUnrealized)}
          </span>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-3 ">
        {orders.map(order => (
          <div
            key={order.id}
            className="bg-white dark:bg-gray-100/10 shadow p-4 rounded border border-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{order.symbol}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {order.quantity} shares @ {convertToCurrency(order.price)}
                </p>
              </div>
              <div className="text-right text-sm">
                <p
                  className={`font-bold ${
                    order.type === "buy" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {order.type.toUpperCase()}
                </p>
                <p
                  className={`text-xs ${
                    order.status === "executed"
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-400 dark:text-gray-400"
                  }`}
                >
                  {order.status.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orderbook;
