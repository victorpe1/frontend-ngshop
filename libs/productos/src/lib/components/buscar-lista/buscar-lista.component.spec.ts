import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarListaComponent } from './buscar-lista.component';

describe('BuscarListaComponent', () => {
  let component: BuscarListaComponent;
  let fixture: ComponentFixture<BuscarListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
