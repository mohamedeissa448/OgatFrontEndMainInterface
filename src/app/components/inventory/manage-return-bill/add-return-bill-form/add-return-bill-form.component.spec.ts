import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReturnBillFormComponent } from './add-return-bill-form.component';

describe('AddReturnBillFormComponent', () => {
  let component: AddReturnBillFormComponent;
  let fixture: ComponentFixture<AddReturnBillFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReturnBillFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReturnBillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
