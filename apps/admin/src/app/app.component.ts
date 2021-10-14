import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '@bluebits/usuarios';
import { NavigationEnd, Router } from '@angular/router'
import { filter } from 'rxjs/operators'

declare var gtag: any;
@Component({
  selector: 'admin-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  title = 'admin';

  constructor(private usuarioService: UsuariosService, private router: Router ){
    const navEndEvents$ = this.router.events.pipe(
      filter( (event) => event instanceof NavigationEnd)
      );

      navEndEvents$.subscribe((event: any) =>{
        gtag('config', 'G-EVLW3VL9X1', {
          'page_path': event.urlAfterRedirects
        });
      });

  }

  ngOnInit(){

    this.usuarioService.initAppSession();

  }

}
