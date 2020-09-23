import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeVariantsFormComponent } from './size-variants-form.component';

describe('SizeVariantsFormComponent', () => {
  let component: SizeVariantsFormComponent;
  let fixture: ComponentFixture<SizeVariantsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeVariantsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeVariantsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
