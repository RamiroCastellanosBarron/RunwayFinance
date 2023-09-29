import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchTriggerService {
  private triggerSearchSource = new Subject<void>();
  triggerSearch$ = this.triggerSearchSource.asObservable();

  triggerSearch() {
    this.triggerSearchSource.next();
  }
}
