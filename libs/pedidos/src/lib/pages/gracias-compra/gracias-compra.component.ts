import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'pedidos-gracias-compra',
  templateUrl: './gracias-compra.component.html',
  styles: [
  ]
})
export class GraciasCompraComponent implements OnInit {

  amount: any;
  items: any;

   constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();

    const state = navigation!.extras.state as {items: any, value: any};

    this.items = state.items;
    this.amount = state.value;

    console.log(state);
    console.log(this.items);
    console.log(this.amount);
   }

  ngOnInit(): void {
    /*data.purchase_units[0].items,
      data.purchase_units[0].amount.value*/
  }

}
