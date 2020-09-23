import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingCompanyFormComponent } from './shipping-company-form.component';

describe('ShippingCompanyFormComponent', () => {
  let component: ShippingCompanyFormComponent;
  let fixture: ComponentFixture<ShippingCompanyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingCompanyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingCompanyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
