import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageReturnBillComponent } from './manage-return-bill.component';

describe('ManageReturnBillComponent', () => {
  let component: ManageReturnBillComponent;
  let fixture: ComponentFixture<ManageReturnBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageReturnBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageReturnBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
