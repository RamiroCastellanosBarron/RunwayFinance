import { RealtimeStockPrice } from "./realtime-stock-price"
import { ApiResponseSecurityStockPrices, StockPrice } from "./stock-prices-by-security"

export interface Company {
  id: string
  ticker: string
  name: string
  lei: any
  legalName: string
  stockExchange: string
  sic: any
  shortDescription: string
  longDescription: string
  ceo: any
  companyUrl: any
  businessAddress: string
  mailingAddress: string
  businessPhoneNo: string
  hqAddress1: any
  hqAddress2: any
  hqAddressCity: any
  hqAddressPostalCode: any
  entityLegalForm: any
  cik: string
  latestFilingDate: any
  hqState: string
  hqCountry: string
  incState: string
  incCountry: string
  employees: any
  entityStatus: any
  sector: any
  industryCategory: any
  industryGroup: any
  template: string
  standardizedActive: boolean
  firstFundamentalDate: any
  lastFundamentalDate: any
  firstStockPriceDate: string
  lastStockPriceDate: string

  stockPrice: RealtimeStockPrice
  securityStockPrices: ApiResponseSecurityStockPrices;
}
