import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFlashsaleComponent } from './view-flashsale.component';

describe('ViewFlashsaleComponent', () => {
  let component: ViewFlashsaleComponent;
  let fixture: ComponentFixture<ViewFlashsaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFlashsaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFlashsaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
