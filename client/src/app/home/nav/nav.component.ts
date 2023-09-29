import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CompaniesService } from 'src/app/core/services/companies.service';
import { Company } from 'src/app/shared/models/company';
import { CompanySearchParams } from 'src/app/shared/models/company-search-params';
import { Pagination } from 'src/app/shared/models/pagination';

@Component({
  selector: 'home-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  companies?: Company[];
  pagination?: Pagination;

  constructor(private companiesService: CompaniesService, private router: Router) {}

  ngOnInit(): void {

  }

  onSearch() {
    const searchValue = this.searchTerm?.nativeElement.value;
    this.router.navigate(['search'], { queryParams: { q: searchValue } });
    // const params = new CompanySearchParams();

    // params.search = this.searchTerm?.nativeElement.value;

    // this.companiesService.getCompanies(params).subscribe({
    //   next: response => {
    //     if (response.result && response.pagination) {
    //       this.companies = response.result;
    //       this.pagination = response.pagination;
    //     }
    //   }
    // })
  }

}
