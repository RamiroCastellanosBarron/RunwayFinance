import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndOfDay, EndOfDayMeta, EndOfDayParams } from 'src/app/shared/models/end-of-day';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EndOfDayService {
  baseUrl = environment.apiUrl;
  endOfDayParams = new EndOfDayParams();

  constructor(private http: HttpClient) { }

  getEndOfDayParams() {
    return this.endOfDayParams;
  }

  setEndOfDayParams(params: EndOfDayParams) {
    this.endOfDayParams = params;
  }

  resetEndOfDayParams() {
    this.endOfDayParams = new EndOfDayParams;
  }

  getEndOfDay(ticker: string): Observable<EndOfDay[]> {
    let params = new HttpParams();

    if (this.endOfDayParams.startDate) {
      params = params.append('startDate', this.endOfDayParams.startDate);
    }

    if (this.endOfDayParams.endDate) {
      params = params.append('endDate', this.endOfDayParams.endDate);
    }

    params = params.append('resampleFreq', this.endOfDayParams.resampleFreq);

    return this.http.get<EndOfDay[]>(`${this.baseUrl}EndOfDay/${ticker}`, { params });
  }

  getEndOfDayMeta(ticker: string): Observable<EndOfDayMeta> {
    return this.http.get<EndOfDayMeta>(`${this.baseUrl}EndOfDay/meta/${ticker}`);
  }

}
