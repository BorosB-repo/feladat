import {Injectable} from '@angular/core';
import {catchError, map, Observable, of} from 'rxjs';
import {HotelModel} from '../../shared/models/hotel.model';
import {NotSoDatabaseService} from './not-so-database.service';
import {IResponse} from '../../shared/interfaces/response.interface';

@Injectable()
export class HotelService {

  getList(page: number = 1, pageSize: number = 1000): Observable<HotelModel[]> {
    const from = (page - 1) * pageSize;
    const limit = page * pageSize;

    return of(NotSoDatabaseService.rawData.slice(from, limit)).pipe(
      map(rawData => rawData.map(data => new HotelModel(data)))
    )
  }

  get(id: string): Observable<HotelModel> {
    return of(NotSoDatabaseService.rawData.find(data => data.id === id)).pipe(
      map(value => {
        if (!value) {
          throw Error(`Can't find hotel with '${id}' id`);
        }

        return new HotelModel(value);
      })
    )
  }

  put(id: string, data: Partial<HotelModel>): Observable<IResponse<HotelModel>> {
    return of(null).pipe(
      map(() => {
        const hotel = NotSoDatabaseService.rawData.find(data => data.id === id);

        if (!hotel) {
          throw new Error(`Cannot find rawata with ${id} id`);
        }

        return hotel;
      }),
      map(hotel => {
        Object.assign(hotel, data);

        return {
          success: true,
          data: new HotelModel(hotel)
        }
      }),
      catchError(e => {
        return of({
          success: false,
          data: null
        })
      })
    )
  }

  delete(id: string): Observable<IResponse<HotelModel>> {
    return of(null).pipe(
      map(() => {
        const rawDataIndex = NotSoDatabaseService.rawData.findIndex(data => data.id === id);

        if (-1 === rawDataIndex) {
          throw new Error(`Cannot find rawata with ${id} id`);
        }

        return rawDataIndex;
      }),
      map(rawDataIndex => {
        NotSoDatabaseService.rawData.splice(rawDataIndex, 1);

        return {
          success: true,
          data: null
        }
      }),
      catchError(e => {
        return of({
          success: false,
          data: null
        });
      })
    )
  }
}
