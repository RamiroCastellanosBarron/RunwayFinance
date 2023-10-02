import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CompaniesService } from 'src/app/core/services/companies.service';
import { Company } from 'src/app/shared/models/company';
import { RealtimeStockPrice } from 'src/app/shared/models/realtime-stock-price';
import { ApiResponseSecurityStockPrices, SecurityStockPricesParams } from 'src/app/shared/models/stock-prices-by-security';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  id: string;
  company?: Company;
  stockPrice?: RealtimeStockPrice;
  securityStockPrices?: ApiResponseSecurityStockPrices;

  constructor(private companiesService: CompaniesService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
      this.loadCompany();
    });
  }

  loadCompany() {
    return this.companiesService.getCompany(this.id).subscribe({
      next: company => {
        this.company = company;
        this.loadRealtimeStockPrice(this.company);
        this.loadStockPricesBySecurity(this.company);
      }
    })
  }

  loadRealtimeStockPrice(company: Company) {
    return this.companiesService.getRealtimeStockPrice(company.ticker).subscribe({
      next: response => {
        this.stockPrice = response;
      }
    })
  }

  loadStockPricesBySecurity(company: Company) {
    const today = new Date();
    const oneDayAgo = new Date(today);
    const twoDaysAgo = new Date(today);

    oneDayAgo.setDate(today.getDate() - 1);
    twoDaysAgo.setDate(today.getDate() - 3);

    const oneDayAgoStr = oneDayAgo.toISOString().split('T')[0];
    const twoDaysAgoStr = twoDaysAgo.toISOString().split('T')[0];

    const params = new SecurityStockPricesParams(
      company.ticker,
      twoDaysAgoStr,
      oneDayAgoStr,
      'daily'
    );

    this.companiesService.getStockPricesBySecurity(params).subscribe({
      next: response => {
        this.securityStockPrices = response;
      }
    })
  }

}
