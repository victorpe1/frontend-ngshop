import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosItemComponent } from './productos-item.component';

describe('ProductosItemComponent', () => {
  let component: ProductosItemComponent;
  let fixture: ComponentFixture<ProductosItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
