import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'productos-producto-buscar',
  templateUrl: './productos-buscar.component.html',
  styles: [
  ]
})
export class ProductosBuscarComponent implements OnInit {
  checkoutFormGroup!: FormGroup;
  buscado!: string;

  Busqueda = {
    buscar: '555'
  }

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this._initCheckoutForm()
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      buscar: ['', Validators.required]
    });
  }

  buscar(): any{

    const usuario = {
      nombre: this.checkoutForm.buscar.value
    }

   this.buscado = usuario.nombre

    console.log(usuario.nombre)


  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }

}
