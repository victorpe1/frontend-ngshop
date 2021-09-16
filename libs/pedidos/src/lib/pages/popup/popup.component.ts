import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'pedidos-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.sass']
})
export class PopupComponent implements OnInit {


  @Input() amount: any;
  @Input() items: any;

  constructor(
    public activeModel: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

}
