import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStoreLocationComponent } from './add-store-location.component';

describe('AddStoreLocationComponent', () => {
  let component: AddStoreLocationComponent;
  let fixture: ComponentFixture<AddStoreLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStoreLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStoreLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
