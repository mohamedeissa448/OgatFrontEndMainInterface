import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectOrderFormComponent } from './collect-order-form.component';

describe('CollectOrderFormComponent', () => {
  let component: CollectOrderFormComponent;
  let fixture: ComponentFixture<CollectOrderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectOrderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
