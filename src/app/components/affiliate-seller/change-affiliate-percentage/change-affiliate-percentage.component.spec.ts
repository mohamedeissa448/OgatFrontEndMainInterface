import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAffiliatePercentageComponent } from './change-affiliate-percentage.component';

describe('ChangeAffiliatePercentageComponent', () => {
  let component: ChangeAffiliatePercentageComponent;
  let fixture: ComponentFixture<ChangeAffiliatePercentageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeAffiliatePercentageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAffiliatePercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
