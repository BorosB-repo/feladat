import {
  ChangeDetectionStrategy,
  Component, OnDestroy,
  OnInit,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HotelService} from '../../core/services/hotel.service';
import {HotelModel} from '../../shared/models/hotel.model';
import {SharedModule} from '../../shared/modules/shared.module';
import {BehaviorSubject, combineLatestWith, Observable, Subject, switchMap, takeUntil, takeWhile, tap} from 'rxjs';
import {IFetchData} from '../../shared/interfaces/fetch-data.interface';
import {SettingsEnum} from '../../core/enums/settings.enum';
import {Router, RouterModule} from '@angular/router';
import {Util} from '../../shared/classes/util';

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
    HotelService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelListComponent implements OnInit, OnDestroy {
  hotels$: BehaviorSubject<HotelModel[]> = new BehaviorSubject<HotelModel[]>([]);
  page: number = 1;
  gotAllData: boolean = false;
  dataFetcher$: BehaviorSubject<IFetchData> =
    new BehaviorSubject<IFetchData>({
      page: this.page,
      pageSize: SettingsEnum.PAGE_SIZE
    });

  destroyed$: Subject<void> = new Subject<void>();

  constructor(
    private readonly router: Router,
    public dataService: HotelService
  ) {
  }

  private loadData() {


    this.dataFetcher$
      .pipe(
        takeUntil(this.destroyed$),
        takeWhile(() => !this.gotAllData),
        switchMap(value => this.dataService.getList(value.page, value.pageSize))
      )
      .subscribe(response => {
        if (response.success && Array.isArray(response.data)) {
          this.hotels$.next([...this.hotels$.getValue(), ...response.data])
          this.gotAllData = this.hotels$.getValue().length === response.totalCount;
        }
      });
  }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }


  $asModel(value: any): HotelModel {
    return value as HotelModel;
  }

  fetchData(): void {
    this.page += 1;
    this.dataFetcher$.next({page: this.page, pageSize: SettingsEnum.PAGE_SIZE})
  }

  onClickEditHotel(hotel: HotelModel): void {
    this.router.navigate(['/hotel-editor', hotel.id]);
  }

  onScroll(container: HTMLElement) {
    const loader = container.querySelector('.loader');
    if (!loader) {
      return;
    }

    if (Util.isElementInViewPort(loader)) {
      this.fetchData();
    }
  }

}
