import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignOrderToEmployeeComponent } from './assign-order-to-employee.component';

describe('AssignOrderToEmployeeComponent', () => {
  let component: AssignOrderToEmployeeComponent;
  let fixture: ComponentFixture<AssignOrderToEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignOrderToEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignOrderToEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
