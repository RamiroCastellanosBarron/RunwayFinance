import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CompaniesService } from 'src/app/core/services/companies.service';
import { Company } from 'src/app/shared/models/company';
import { CompanySearchParams } from 'src/app/shared/models/company-search-params';
import { Pagination } from 'src/app/shared/models/pagination';
import { SearchComponent } from '../search/search.component';
import { SearchTriggerService } from 'src/app/core/services/search-trigger.service';

@Component({
  selector: 'home-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @ViewChild('search') searchTerm?: ElementRef;
  searchParams: CompanySearchParams = new CompanySearchParams();
  @ViewChild(SearchComponent) searchComponent?: SearchComponent;

  constructor(private companiesService: CompaniesService, private router: Router,
    private searchTriggerService: SearchTriggerService) {
    this.searchParams = this.companiesService.getParams();
  }

  onSearch() {
    const searchValue = this.searchTerm?.nativeElement.value;
    this.searchParams.search = searchValue;
    this.companiesService.setParams(this.searchParams);
    console.log(this.searchParams);
    this.router.navigate(['search']);
    this.searchTriggerService.triggerSearch();
  }

}
