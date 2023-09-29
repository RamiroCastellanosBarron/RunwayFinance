export interface RealtimeStockPrice {
  lastPrice: number
  lastTime: string
  lastSize: number
  bidPrice: number
  bidSize: number
  askPrice: number
  askSize: number
  openPrice: number
  closePrice: number
  highPrice: number
  lowPrice: number
  exchangeVolume: number
  marketVolume: any
  updatedOn: string
  source: string
  listingVenue: any
  salesConditions: string
  quoteConditions: any
  marketCenterCode: string
  isDarkpool: boolean
  security: Security
}

interface Security {
  id: string
  ticker: string
  exchangeTicker: string
  figi: string
  compositeFigi: string
}
