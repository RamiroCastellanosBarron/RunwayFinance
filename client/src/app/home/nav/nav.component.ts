import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompaniesService } from 'src/app/core/services/companies.service';
import { CompanySearchParams } from 'src/app/shared/models/company-search-params';
import { SearchTriggerService } from 'src/app/core/services/search-trigger.service';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, switchMap, tap } from 'rxjs';
import { SearchStateService } from '../search/search-state.service';
import { AccountService } from 'src/app/core/services/account.service';
import { SearchService } from 'src/app/core/services/search.service';
import { SearchResult } from 'src/app/shared/models/search';

@Component({
  selector: 'home-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  searchParams: CompanySearchParams = new CompanySearchParams();
  searchTerm = '';
  searchControl = new FormControl();
  searchResults: SearchResult[] = [];
  public showDropdown: boolean = false;

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.searchStateService.setShowDropdown(false);
    }
  }

  constructor(private companiesService: CompaniesService, private router: Router,
    private searchTriggerService: SearchTriggerService, private eRef: ElementRef,
    public searchStateService: SearchStateService, public accountService: AccountService,
    private searchService: SearchService) {
      this.searchTerm = this.searchService.getSearchTerm();
  }

  ngOnInit(): void {
    this.initSearchControl();

    this.searchStateService.showDropdown$.subscribe(show => {
      this.showDropdown = show;
    });

    this.searchStateService.searchResults$.subscribe(results => {
      if (results && results.length > 0) {
        this.searchResults = results;
        this.searchStateService.setShowDropdown(true);
      } else {
        this.searchResults = [];
        this.searchStateService.setShowDropdown(false);
      }
    });
  }

  initSearchControl() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      tap(value => {
        if (!value) {
          this.searchResults = [];
        }
      }),
      filter(value => !!value),
      switchMap(value => {
        this.searchService.setSearchTerm(value);
        return this.search(value);
      }))
    .subscribe(response => {
      this.searchStateService.setSearchResults(response);
      this.searchStateService.setShowDropdown(true);
    });
  }

  search(searchTerm: string) {
    return this.searchService.search(searchTerm);
  }

  onSearch() {
    const searchValue = this.searchControl.value;
    this.searchService.setSearchTerm(searchValue);
    this.router.navigate(['search']);
    this.searchTriggerService.triggerSearch();
  }

  onFocus() {
    this.searchStateService.searchResults$.subscribe(results => {
      if (results && results.length > 0) {
        this.searchResults = results;
        this.searchStateService.setShowDropdown(true);
      } else {
        this.searchResults = [];
        this.searchStateService.setShowDropdown(false);
      }
    });
  }

  hideDropdown() {
    this.searchStateService.setShowDropdown(false);
  }

  navigateToCompany(ticker: string) {
    this.router.navigate(['company/' + ticker]);
  }

}
