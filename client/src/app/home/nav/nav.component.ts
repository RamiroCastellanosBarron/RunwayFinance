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

  constructor(private companiesService: CompaniesService, private router: Router,
    private searchTriggerService: SearchTriggerService, private eRef: ElementRef,
    public searchStateService: SearchStateService, public accountService: AccountService) {

  }

  ngOnInit(): void {

  }

  initSearchControl() {

  }

  search() {

  }

  onSearch() {

  }

  onFocus() {

  }

  hideDropdown() {

  }

  navigateToCompany() {

  }

}
