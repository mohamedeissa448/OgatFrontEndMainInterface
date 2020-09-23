import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncreaseInventoryAddFormComponent } from './increase-inventory-add-form.component';

describe('IncreaseInventoryFormComponent', () => {
  let component: IncreaseInventoryAddFormComponent;
  let fixture: ComponentFixture<IncreaseInventoryAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncreaseInventoryAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncreaseInventoryAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
