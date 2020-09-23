import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecreateOrderComponent } from './recreate-order.component';

describe('RecreateOrderComponent', () => {
  let component: RecreateOrderComponent;
  let fixture: ComponentFixture<RecreateOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecreateOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecreateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
