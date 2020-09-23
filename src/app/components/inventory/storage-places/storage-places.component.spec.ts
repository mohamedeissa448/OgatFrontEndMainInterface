import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoragePlacesComponent } from './storage-places.component';

describe('StoragePlacesComponent', () => {
  let component: StoragePlacesComponent;
  let fixture: ComponentFixture<StoragePlacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoragePlacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoragePlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
