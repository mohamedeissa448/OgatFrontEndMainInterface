import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingFormComponent } from './shipping-form.component';

describe('OrderShippingFormComponent', () => {
  let component: ShippingFormComponent;
  let fixture: ComponentFixture<ShippingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
