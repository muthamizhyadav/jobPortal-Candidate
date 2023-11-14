import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gstCurrency',
})
export class GstCurrencyPipe implements PipeTransform {
  transform(amount: number, gstRate: number): string {
    if (isNaN(amount) || isNaN(gstRate) || amount < 0 || gstRate < 0) {
      return 'Invalid input';
    }

    const gstAmount = (amount * gstRate) / 100;
    const totalAmount = amount + gstAmount;

    return totalAmount.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
    }); // Change the currency and locale as needed
  }
}
