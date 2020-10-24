import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuranBoxComponent } from './quran-box.component';

describe('QuranBoxComponent', () => {
  let component: QuranBoxComponent;
  let fixture: ComponentFixture<QuranBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuranBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuranBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
