import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoCheckoutComponent } from './carrito-checkout.component';

describe('CarritoCheckoutComponent', () => {
  let component: CarritoCheckoutComponent;
  let fixture: ComponentFixture<CarritoCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarritoCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarritoCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
