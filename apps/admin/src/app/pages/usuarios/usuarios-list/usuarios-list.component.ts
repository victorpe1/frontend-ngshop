import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsuariosService, Usuario } from '@bluebits/usuarios';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'bluebits-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['../../../../assets/style/flags.css']
})
export class UsuariosListComponent implements OnInit, OnDestroy {
  usuarios: Usuario[] = [];
  endsubs$: Subject<any> = new Subject();

  constructor(
    private usuariosService: UsuariosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this._getUsuarios();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  deleteUsuario(usuarioId: string) {
    this.confirmationService.confirm({
      message: 'Quieres eliminar este usuario?',
      header: 'Eliminar usuario',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuariosService.deleteUsuario(usuarioId).pipe(takeUntil(this.endsubs$)).subscribe(
          () => {
            this._getUsuarios();
            this.messageService.add({
              severity: 'success',
              summary: 'Actualizado',
              detail: 'Usuario eliminado!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Usuario no ha sido eliminado!'
            });
          }
        );
      }
    });
  }

  updateUsuario(id_usuario: string) {
    this.router.navigateByUrl(`usuarios/form/${id_usuario}`);
  }

  getCountryName(countryKey: string) {
    if (countryKey) {
    return this.usuariosService.getPais(countryKey);
    }
    else
      return "";
  }



  private _getUsuarios() {
    this.usuariosService.getUsuarios().pipe(takeUntil(this.endsubs$)).subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }
}
