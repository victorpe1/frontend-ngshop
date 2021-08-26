import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosBuscarComponent } from './productos-buscar.component';

describe('ProductosBuscarComponent', () => {
  let component: ProductosBuscarComponent;
  let fixture: ComponentFixture<ProductosBuscarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosBuscarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosBuscarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
