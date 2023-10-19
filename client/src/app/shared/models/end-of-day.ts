export interface EndOfDay {
  adjClose: number
  adjHigh: number
  adjLow: number
  adjOpen: number
  adjVolume: number
  close: number
  date: string
  divCash: number
  high: number
  low: number
  open: number
  splitFactor: number
  volume: number
}

export interface EndOfDayMeta {
  ticker: string
  name: string
  exchangeCode: string
  startDate: string
  endDate: string
  description: string
}

export class EndOfDayParams {
  startDate?: string;
  endDate?: string;
  //'daily', 'weekly','monthly', 'annually'
  resampleFreq = 'annually';
}
