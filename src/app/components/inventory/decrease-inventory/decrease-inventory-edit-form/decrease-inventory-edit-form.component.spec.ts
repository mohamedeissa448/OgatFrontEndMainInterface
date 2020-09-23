import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecreaseInventoryEditFormComponent } from './decrease-inventory-edit-form.component';

describe('DecreaseInventoryEditFormComponent', () => {
  let component: DecreaseInventoryEditFormComponent;
  let fixture: ComponentFixture<DecreaseInventoryEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecreaseInventoryEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecreaseInventoryEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
