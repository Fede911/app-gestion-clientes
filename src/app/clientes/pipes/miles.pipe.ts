import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'miles'
})
export class MilesPipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) {

  }
  transform(value: any, digits?: any): any {
    // return this.decimalPipe.transform(value, digits)
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

}
