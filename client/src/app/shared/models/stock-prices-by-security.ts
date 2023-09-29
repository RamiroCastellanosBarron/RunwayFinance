import { HttpParams } from "@angular/common/http";

export class SecurityStockPricesParams {
  constructor(
    _identifier: string,
    _startDate: string,
    _endDate: string,
    _frequency: string
    ) {
    this.identifier = _identifier;
    this.startDate = _startDate;
    this.endDate = _endDate;
    this.frequency = _frequency;
  }

  identifier: string;
  startDate: string;
  endDate: string;
  frequency: string;
  pageSize: number = 100;
  nextPage = null;

  toHttpParams(instance: SecurityStockPricesParams): HttpParams {
    let params = new HttpParams();

    Object.keys(instance).forEach((key: string) => {
      const value = instance[key as keyof SecurityStockPricesParams];
      if (value !== null && value !== undefined) {
        params = params.append(key, value.toString());
      }
    });

    return params;
  }

}

export interface ApiResponseSecurityStockPrices {
  stockPrices: StockPrice[]
  security: Security
  nextPage: string
}

export interface StockPrice {
  frequency: number
  date: string
  intraperiod: boolean
  open: number
  high: number
  low: number
  close: number
  volume: number
  adjOpen: number
  adjHigh: number
  adjLow: number
  adjClose: number
  adjVolume: number
  factor: number
  splitRatio: number
  dividend: number
  change: number
  percentChange: number
  fiftyTwoWeekHigh: number
  fiftyTwoWeekLow: number
}

export interface Security {
  id: string
  companyId: string
  name: string
  code: string
  currency: string
  ticker: string
  compositeTicker: string
  figi: string
  compositeFigi: string
  shareClassFigi: string
  primaryListing: boolean
}
