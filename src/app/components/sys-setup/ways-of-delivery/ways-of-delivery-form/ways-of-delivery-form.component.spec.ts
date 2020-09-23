import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaysOfDeliveryFormComponent } from './ways-of-delivery-form.component';

describe('WaysOfDeliveryFormComponent', () => {
  let component: WaysOfDeliveryFormComponent;
  let fixture: ComponentFixture<WaysOfDeliveryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaysOfDeliveryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaysOfDeliveryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
