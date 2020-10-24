import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrayerBoxComponent } from './prayer-box.component';

describe('PrayerBoxComponent', () => {
  let component: PrayerBoxComponent;
  let fixture: ComponentFixture<PrayerBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrayerBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrayerBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
