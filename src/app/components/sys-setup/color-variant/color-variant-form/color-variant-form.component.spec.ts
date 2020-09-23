import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorVariantFormComponent } from './color-variant-form.component';

describe('ColorVariantFormComponent', () => {
  let component: ColorVariantFormComponent;
  let fixture: ComponentFixture<ColorVariantFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorVariantFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorVariantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
