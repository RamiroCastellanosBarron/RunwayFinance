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

  constructor(private companiesService: CompaniesService, private router: Router,
    private route: ActivatedRoute) {

    }

  ngOnInit(): void {
    
  }

  loadCompanies() {

  }

  loadFullCompanies() {

  }

  loadRealtimeStockPrice(company: Company) {

  }

  searchTechnology() {

  }
  searchHealth() {

  }
  searchEnergy() {

  }
  searchIndustrial() {

  }
  searchTelecom() {

  }
  searchConsumerStaples() {

  }
  searchRealEstate() {

  }

  setQueryParams() {

  }

}
