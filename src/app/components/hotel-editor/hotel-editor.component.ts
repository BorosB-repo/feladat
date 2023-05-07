import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HotelModel} from '../../shared/models/hotel.model';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {DataService} from '../../core/services/data.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

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
    cost: [null, [Validators.required, Validators.min(0) ]],
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

  ngOnInit(): void {
    this.getHotel();
  }

  private getHotel() {
    const hotelId = this.route.snapshot.params['id'];
    this.dataService.getHotel(hotelId).subscribe({
      next: model => {
        this.hotel = model;
      }
    })

  }

  onClickSave() {
    if (!this.formGroup.valid) {
      return;
    }
  }

  onClickBack() {
    this.router.navigate(['hotel-list']);
  }
}
