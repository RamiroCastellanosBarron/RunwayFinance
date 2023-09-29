import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompaniesService } from 'src/app/core/services/companies.service';
import { Company } from 'src/app/shared/models/company';
import { CompanySearchParams } from 'src/app/shared/models/company-search-params';
import { CompanySummary } from 'src/app/shared/models/company-summary';
import { Pagination } from 'src/app/shared/models/pagination';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  companies?: CompanySummary[];
  pagination?: Pagination;
  searchParams: CompanySearchParams = new CompanySearchParams();

  constructor(private route: ActivatedRoute, private companiesService: CompaniesService) {
    this.searchParams = this.companiesService.getParams();
    this.route.queryParams.subscribe({
      next: params => {
        this.searchParams.search = params['q'];
        this.companiesService.setParams(this.searchParams);
      }
    })
  }

  ngOnInit(): void {
    this.search();
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
    const parameters = this.companiesService.getParams();
    console.log(parameters);
    this.companiesService.getCompanies(this.companiesService.getParams()).subscribe({
      next: response => {
        if (response.result && response.pagination) {
          this.companies = response.result;
          this.pagination = response.pagination;
        }
      }
    });
  }

}
