import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeOrderEmployeeComponent } from './change-order-employee.component';

describe('ChangeOrderEmployeeComponent', () => {
  let component: ChangeOrderEmployeeComponent;
  let fixture: ComponentFixture<ChangeOrderEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeOrderEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeOrderEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
