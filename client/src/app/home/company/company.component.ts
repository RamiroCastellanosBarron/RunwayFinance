import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CompaniesService } from 'src/app/core/services/companies.service';
import { Company } from 'src/app/shared/models/company';
import { RealtimeStockPrice } from 'src/app/shared/models/realtime-stock-price';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  id: string;
  company?: Company;
  stockPrice?: RealtimeStockPrice;

  constructor(private companiesService: CompaniesService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadCompany();
  }

  loadCompany() {
    return this.companiesService.getCompany(this.id).subscribe({
      next: company => {
        this.company = company;
        this.loadLastDayTrade(this.company);
      }
    })
  }

  loadLastDayTrade(company: Company) {
    return this.companiesService.getLastDayTrade(company.ticker).subscribe({
      next: response => {
        this.stockPrice = response;
      }
    })
  }

}
