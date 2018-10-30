import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { EthyleneComponent } from './ethylene.component'

describe('EthyleneComponent', () => {
  let component: EthyleneComponent
  let fixture: ComponentFixture<EthyleneComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EthyleneComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(EthyleneComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
