import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Categoria } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'productos-categoria-banner',
  templateUrl: './categoria-banner.component.html',
  styles: [
  ]
})
export class CategoriaBannerComponent implements OnInit {
  categories: Categoria[] = [];
  endSubs$: Subject<any> = new Subject();

  constructor(private categoriasService: CategoriaService) { }

  ngOnInit(): void {
    this.categoriasService
      .getCategorias()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((categorias) => {
        this.categories = categorias;
        console.log(this.categories)
      });
      console.log(this.categories)
  }

  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
}
