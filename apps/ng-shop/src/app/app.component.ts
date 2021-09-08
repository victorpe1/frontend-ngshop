import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '@bluebits/usuarios';

@Component({
  selector: 'bluebits-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{

  constructor(private usuarioService: UsuariosService){
  }

  ngOnInit(){

    this.usuarioService.initAppSession();

  }


  title = 'ng-shop';
}
