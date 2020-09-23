import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageShippingCompanyComponent } from './manage-shipping-company.component';

describe('ManageShippingCompanyComponent', () => {
  let component: ManageShippingCompanyComponent;
  let fixture: ComponentFixture<ManageShippingCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageShippingCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageShippingCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
