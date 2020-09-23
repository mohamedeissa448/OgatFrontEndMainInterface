import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateSellerFormComponent } from './affiliate-seller-form.component';

describe('AffiliateSellerFormComponent', () => {
  let component: AffiliateSellerFormComponent;
  let fixture: ComponentFixture<AffiliateSellerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffiliateSellerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliateSellerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
