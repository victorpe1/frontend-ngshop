import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoPageComponent } from './producto-page.component';

describe('ProductoPageComponent', () => {
  let component: ProductoPageComponent;
  let fixture: ComponentFixture<ProductoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
