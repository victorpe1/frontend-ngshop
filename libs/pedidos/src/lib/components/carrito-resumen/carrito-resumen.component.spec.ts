import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoResumenComponent } from './carrito-resumen.component';

describe('CarritoResumenComponent', () => {
  let component: CarritoResumenComponent;
  let fixture: ComponentFixture<CarritoResumenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarritoResumenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarritoResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
