import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashSaleReportComponent } from './flash-sale-report.component';

describe('FlashSaleReportComponent', () => {
  let component: FlashSaleReportComponent;
  let fixture: ComponentFixture<FlashSaleReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashSaleReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashSaleReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
