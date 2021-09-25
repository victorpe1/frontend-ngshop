import { Component, OnInit } from '@angular/core';
import { AuthService } from '@bluebits/usuarios';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private authService: AuthService) { }

  cerrarSesion() {
    this.authService.logout();
  }

}
