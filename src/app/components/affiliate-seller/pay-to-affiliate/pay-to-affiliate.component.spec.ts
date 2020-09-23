import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayToAffiliateComponent } from './pay-to-affiliate.component';

describe('PayToAffiliateComponent', () => {
  let component: PayToAffiliateComponent;
  let fixture: ComponentFixture<PayToAffiliateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayToAffiliateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayToAffiliateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
