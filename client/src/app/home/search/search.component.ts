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

  constructor(private route: ActivatedRoute, private companiesService: CompaniesService,
    private searchTriggerService: SearchTriggerService) {

  }

  ngOnDestroy() {

  }

  ngOnInit(): void {

  }

  onPageChanged(event: any) {

  }

  search() {

  }

}
