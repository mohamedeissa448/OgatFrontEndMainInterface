import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingCompanyContractComponent } from './shipping-company-contract.component';

describe('ShippingCompanyContractComponent', () => {
  let component: ShippingCompanyContractComponent;
  let fixture: ComponentFixture<ShippingCompanyContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingCompanyContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingCompanyContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
