import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService, Categoria } from '@bluebits/productos';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categorias-list',
  templateUrl: './categorias-list.component.html',
  styles: [
  ]
})
export class CategoriasListComponent implements OnInit {
  categorias: Categoria[] = [];
  endsubs$: Subject<any> = new Subject();

  constructor(
    private CategoriaService: CategoriaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this._getCategorias();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  deleteCategoria(id_cat: string) {
    console.log(id_cat);
    this.confirmationService.confirm({
      message: 'Quieres eliminar esta categoria?',
      header: 'Eliminar Categoria',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.CategoriaService.deleteCategoria(id_cat).subscribe(
          () => {
            this._getCategorias();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Categoria ha sido eliminado!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Categoria no ha sido eliminado!'
            });
          }
        );
      }
    });
  }


  private _getCategorias() {
    this.CategoriaService
      .getCategorias()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((cats) => {
        this.categorias = cats;
      });
  }

  updateCategoria(id_cat: string) {
    this.router.navigateByUrl(`categorias/form/${id_cat}`);
  }

}
