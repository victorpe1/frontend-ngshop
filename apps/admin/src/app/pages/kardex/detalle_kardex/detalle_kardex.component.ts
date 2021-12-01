import { Location } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  CategoriaService,
  Producto,
  ProductosService,
  Categoria,
  KardexProducto
} from '@bluebits/productos';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as FileSaver from 'file-saver';
import '../../../../assets/js/table.js';

import { jsPDF } from 'jspdf';
import * as autoTable from 'jspdf-autotable';
import 'jspdf-autotable';


@Component({
  selector: 'admin-productos-form',
  templateUrl: './detalle_kardex.component.html',
  styleUrls: ['./detalle_kardex.scss'],
})
export class ProductosKardexDetallesComponent implements OnInit, OnDestroy{
  kardexProducto: KardexProducto[] = [];

  cantidad_ultimo: any;
  precio_existencia_ultimo: any;
  valor_total_ex_ultimo: any;

  cols!: any[];
  exportColumns!: any[];

  //compraItems: CompraItem2[] = [];

  imageDisplay!: string | ArrayBuffer;
  id_producto_act!: string;
  endsubs$: Subject<any> = new Subject();

  constructor(
    private messageService: MessageService,
    private productoService: ProductosService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getKardexProducto();

    this.cols = [
      { field: 'fecha', header: 'Fecha' },
      { field: 'descripcion', header: 'Descripcion' },
      { field: 'cantidad_compra', header: 'Cantidad' },
      { field: 'precio_compra', header: 'Precio' },
      { field: 'valor_compra', header: 'Valor Total' },
      { field: 'cantidad_venta', header: 'Cantidad' },
      { field: 'precio_venta', header: 'Precio' },
      { field: 'valor_venta', header: 'Valor Total' },
      { field: 'cantidad_f', header: 'Cantidad' },
      { field: 'precio_f', header: 'Precio' },
      { field: 'valor_f', header: 'Valor Total' },
      ];

  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));


}

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _initForm() {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      if (params.id) {
        this.id_producto_act = params.id;
      }
    });
  }

  _getKardexProducto() {
    this.productoService
      .getKardexProducto(this.id_producto_act)
      .pipe(takeUntil(this.endsubs$))
      .subscribe((kardexProducto) => {
        this.kardexProducto = kardexProducto;

        this.kardexProducto.map(kardex =>{
          this.cantidad_ultimo = kardex.cantidad_existencia;
          this.precio_existencia_ultimo = kardex.precio_existencia;
          this.valor_total_ex_ultimo = kardex.valor_total_existencia;
         });

      });


  }

  exportPdf() {
   /* import("jspdf").then(jsPDF => {
        import("jspdf-autotable").then(x => {
            const doc = new jsPDF.default(0,0);
            doc.autoTable(this.exportColumns,
              this.kardexProducto);
            doc.save('kardex.pdf');
        })
    })*/
}

exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.kardexProducto);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "kardex");
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

  onCancle() {
    this.location.back();
  }
}
