export interface Daily {
  date: string
  marketCap: number
  enterpriseVal: number
  peRatio: number
  pbRatio: number
  trailingPEG1Y: number
}

export class DailyParams {
  startDate?: Date;
  endDate?: Date;
}

export interface Meta {
  permaTicker: string
  ticker: string
  name: string
  isActive: boolean
  isADR: boolean
  sector: string
  industry: string
  sicCode: number
  sicSector: string
  sicIndustry: string
  reportingCurrency: string
  location: string
  companyWebsite: string
  secFilingWebsite: string
  statementLastUpdated: string
  dailyLastUpdated: string
  dataProviderPermaTicker: string
}
