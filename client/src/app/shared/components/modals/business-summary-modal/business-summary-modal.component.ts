import { Component, Input } from '@angular/core';
import { Company } from 'src/app/shared/models/company';

@Component({
  selector: 'app-business-summary-modal',
  templateUrl: './business-summary-modal.component.html',
  styleUrls: ['./business-summary-modal.component.scss']
})
export class BusinessSummaryModalComponent {
  @Input() company: Company = {} as Company;
}
