import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsuariosService, Usuario } from '@bluebits/usuarios';
import { Router } from '@angular/router';


@Component({
  selector: 'bluebits-usuarios-list',
  templateUrl: './usuarios-list.component.html'
})
export class UsuariosListComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(
    private usuariosService: UsuariosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this._getUsuarios();
  }

  deleteUsuario(usuarioId: string) {
    this.confirmationService.confirm({
      message: 'Quieres eliminar este usuario?',
      header: 'Eliminar usuario',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuariosService.deleteUsuario(usuarioId).subscribe(
          () => {
            this._getUsuarios();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
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
    this.usuariosService.getUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }
}
