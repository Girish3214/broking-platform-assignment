export interface Holding {
  symbol: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
}

export const mockHoldings: Holding[] = [
  { symbol: "TCS", quantity: 41, avgPrice: 583.61, currentPrice: 2055.5 },
  { symbol: "INFY", quantity: 67, avgPrice: 2852.1, currentPrice: 2209.48 },
  { symbol: "RELIANCE", quantity: 97, avgPrice: 1014.88, currentPrice: 635.84 },
];
