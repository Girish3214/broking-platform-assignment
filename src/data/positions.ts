export interface Position {
  symbol: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
}

export const mockPositions: Position[] = [
  { symbol: "TCS", quantity: 12, avgPrice: 3200, currentPrice: 3400 },
  { symbol: "INFY", quantity: 10, avgPrice: 1400, currentPrice: 1320 },
  { symbol: "RELIANCE", quantity: 5, avgPrice: 2600, currentPrice: 2650 },
];
