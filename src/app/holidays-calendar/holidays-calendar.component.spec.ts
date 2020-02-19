import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaysCalendarComponent } from './holidays-calendar.component';

describe('HolidaysCalendarComponent', () => {
  let component: HolidaysCalendarComponent;
  let fixture: ComponentFixture<HolidaysCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidaysCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidaysCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
