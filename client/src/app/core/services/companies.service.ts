import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from 'src/app/shared/models/company';
import { CompanySearchParams } from 'src/app/shared/models/company-search-params';
import { CompanySummary } from 'src/app/shared/models/company-summary';
import { RealtimeStockPrice } from 'src/app/shared/models/realtime-stock-price';
import { PaginatedResult } from 'src/app/shared/models/pagination';
import { getPaginatedResult, getPaginationHeaders } from 'src/app/shared/utils/paginationHelper';
import { environment } from 'src/environments/environment';
import { ApiResponseSecurityStockPrices, SecurityStockPricesParams } from 'src/app/shared/models/stock-prices-by-security';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  baseUrl = environment.apiUrl;
  searchParams: CompanySearchParams = new CompanySearchParams;

  constructor(private http: HttpClient) { }

  searchCompanies(searchParams: CompanySearchParams): Observable<PaginatedResult<CompanySummary[]>> {
    let params = getPaginationHeaders(searchParams.pageNumber, searchParams.pageSize);

    if(searchParams.search) {
      params = params.append('search', searchParams.search);
    }

    params = params.append('isActive', searchParams.isActive);

    return getPaginatedResult<CompanySummary[]>(`${this.baseUrl}companies/search`, params, this.http);
  }

  getCompany(id: string): Observable<Company> {
    return this.http.get<Company>(`${this.baseUrl}companies/${id}`);
  }

  getRealtimeStockPrice(identifier: string, source?: string): Observable<RealtimeStockPrice> {
    let params = new HttpParams();

    params = params.append('identifier', identifier);

    if (source) {
      params = params.append('source', source);
    }

    return this.http.get<RealtimeStockPrice>
      (`${this.baseUrl}companies/realtime-stock-price`, { params: params });
  }

  getStockPricesBySecurity(parameters: SecurityStockPricesParams): Observable<ApiResponseSecurityStockPrices> {
    let params = parameters.toHttpParams(parameters);
    console.log(params);

    return this.http.get<ApiResponseSecurityStockPrices>
      (`${this.baseUrl}companies/stock-prices-by-security`, { params: params })
  }

  getParams() {
    return this.searchParams;
  }

  setParams(params: CompanySearchParams) {
    this.searchParams = params;
  }

  resetParams() {
    this.searchParams = new CompanySearchParams();
    return this.searchParams;
  }

}
