import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'invoice'
})
export class InvoicePipe implements PipeTransform {

  transform(value: number, first: number, second: number): string {
    const str = value.toString().split('');
    str[first] = ' ';
    str[str.length - second] = '-';
    return str.join('');
  }
}
