import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Risk } from 'src/app/shared/models/risk';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RiskService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getRisk(ticker: string): Observable<Risk[]> {
    return this.http.get<Risk[]>(this.baseUrl + 'risk/' + ticker);
  }

}
