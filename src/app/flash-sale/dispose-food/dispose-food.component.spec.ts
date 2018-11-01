import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposeFoodComponent } from './dispose-food.component';

describe('DisposeFoodComponent', () => {
  let component: DisposeFoodComponent;
  let fixture: ComponentFixture<DisposeFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisposeFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisposeFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
