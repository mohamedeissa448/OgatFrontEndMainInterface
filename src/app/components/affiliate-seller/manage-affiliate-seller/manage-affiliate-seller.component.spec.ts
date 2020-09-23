import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAffiliateSellerComponent } from './manage-affiliate-seller.component';

describe('ManageAffiliateSellerComponent', () => {
  let component: ManageAffiliateSellerComponent;
  let fixture: ComponentFixture<ManageAffiliateSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAffiliateSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAffiliateSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
