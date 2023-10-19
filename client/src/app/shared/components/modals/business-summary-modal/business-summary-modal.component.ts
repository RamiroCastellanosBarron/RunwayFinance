import { Component, Input } from '@angular/core';
import { Company } from 'src/app/shared/models/company';
import { EndOfDayMeta } from 'src/app/shared/models/end-of-day';
import { Meta } from 'src/app/shared/models/fundamentals';

@Component({
  selector: 'app-business-summary-modal',
  templateUrl: './business-summary-modal.component.html',
  styleUrls: ['./business-summary-modal.component.scss']
})
export class BusinessSummaryModalComponent {
  @Input() meta: Meta = {} as Meta;
  @Input() endOfDayMeta!: EndOfDayMeta;

}
