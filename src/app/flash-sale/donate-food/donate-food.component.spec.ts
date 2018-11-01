import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonateFoodComponent } from './donate-food.component';

describe('DonateFoodComponent', () => {
  let component: DonateFoodComponent;
  let fixture: ComponentFixture<DonateFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
