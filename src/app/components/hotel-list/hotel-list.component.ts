import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataService} from '../../core/services/data.service';
import {HotelModel} from '../../shared/models/hotel.model';
import {SharedModule} from '../../shared/modules/shared.module';
import {BehaviorSubject, switchMap} from 'rxjs';
import {IFetchData} from '../../shared/interfaces/fetch-data.interface';
import {SettingsEnum} from '../../core/enums/settings.enum';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  providers: [
    DataService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelListComponent implements OnInit {
  hotelList: HotelModel[] = [];
  page: number = 1;
  gotAllData: boolean;
  dataFetcher: BehaviorSubject<IFetchData> =
    new BehaviorSubject<IFetchData>({
      page: this.page,
      pageSize: SettingsEnum.PAGE_SIZE
    });

  constructor(
    public dataService: DataService,
    private readonly router: Router
  ) {
  }
  private setDataSubscription() {
    this.dataFetcher.pipe(
      switchMap(value => {
        return this.dataService.getHotelList(value.page, value.pageSize)
      })
    ).subscribe({
      next: value => {
        this.hotelList.push(...value);
        this.gotAllData = this.hotelList.length === SettingsEnum.MAX_DATA_AMOUNT;
      }
    });
  }

  ngOnInit(): void {
    this.setDataSubscription();
  }


  asModel(value: any): HotelModel {
    return value as HotelModel;
  }

  fetchData(): void {
    if (this.gotAllData) {
      return;
    }

    this.page += 1;
    this.dataFetcher.next({page: this.page, pageSize: SettingsEnum.PAGE_SIZE})
  }

  @HostListener('window:scroll')
  onScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.fetchData();
    }
  }

  onClickEditHotel(hotel: HotelModel): void {
    this.router.navigate(['/hotel-editor', hotel.id]);
  }
}
