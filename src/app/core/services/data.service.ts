import {Injectable} from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {HotelModel} from '../../shared/models/hotel.model';
import {NotSoDatabaseService} from './not-so-database.service';

@Injectable()
export class DataService {

  getHotelList(page: number = 1, pageSize: number = 1000): Observable<HotelModel[]> {
    const from = (page - 1) * pageSize;
    const till = page * pageSize;
    return of(NotSoDatabaseService.rawData.slice(from, till)).pipe(
      map(rawData => rawData.map(config => new HotelModel(config)))
    )
  }

  getHotel(hotelId: string): Observable<HotelModel> {
    return of(NotSoDatabaseService.rawData.find(data => data.id === hotelId)).pipe(
      map(value => {
        if (!value) {
          throw Error(`Can't find hotel with '${hotelId}' id`);
        }
        return new HotelModel(value);
      })
    )
  }
}
