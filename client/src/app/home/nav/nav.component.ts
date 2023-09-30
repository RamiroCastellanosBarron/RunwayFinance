import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CompaniesService } from 'src/app/core/services/companies.service';
import { Company } from 'src/app/shared/models/company';
import { CompanySearchParams } from 'src/app/shared/models/company-search-params';
import { PaginatedResult, Pagination } from 'src/app/shared/models/pagination';
import { SearchComponent } from '../search/search.component';
import { SearchTriggerService } from 'src/app/core/services/search-trigger.service';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, switchMap, tap } from 'rxjs';
import { CompanySummary } from 'src/app/shared/models/company-summary';
import { SearchStateService } from '../search/search-state.service';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'home-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  searchParams: CompanySearchParams = new CompanySearchParams();
  searchControl = new FormControl();
  searchResults: CompanySummary[] = [];
  public showDropdown: boolean = false;

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.searchStateService.setShowDropdown(false);
    }
  }

  constructor(private companiesService: CompaniesService, private router: Router,
    private searchTriggerService: SearchTriggerService, private eRef: ElementRef,
    public searchStateService: SearchStateService, public accountService: AccountService) {
    this.searchParams = this.companiesService.getParams();
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
        const params = this.companiesService.getParams();
        params.search = value;
        this.companiesService.setParams(params);
        return this.search(params);
      }))
    .subscribe(response => {
      if (response.pagination && response.result) {
        this.searchStateService.setSearchResults(response.result);
        this.searchStateService.setShowDropdown(true);
      }
    });
  }

  search(companySearchParams: CompanySearchParams) {
    return this.companiesService.searchCompanies(companySearchParams);
  }

  onSearch() {
    const searchValue = this.searchControl.value;
    this.searchParams.search = searchValue;
    this.companiesService.setParams(this.searchParams);
    console.log(this.searchParams);
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

  navigateToCompany(company: CompanySummary) {
    this.router.navigate(['company/' + company.ticker]);
  }

}
