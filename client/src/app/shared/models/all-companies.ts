// https://docs.intrinio.com/documentation/csharp/get_all_companies_v2

import { HttpParams } from "@angular/common/http";

export class AllCompaniesParams {
  latestFilingDate: null | string = null;
  sic: null | string = null;
  template: null | string = null;
  sector: null | string = null;
  industryCategory: string = 'Computer Hardware';
  industryGroup: null | string = null;
  hasFundamentals: boolean = true;
  hasStockPrices: boolean = true;
  theaEnabled: boolean | null = null;
  pageSize: number = 5;
  nextPage: null | string = null;
  pageNumber = 1;

  toHttpParams(instance: AllCompaniesParams): HttpParams {
    let params = new HttpParams();

    Object.keys(instance).forEach((key: string) => {
      const value = instance[key as keyof AllCompaniesParams];
      if (value !== null && value !== undefined) {
        params = params.append(key, value.toString());
      }
    });

    return params;
  }

}

export interface ApiResponseCompanies {
  companies: AllCompanies[]
  next_page: string
}

export interface AllCompanies {
  id: string
  ticker: string
  name: string
  lei?: string
  cik: string
}
