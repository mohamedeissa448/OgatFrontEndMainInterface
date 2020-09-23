import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillAddFormComponent } from './bill-add-form.component';

describe('BillAddFormComponent', () => {
  let component: BillAddFormComponent;
  let fixture: ComponentFixture<BillAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
