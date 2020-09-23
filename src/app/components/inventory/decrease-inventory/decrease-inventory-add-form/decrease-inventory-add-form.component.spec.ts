import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecreaseInventoryAddFormComponent } from './decrease-inventory-add-form.component';

describe('DecreaseInventoryAddFormComponent', () => {
  let component: DecreaseInventoryAddFormComponent;
  let fixture: ComponentFixture<DecreaseInventoryAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecreaseInventoryAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecreaseInventoryAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
