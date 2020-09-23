import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaysOfDeliveryComponent } from './ways-of-delivery.component';

describe('WaysOfDeliveryComponent', () => {
  let component: WaysOfDeliveryComponent;
  let fixture: ComponentFixture<WaysOfDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaysOfDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaysOfDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
