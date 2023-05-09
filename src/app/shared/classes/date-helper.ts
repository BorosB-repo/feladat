import * as moment from 'moment';

export class DateHelper {
  public static dateToFormat(date: Date, format: string): string {
    return moment(date).format(format);
  }
}
