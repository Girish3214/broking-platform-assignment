export interface Position {
  symbol: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  pnl: number;
  entryPrice?: number;
}

export const mockPositions: Position[] = [
  {
    symbol: "TCS",
    quantity: 58,
    entryPrice: 2139.06,
    currentPrice: 2796.87,
    pnl: -1440.05,
    avgPrice: 2139.06,
  },
  {
    symbol: "INFY",
    quantity: 62,
    entryPrice: 2567.69,
    currentPrice: 2072.68,
    pnl: -5081.03,
    avgPrice: 2567.69,
  },
  {
    symbol: "RELIANCE",
    quantity: 104,
    entryPrice: 1251.76,
    currentPrice: 807.24,
    pnl: 3913.89,
    avgPrice: 1251.76,
  },
];
