import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosListComponent } from './productos-list.component';

describe('ProductosListComponent', () => {
  let component: ProductosListComponent;
  let fixture: ComponentFixture<ProductosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
