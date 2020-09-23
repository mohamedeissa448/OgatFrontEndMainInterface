import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonOfReturnOrderComponent } from './reason-of-return-order.component';

describe('ReasonOfReturnOrderComponent', () => {
  let component: ReasonOfReturnOrderComponent;
  let fixture: ComponentFixture<ReasonOfReturnOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReasonOfReturnOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonOfReturnOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
