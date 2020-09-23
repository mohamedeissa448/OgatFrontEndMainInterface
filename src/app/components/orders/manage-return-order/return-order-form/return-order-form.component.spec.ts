import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnOrderFormComponent } from './return-order-form.component';

describe('ReturnOrderFormComponent', () => {
  let component: ReturnOrderFormComponent;
  let fixture: ComponentFixture<ReturnOrderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnOrderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
