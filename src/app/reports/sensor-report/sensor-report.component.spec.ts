import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorReportComponent } from './sensor-report.component';

describe('SensorReportComponent', () => {
  let component: SensorReportComponent;
  let fixture: ComponentFixture<SensorReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
