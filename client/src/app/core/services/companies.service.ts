import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AllCompaniesParams } from 'src/app/shared/models/all-companies';
import { Observable } from 'rxjs';
import { Company } from 'src/app/shared/models/company';
import { Daily, DailyParams, Meta } from 'src/app/shared/models/fundamentals';
import { InterdayPrice, InterdayPriceParams } from 'src/app/shared/models/interday-price';
import { DividendYield } from 'src/app/shared/models/dividend-yield';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  baseUrl = environment.apiUrl;
  dailyParams = new DailyParams();
  interdayPriceParams = new InterdayPriceParams();

  constructor(private http: HttpClient) { }

  searchCompanies() {

  }

  getCompany(ticker: string): Observable<Company> {
    return this.http.get<Company>(this.baseUrl + 'companies/' + ticker);
  }

  getDaily(ticker: string): Observable<Daily[]> {
    let params = new HttpParams();

    if (this.dailyParams.startDate) {
      params = params.append('startDate', this.dailyParams.startDate.toISOString());
    }

    if (this.dailyParams.endDate) {
      params = params.append('endDate', this.dailyParams.endDate.toISOString());
    }

    return this.http.get<Daily[]>(`${this.baseUrl}companies/daily/${ticker}`, { params });
  }

  getMeta(ticker: string): Observable<Meta> {
    return this.http.get<Meta>(`${this.baseUrl}companies/meta/${ticker}`);
  }

  getDailyParams() {
    return this.dailyParams;
  }

  setDailyParams(params: DailyParams) {
    this.dailyParams = params;
  }

  resetDailyParams() {
    this.dailyParams = new DailyParams;
  }

  getInterdayPrices(ticker: string): Observable<InterdayPrice[]> {
    let params = new HttpParams();

    if (this.interdayPriceParams.startDate) {
      params = params.append('startDate', this.interdayPriceParams.startDate);
    }

    if (this.interdayPriceParams.endDate) {
      params = params.append('endDate', this.interdayPriceParams.endDate);
    }

    params = params.append('requestFreq', this.interdayPriceParams.requestFreq);

    const url = `${this.baseUrl}companies/interday-prices/${ticker}`;

    return this.http.get<InterdayPrice[]>(url, { params });
  }

  getInterdayPriceParams() {
    return this.interdayPriceParams;
  }

  setInterdayPriceParams(params: InterdayPriceParams) {
    this.interdayPriceParams = params;
  }

  resetInterdayPriceParams() {
    this.interdayPriceParams = new InterdayPriceParams;
  }

  getDividendYield(ticker: string): Observable<DividendYield> {
    return this.http.get<DividendYield>(`${this.baseUrl}companies/dividend-yield/${ticker}`);
  }

}
