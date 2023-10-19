import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {

  transform(value: any, displayCurrency?: boolean): string {
    let suffix: string;
    let divisor: number;
    let formattedValue: string;
    let currency = displayCurrency ? ' USD' : '';

    if (value >= 1e12) {
      suffix = 'T';
      divisor = 1e12;
    } else if (value >= 1e9) {
      suffix = 'B';
      divisor = 1e9;
    } else if (value >= 1e6) {
      suffix = 'M';
      divisor = 1e6;
    } else {
      return value.toString();
    }

    formattedValue = (value / divisor).toFixed(2);
    return `${formattedValue} ${suffix}${currency}`;
  }

}
