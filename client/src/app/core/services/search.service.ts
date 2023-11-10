import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchResult } from 'src/app/shared/models/search';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  baseUrl = environment.apiUrl;
  searchTerm = '';

  constructor(private http: HttpClient) { }

  search(searchTerm: string): Observable<SearchResult[]> {
    let params = new HttpParams();

    if (searchTerm) params = params.append('query', searchTerm);

    return this.http.get<SearchResult[]>(this.baseUrl + 'search', { params });
  }

  getSearchTerm() {
    return this.searchTerm;
  }

  setSearchTerm(searchTerm: string) {
    this.searchTerm = searchTerm;
  }

  resetSearchTerm() {
    this.searchTerm = '';
  }
}
