import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CompanySummary } from 'src/app/shared/models/company-summary';

@Injectable({
  providedIn: 'root'
})
export class SearchStateService {

  private searchResultsSource = new BehaviorSubject<CompanySummary[]>([]);
  searchResults$ = this.searchResultsSource.asObservable();

  private showDropdownSource = new BehaviorSubject<boolean>(false);
  showDropdown$ = this.showDropdownSource.asObservable();

  setSearchResults(results: CompanySummary[]) {
    this.searchResultsSource.next(results);
  }

  setShowDropdown(show: boolean) {
    this.showDropdownSource.next(show);
  }
}
