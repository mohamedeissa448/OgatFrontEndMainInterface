import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecreaseInventoryComponent } from './decrease-inventory.component';

describe('DecreaseInventoryComponent', () => {
  let component: DecreaseInventoryComponent;
  let fixture: ComponentFixture<DecreaseInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecreaseInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecreaseInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
