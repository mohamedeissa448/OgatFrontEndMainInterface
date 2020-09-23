import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDistributeOrdersComponent } from './manage-distribute-orders.component';

describe('ManageDistributeOrdersComponent', () => {
  let component: ManageDistributeOrdersComponent;
  let fixture: ComponentFixture<ManageDistributeOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDistributeOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDistributeOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
