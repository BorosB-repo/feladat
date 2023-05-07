import {Model} from './model';

export class HotelModel extends Model<HotelModel> {
  name: string;
  seasonallyOpenFrom: Date;
  seasonallyOpenTill: Date;
  pictureUrl: string;
  cost: number;
  isDeleted: boolean;

  constructor(config: Partial<HotelModel>) {
    super(config);
  }

}
