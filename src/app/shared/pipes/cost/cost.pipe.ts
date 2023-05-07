import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cost'
})
export class CostPipe implements PipeTransform {

  transform(value: number, divider: string = ' '): string {
    return this.applyDivider(value, divider) + ' Ft /fő/éj';
  }

  private applyDivider(num: number = 12345678910, divider: string): string {
    const revertedCharacters: string[] = num.toString().split('').reverse();
    const divided: string[] = [];

    revertedCharacters.forEach((char, index) => {
      if (index > 0 && index % 3 === 0) {
        divided.push(divider)
      }
      divided.push(char);
    });

    return divided.reverse().join('');
  }
}
