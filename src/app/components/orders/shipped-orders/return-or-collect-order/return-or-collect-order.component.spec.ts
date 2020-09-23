import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnOrCollectOrderComponent } from './return-or-collect-order.component';

describe('ReturnOrCollectOrderComponent', () => {
  let component: ReturnOrCollectOrderComponent;
  let fixture: ComponentFixture<ReturnOrCollectOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnOrCollectOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnOrCollectOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
