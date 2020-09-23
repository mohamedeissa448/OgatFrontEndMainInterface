import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMaterialFormComponent } from './product-material-form.component';

describe('ProductMaterialFormComponent', () => {
  let component: ProductMaterialFormComponent;
  let fixture: ComponentFixture<ProductMaterialFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMaterialFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMaterialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
