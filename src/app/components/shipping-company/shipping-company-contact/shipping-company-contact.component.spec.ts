import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingCompanyContactComponent } from './shipping-company-contact.component';

describe('ShippingCompanyContactComponent', () => {
  let component: ShippingCompanyContactComponent;
  let fixture: ComponentFixture<ShippingCompanyContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingCompanyContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingCompanyContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
