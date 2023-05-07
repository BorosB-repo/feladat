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

}
