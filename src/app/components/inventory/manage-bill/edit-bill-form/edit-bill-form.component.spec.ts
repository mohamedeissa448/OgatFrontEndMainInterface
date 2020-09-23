import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBillFormComponent } from './edit-bill-form.component';

describe('EditBillFormComponent', () => {
  let component: EditBillFormComponent;
  let fixture: ComponentFixture<EditBillFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBillFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
