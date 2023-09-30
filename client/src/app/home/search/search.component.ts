import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompaniesService } from 'src/app/core/services/companies.service';
import { SearchTriggerService } from 'src/app/core/services/search-trigger.service';
import { CompanySearchParams } from 'src/app/shared/models/company-search-params';
import { CompanySummary } from 'src/app/shared/models/company-summary';
import { Pagination } from 'src/app/shared/models/pagination';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  companies?: CompanySummary[];
  pagination?: Pagination;
  searchParams: CompanySearchParams = new CompanySearchParams();
  private searchTriggerSubscription?: Subscription;

  constructor(private route: ActivatedRoute, private companiesService: CompaniesService,
    private searchTriggerService: SearchTriggerService) {
    this.searchParams = this.companiesService.getParams();
  }

  ngOnDestroy() {
    this.searchTriggerSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    // this.search();
    this.searchTriggerSubscription = this.searchTriggerService.triggerSearch$.subscribe(() => {
      this.search();
    });
  }

  onPageChanged(event: any) {
    const params = this.companiesService.getParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.companiesService.setParams(params);
      this.searchParams = params;
      this.search();
    }
  }

  search() {
    if (this.searchParams.search !== '') {
      this.companiesService.searchCompanies(this.companiesService.getParams()).subscribe({
        next: response => {
          if (response.result && response.pagination) {
            this.companies = response.result;
            this.pagination = response.pagination;
          }
        }
      });
    }
  }

}
