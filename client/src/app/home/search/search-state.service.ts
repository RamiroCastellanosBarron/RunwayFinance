import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SearchResult } from 'src/app/shared/models/search';

@Injectable({
  providedIn: 'root'
})
export class SearchStateService {

  private searchResultsSource = new BehaviorSubject<SearchResult[]>([]);
  searchResults$ = this.searchResultsSource.asObservable();

  private showDropdownSource = new BehaviorSubject<boolean>(false);
  showDropdown$ = this.showDropdownSource.asObservable();

  setSearchResults(results: SearchResult[]) {
    this.searchResultsSource.next(results);
  }

  setShowDropdown(show: boolean) {
    this.showDropdownSource.next(show);
  }
}
