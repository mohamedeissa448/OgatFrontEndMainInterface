import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncreaseInventoryEditFormComponent } from './increase-inventory-edit-form.component';

describe('IncreaseInventoryEditFormComponent', () => {
  let component: IncreaseInventoryEditFormComponent;
  let fixture: ComponentFixture<IncreaseInventoryEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncreaseInventoryEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncreaseInventoryEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
