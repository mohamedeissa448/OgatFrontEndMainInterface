import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCollectOrdersComponent } from './manage-collect-orders.component';

describe('ManageCollectOrdersComponent', () => {
  let component: ManageCollectOrdersComponent;
  let fixture: ComponentFixture<ManageCollectOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCollectOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCollectOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
