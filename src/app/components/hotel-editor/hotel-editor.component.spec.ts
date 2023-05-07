import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelEditorComponent } from './hotel-editor.component';

describe('EditorComponent', () => {
  let component: HotelEditorComponent;
  let fixture: ComponentFixture<HotelEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HotelEditorComponent]
    });
    fixture = TestBed.createComponent(HotelEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
