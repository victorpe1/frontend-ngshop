import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraciasCompraComponent } from './gracias-compra.component';

describe('GraciasCompraComponent', () => {
  let component: GraciasCompraComponent;
  let fixture: ComponentFixture<GraciasCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraciasCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraciasCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
