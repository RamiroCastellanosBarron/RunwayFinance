export interface InterdayPrice {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export class InterdayPriceParams {
  startDate?: string;
  endDate?: string;
  requestFreq = '4hour';
}
