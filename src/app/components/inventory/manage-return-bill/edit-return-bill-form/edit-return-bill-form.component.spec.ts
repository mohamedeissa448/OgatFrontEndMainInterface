import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReturnBillFormComponent } from './edit-return-bill-form.component';

describe('EditReturnBillFormComponent', () => {
  let component: EditReturnBillFormComponent;
  let fixture: ComponentFixture<EditReturnBillFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReturnBillFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReturnBillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
