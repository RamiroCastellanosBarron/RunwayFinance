import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompaniesService } from 'src/app/core/services/companies.service';
import { AllCompanies, AllCompaniesParams } from 'src/app/shared/models/all-companies';
import { Company } from 'src/app/shared/models/company';
import { SecurityStockPricesParams } from 'src/app/shared/models/stock-prices-by-security';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  allCompaniesParams: AllCompaniesParams = new AllCompaniesParams();
  allCompanies: AllCompanies[] = [];
  companies: Company[] = [];

  constructor(private companiesService: CompaniesService, private router: Router,
    private route: ActivatedRoute) {
    this.allCompaniesParams = this.companiesService.getAllCompaniesParams();
    this.route.queryParams.subscribe({
      next: params => {
        if(!params['industry']) {
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { industry: this.allCompaniesParams.industryCategory },
            queryParamsHandling: 'merge'
          })
        } else {
          const parameters = this.companiesService.getAllCompaniesParams();
          parameters.industryCategory = params['industry'];
          this.companiesService.setAllCompaniesParams(parameters);
        }
      }
    })
  }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies() {
    this.companies = [];
    const params = this.companiesService.getAllCompaniesParams();
    this.companiesService.getAllCompanies(params).subscribe({
      next: response => {
        if (response.result && response.pagination) {
          this.allCompanies = response.result;
          this.loadFullCompanies(this.allCompanies);
        }
      }
    })
  }

  loadFullCompanies(allCompanies: AllCompanies[]) {
    allCompanies.forEach(x => {
      this.companiesService.getCompany(x.id).subscribe({
        next: company => {
          this.loadRealtimeStockPrice(company).subscribe({
            next: response => {
              company.stockPrice = response;
            }
          })
          this.companies.push(company);
        }
      })
    })
  }

  loadRealtimeStockPrice(company: Company) {
    return this.companiesService.getRealtimeStockPrice(company.ticker);
  }

  searchTechnology() {
    this.allCompaniesParams.industryCategory = 'Computer Hardware';
    this.setQueryParams(this.allCompaniesParams.industryCategory);
    this.companiesService.setAllCompaniesParams(this.allCompaniesParams);
    this.loadCompanies();
  }
  searchHealth() {
    this.allCompaniesParams.industryCategory = 'Pharmaceutical Products';
    this.setQueryParams(this.allCompaniesParams.industryCategory);
    this.companiesService.setAllCompaniesParams(this.allCompaniesParams);
    this.loadCompanies();
  }
  searchEnergy() {
    this.allCompaniesParams.industryCategory = 'Petroleum And Natural Gas';
    this.setQueryParams(this.allCompaniesParams.industryCategory);
    this.companiesService.setAllCompaniesParams(this.allCompaniesParams);
    this.loadCompanies();
  }
  searchIndustrial() {
    this.allCompaniesParams.industryCategory = 'Electrical Equipment';
    this.setQueryParams(this.allCompaniesParams.industryCategory);
    this.companiesService.setAllCompaniesParams(this.allCompaniesParams);
    this.loadCompanies();
  }
  searchTelecom() {
    this.allCompaniesParams.industryCategory = 'Communication';
    this.setQueryParams(this.allCompaniesParams.industryCategory);
    this.companiesService.setAllCompaniesParams(this.allCompaniesParams);
    this.loadCompanies();
  }
  searchConsumerStaples() {
    this.allCompaniesParams.industryCategory = 'Consumer Goods';
    this.setQueryParams(this.allCompaniesParams.industryCategory);
    this.companiesService.setAllCompaniesParams(this.allCompaniesParams);
    this.loadCompanies();
  }
  searchRealEstate() {
    this.allCompaniesParams.industryCategory = 'Trading';
    this.setQueryParams(this.allCompaniesParams.industryCategory);
    this.companiesService.setAllCompaniesParams(this.allCompaniesParams);
    this.loadCompanies();
  }

  setQueryParams(industryCategory: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { industry: industryCategory },
      queryParamsHandling: 'merge',
    })
  }

}
