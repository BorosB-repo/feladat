import {Injectable} from '@angular/core';
import {HotelModel} from '../../shared/models/hotel.model';
import {SettingsEnum} from '../enums/settings.enum';

@Injectable({
  providedIn: 'root'
})
export class NotSoDatabaseService {
  static rawData: Partial<HotelModel>[] = [];

  constructor() {
    this.generateData(SettingsEnum.MAX_DATA_AMOUNT);
  }

  private generateData(amount: number) {
    for (let i = 1; i <= amount; i++) {
      NotSoDatabaseService.rawData.push({
        id: `id_${i}`,
        pictureUrl: this.randomPictureUrl,
        cost: this.getRandomNumber(),
        name: `Hotel neve_${i}`,
        isDeleted: false,
        seasonallyOpenFrom: new Date(2023, 5,1),
        seasonallyOpenTill: new Date(2023, 6,30)
      })
    }
  }

  private get randomPictureUrl(): string {
    // Ha már szállás...
    const num = this.getRandomNumber(1, 5);
    switch (num) {
      case 1: return 'https://images.szallas.hu/hotels/474503/500x500/37636888.jpg'
      case 2: return 'https://images.szallas.hu/hotels/468073/500x500/36522155.jpg'
      case 3: return 'https://images.szallas.hu/hotels/473602/500x500/3038758.jpg'
      case 4: return 'https://images.szallas.hu/hotels/751268/500x500/38337537.jpg'
      case 5: return 'https://images.szallas.hu/hotels/1422467/500x500/37854954.jpg'
      default: throw Error(`no pic url for this number: ${num}`)
    }
  }

  private getRandomNumber(min: number = 10000, max: number = 500000): number {
      return Math.floor(Math.random() * (max - min + 1) + min)
  }
}
