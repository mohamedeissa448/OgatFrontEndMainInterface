import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateSellerContactComponent } from './affiliate-seller-contact.component';

describe('AffiliateSellerContactComponent', () => {
  let component: AffiliateSellerContactComponent;
  let fixture: ComponentFixture<AffiliateSellerContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffiliateSellerContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliateSellerContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
