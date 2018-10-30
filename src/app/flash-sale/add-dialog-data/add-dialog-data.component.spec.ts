import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDialogDataComponent } from './add-dialog-data.component';

describe('DialogDataComponent', () => {
  let component: AddDialogDataComponent;
  let fixture: ComponentFixture<AddDialogDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddDialogDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDialogDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
