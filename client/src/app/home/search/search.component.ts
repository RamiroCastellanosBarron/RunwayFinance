import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompaniesService } from 'src/app/core/services/companies.service';
import { SearchTriggerService } from 'src/app/core/services/search-trigger.service';
import { SearchService } from 'src/app/core/services/search.service';
import { SearchResult } from 'src/app/shared/models/search';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchResults?: SearchResult[];
  private searchTriggerSubscription?: Subscription;
  searchTerm = '';

  constructor(private route: ActivatedRoute, private companiesService: CompaniesService,
    private searchTriggerService: SearchTriggerService, private searchService: SearchService) {
    this.searchTerm = this.searchService.getSearchTerm();
  }

  ngOnDestroy() {
    this.searchTriggerSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.searchTriggerSubscription = this.searchTriggerService.triggerSearch$.subscribe(() => {
      this.search();
    });
  }

  search() {
    if (this.searchTerm !== '') {
      this.searchService.search(this.searchTerm).subscribe({
        next: response => {
          console.log(response);

          this.searchResults = response;
        }
      });
    }
  }
}
