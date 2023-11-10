import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompaniesService } from 'src/app/core/services/companies.service';
import { EndOfDayService } from 'src/app/core/services/end-of-day.service';
import { AllCompanies, AllCompaniesParams } from 'src/app/shared/models/all-companies';
import { Company } from 'src/app/shared/models/company';
import { EndOfDay, EndOfDayMeta } from 'src/app/shared/models/end-of-day';
import { SecurityStockPricesParams } from 'src/app/shared/models/stock-prices-by-security';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private companiesService: CompaniesService, private router: Router,
    private route: ActivatedRoute, private endOfDayService: EndOfDayService) {

    }

  companyTickersForInitLoad = [
    'AAPL', 'MSFT', 'DIS', 'DELL', 'XOM'
  ]

  techTickers = [ 'AAPL', 'MSFT', 'GOOGL', 'META', 'NVDA' ];
  healthTickers = ['JNJ', 'MRK', 'PFE', 'ABBV', 'AMGN' ];
  energyTickers = [ 'XOM', 'CVX', 'COP', 'BP', 'TTFNF' ];
  industrialTickers = [ 'GE', 'MMM', 'HON', 'CAT', 'BA' ];
  telecomTickers = [ 'VZ', 'T', 'TMUS', 'ORAN', 'CHTR' ];
  staplesTickers = [ 'KO', 'PEP', 'PG', 'WMT', 'CL' ];
  realEstateTickers = [ 'AMT', 'CCI', 'SPG', 'O', 'WELL' ];

  endOfDays: EndOfDay[] = [];
  endOfDayMetas: EndOfDayMeta[] = [];

  ngOnInit(): void {
    this.loadCompanies(this.companyTickersForInitLoad);
  }

  loadCompanies(companies: string[]) {
    this.endOfDays = [];
    this.endOfDayMetas = [];
    for(const company of companies) {
      console.log(company);

      this.endOfDayService.getEndOfDay(company).subscribe({
        next: response => {
          console.log(response);

          this.endOfDays.push(response[0]);
        }
      })
      this.endOfDayService.getEndOfDayMeta(company).subscribe({
        next: response => {
          console.log(response);

          this.endOfDayMetas.push(response);
        }
      })
    }
    console.log(this.endOfDays);
    console.log(this.endOfDayMetas);
  }

  loadFullCompanies() {

  }

  loadRealtimeStockPrice(company: Company) {

  }

  searchTechnology() {
    this.loadCompanies(this.techTickers);
  }
  searchHealth() {
    this.loadCompanies(this.healthTickers);
  }
  searchEnergy() {
    this.loadCompanies(this.energyTickers);
  }
  searchIndustrial() {
    this.loadCompanies(this.industrialTickers);
  }
  searchTelecom() {
    this.loadCompanies(this.telecomTickers);
  }
  searchConsumerStaples() {
    this.loadCompanies(this.staplesTickers);
  }
  searchRealEstate() {
    this.loadCompanies(this.realEstateTickers);
  }

  setQueryParams() {

  }

}
