import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido, PedidoReporteDate, PedidosService } from '@bluebits/pedidos';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as FileSaver from 'file-saver';
import '../../../../assets/js/table.js';

import { jsPDF } from 'jspdf';
import * as autoTable from 'jspdf-autotable';
import 'jspdf-autotable';


@Component({
  selector: 'bluebits-reporte-lista',
  templateUrl: './reporte-list.component.html'
})
export class ReporteListaComponent implements OnInit, OnDestroy {

  pedidos: PedidoReporteDate[] = [];

  dateMes!: Date;
  dateAnio!: Date;

  dia_act!: any;
  mes_act!: any;
  anio_act!: any;

  importeTotal: any;

  endsubs$: Subject<any> = new Subject();
  cols!: any[];
  exportColumns!: any[];
  selectedMesCode: string | undefined;

  date10!: Date;

 constructor(
    private pedidoService: PedidosService,
    private router: Router
  ) {
    let today = new Date();
    this.dia_act = today.getDate();
    this.mes_act = today.getMonth() +1;
    this.anio_act = today.getFullYear();
  }


  ngOnInit(): void {

    this._getPedidos();

    this.cols = [
      { field: 'usuario', header: 'Usuario' },
      { field: 'id', header: 'Id' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'precio_compra', header: 'Ciudad' },
      { field: 'telefono', header: 'Telefono' },
      { field: 'precio', header: 'Precio Total' },
      ];

  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  _getPedidos() {


    this.importeTotal = 0

    this.pedidoService.getPedidosReporteDiario(this.dia_act,this.mes_act, this.anio_act).pipe(takeUntil(this.endsubs$)).subscribe((pedidos) => {
      this.pedidos = pedidos;
      this.pedidos.map((item) =>{
        item.date = new Date(item.fecha_pedido!)

        this.importeTotal = item.totalPrecio + this.importeTotal

      });

    });
  }

  onChangeHoy(){

    this.importeTotal = 0

    this.pedidoService.getPedidosReporteDiario(this.dia_act,this.mes_act, this.anio_act).pipe(takeUntil(this.endsubs$)).subscribe((pedidos) => {
      this.pedidos = pedidos;
      this.pedidos.map((item) =>{
        item.date = new Date(item.fecha_pedido!)
        this.importeTotal = item.totalPrecio + this.importeTotal
      });
      console.log(this.pedidos)
    });

  }

  onChangeMes(event: any){
    let fecha = new Date(event)
    let mes = fecha.getMonth()
    mes = mes +1
    let an = fecha.getFullYear()

    this.importeTotal = 0

    this.pedidoService.getPedidosReporteMes(mes, an).pipe(takeUntil(this.endsubs$)).subscribe((pedidos) => {
      this.pedidos = pedidos;
      this.pedidos.map((item) =>{
        item.date = new Date(item.fecha_pedido!)
        this.importeTotal = item.totalPrecio + this.importeTotal
      });
      console.log(this.pedidos)
    });

  }

  onChangeAnio(event: any){

    this.importeTotal = 0

    let fecha = new Date(event)
    let an = fecha.getFullYear()

    this.pedidoService.getPedidosReporteAnio(an).pipe(takeUntil(this.endsubs$)).subscribe((pedidos) => {
      this.pedidos = pedidos;
      this.pedidos.map((item) =>{
        item.date = new Date(item.fecha_pedido!)
        this.importeTotal = item.totalPrecio + this.importeTotal
      });
      console.log(this.pedidos)
    });
  }



  exportPdf() {
 }

  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.pedidos);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "reporte");
    });
}

saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
