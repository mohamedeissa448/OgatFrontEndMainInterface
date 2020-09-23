import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IncreaseInventoryComponent } from './increase-inventory.component';

describe('ManageIncreaseInventoryComponent', () => {
  let component: IncreaseInventoryComponent;
  let fixture: ComponentFixture<IncreaseInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncreaseInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncreaseInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
