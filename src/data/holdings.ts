export interface Holding {
  symbol: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
}

export const mockHoldings: Holding[] = [
  { symbol: "TCS", quantity: 10, avgPrice: 3250, currentPrice: 3425 },
  { symbol: "INFY", quantity: 15, avgPrice: 1400, currentPrice: 1350 },
  { symbol: "HDFCBANK", quantity: 8, avgPrice: 1600, currentPrice: 1720 },
];
