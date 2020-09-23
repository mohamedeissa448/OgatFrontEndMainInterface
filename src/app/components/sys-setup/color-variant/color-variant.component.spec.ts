import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorVariantComponent } from './color-variant.component';

describe('ColorVariantComponent', () => {
  let component: ColorVariantComponent;
  let fixture: ComponentFixture<ColorVariantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorVariantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
