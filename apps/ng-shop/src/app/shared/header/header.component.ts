import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuariosService } from 'libs/usuarios/src/lib/services/usuario.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngshop-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<any> = new Subject();
  usuarioId!: string;
  usuarioNombre!: string;

  constructor(private usuariosService: UsuariosService,) { }

  ngOnInit(): void {
    this._Data();
  }


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  private _Data() {
    this.usuariosService
      .observeCurrentUsuario()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user: any) => {

        if (user) {
          this.usuarioId = user.id;
          this.usuarioNombre = user.nombre;
        }
      });
  }

}
