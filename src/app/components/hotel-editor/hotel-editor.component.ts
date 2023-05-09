import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HotelModel} from '../../shared/models/hotel.model';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {DataService} from '../../core/services/data.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {DateHelper} from '../../shared/classes/date-helper';
import {dateRangeValidator} from '../../shared/validators/date-range.validator';


@Component({
  selector: 'app-hotel-editor',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './hotel-editor.component.html',
  styleUrls: ['./hotel-editor.component.scss'],
  providers: [
    DataService
  ]
})
export class HotelEditorComponent implements OnInit {
  hotel: HotelModel;
  formGroup: FormGroup = this.fb.group({
    cost: [null, [Validators.required, Validators.min(0)]],
    seasonallyOpenFrom: [null, [Validators.required]],
    seasonallyOpenTill: [null, [Validators.required]]
  })

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly dataService: DataService,
    private readonly fb: FormBuilder
  ) {

  }

  private getHotel() {
    const hotelId = this.route.snapshot.params['id'];
    this.dataService.getHotel(hotelId).subscribe({
      next: model => {
        this.hotel = model;
        this.patchValue(model);
      }
    })
  }

  private patchValue(hotel: HotelModel) {
    this.formGroup.patchValue(hotel);
    Object.keys(this.formGroup.controls).forEach( controlName => {
      const control = this.formGroup.controls[controlName];
      if (control.value instanceof Date) {
        control.patchValue(DateHelper.dateToFormat(control.value, 'YYYY-MM-DD'))
      }
    })
  }

  ngOnInit(): void {
    this.getHotel();
    this.formGroup.addValidators(dateRangeValidator('seasonallyOpenFrom', 'seasonallyOpenTill'))

    this.formGroup.valueChanges.subscribe(console.log)
  }

  onClickSave() {
    if (!this.formGroup.valid) {
      return;
    }

    const newValues: Partial<HotelModel> = {
      cost: this.formGroup.controls['cost'].value,
      seasonallyOpenTill: new Date(this.formGroup.controls['seasonallyOpenTill'].value),
      seasonallyOpenFrom: new Date(this.formGroup.controls['seasonallyOpenFrom'].value)
    }
    this.dataService.saveHotel(this.hotel.id, newValues).subscribe(res => {
      if (res.success) {
        this.router.navigate(['hotel-list'])
      }
    })
  }

  onClickBack() {
    this.router.navigate(['hotel-list']);
  }


}
