import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashsaleHistoryComponent } from './flashsale-history.component';

describe('FlashsaleHistoryComponent', () => {
  let component: FlashsaleHistoryComponent;
  let fixture: ComponentFixture<FlashsaleHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashsaleHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashsaleHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
