import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonOfCancelOrderComponent } from './reason-of-cancel-order.component';

describe('ReasonOfCancelOrderComponent', () => {
  let component: ReasonOfCancelOrderComponent;
  let fixture: ComponentFixture<ReasonOfCancelOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReasonOfCancelOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonOfCancelOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
