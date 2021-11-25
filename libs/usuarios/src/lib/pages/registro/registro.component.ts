import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { UsuariosService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'usuarios-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  loginFormGroup!: FormGroup;
  form!: FormGroup;

  usuarios: Usuario[] = [];
  endsubs$: Subject<any> = new Subject();

  enviado = false;
  authError = false;
  authMessage = 'Email o Contraseña mal digitada';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localstorageService: LocalstorageService,
    private usuariosService: UsuariosService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    this.enviado = true;

    if (this.loginFormGroup.invalid) return;

    this.auth
      .login(this.loginForm.email.value, this.loginForm.password.value)
      .subscribe(
        (usuario) => {
          this.authError = false;
          this.localstorageService.setToken(usuario.token);
          window.location.href = '/';
        },
        (error: HttpErrorResponse) => {
          this.authError = true;
          if (error.status !== 400) {
            this.authMessage = 'Error en el servidor, intentalo más tarde!';
          }
        }
      );
  }

  onRegistras() {
    let aux = false;
    this.enviado = true;

    if (this.form.invalid) return;

    const usuario: Usuario = {
      nombre: this.usuarioForm.nombre.value,
      email: this.usuarioForm.email.value,
      password: this.usuarioForm.password.value,
    };

    this.usuariosService
      .getUsuarios()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((usuarios) => {
        this.usuarios = usuarios;

        this.usuarios.map((value) => {
          if (this.usuarioForm.email.value == value.email) {
            aux = true;
          }
        });

        console.log(aux);

        if(aux == false){
          this._addUsuario(usuario);

        }else{
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Correo ${usuario.email} ya ha sido creado!`,
          });
        }

      });



  }

  private _addUsuario(usuario: Usuario) {
    this.usuariosService.createUsuarioRegistro(usuario).subscribe(
      (usuario: Usuario) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Actualizado',
          detail: `Usuario ${usuario.nombre} ha sido creado!`,
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.router.navigate(['/registro']);
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Usuario no ha sido creado!',
        });
      }
    );
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }

  get usuarioForm() {
    return this.form.controls;
  }
}
