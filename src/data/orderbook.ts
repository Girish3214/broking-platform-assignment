export interface Order {
  id: number | string;
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
    id: "ORD1000",
    symbol: "TCS",
    quantity: 9,
    price: 2819.08,
    type: "buy",
    status: "executed",
    realizedPnL: 126.82,
    unrealizedPnL: 2450.46,
  },
  {
    id: "ORD1001",
    symbol: "INFY",
    quantity: 22,
    price: 1480.1,
    type: "sell",
    status: "cancelled",
    realizedPnL: -2591.57,
    unrealizedPnL: 293.17,
  },
  {
    id: "ORD1002",
    symbol: "RELIANCE",
    quantity: 46,
    price: 1063.61,
    type: "buy",
    status: "cancelled",
    realizedPnL: 3330.13,
    unrealizedPnL: 2440.25,
  },
  {
    id: "ORD1003",
    symbol: "HDFCBANK",
    quantity: 9,
    price: 2238.26,
    type: "buy",
    status: "executed",
    realizedPnL: 4106.67,
    unrealizedPnL: -501.94,
  },
];
