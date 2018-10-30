import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EthyleneReportComponent } from './ethylene-report.component';

describe('EthyleneReportComponent', () => {
  let component: EthyleneReportComponent;
  let fixture: ComponentFixture<EthyleneReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EthyleneReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EthyleneReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
