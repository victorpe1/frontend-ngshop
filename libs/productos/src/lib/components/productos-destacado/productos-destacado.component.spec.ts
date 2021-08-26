import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosDestacadoComponent } from './productos-destacado.component';

describe('ProductosDestacadoComponent', () => {
  let component: ProductosDestacadoComponent;
  let fixture: ComponentFixture<ProductosDestacadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosDestacadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosDestacadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
