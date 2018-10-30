import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemphumidReportComponent } from './temphumid-report.component';

describe('TemphumidReportComponent', () => {
  let component: TemphumidReportComponent;
  let fixture: ComponentFixture<TemphumidReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemphumidReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemphumidReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
