import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPaymentFormComponent } from './supplier-payment-form.component';

describe('SupplierPaymentFormComponent', () => {
  let component: SupplierPaymentFormComponent;
  let fixture: ComponentFixture<SupplierPaymentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierPaymentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierPaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
