import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'error_pago',
  templateUrl: './error_pago.component.html',
  styles: [
  ]
})

export class ErrorPagoComponent implements OnInit {

   constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
   }

  ngOnInit(): void {
  }

}
