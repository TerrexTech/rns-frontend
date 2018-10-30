import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlashsaleComponent } from './add-flashsale.component';

describe('AddFlashsaleComponent', () => {
  let component: AddFlashsaleComponent;
  let fixture: ComponentFixture<AddFlashsaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFlashsaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFlashsaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
