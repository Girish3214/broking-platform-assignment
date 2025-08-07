export interface Order {
  id: number;
  symbol: string;
  quantity: number;
  price: number;
  type: "buy" | "sell";
  status: "executed" | "cancelled";
  realizedPnL: number; // only for executed
  unrealizedPnL: number;
}

export const mockOrders: Order[] = [
  {
    id: 1,
    symbol: "TCS",
    quantity: 10,
    price: 3200,
    type: "buy",
    status: "executed",
    realizedPnL: 250,
    unrealizedPnL: 150,
  },
  {
    id: 2,
    symbol: "HDFCBANK",
    quantity: 5,
    price: 1700,
    type: "sell",
    status: "executed",
    realizedPnL: -100,
    unrealizedPnL: 0,
  },
  {
    id: 3,
    symbol: "INFY",
    quantity: 15,
    price: 1350,
    type: "buy",
    status: "cancelled",
    realizedPnL: 0,
    unrealizedPnL: 0,
  },
];
