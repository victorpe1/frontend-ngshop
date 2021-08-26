import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';


@Component({
  selector: 'usuarios-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;
  enviado = false;
  authError = false;
  authMessage = 'Email o Contraseña mal digitada';

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.enviado = true;

    if (this.loginFormGroup.invalid) return;

    this.auth.login(this.loginForm.email.value, this.loginForm.password.value).subscribe(
      (usuario) => {
        this.authError = false;
        this.localstorageService.setToken(usuario.token);
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        this.authError = true;
        if (error.status !== 400) {
          this.authMessage = 'Error en el servidor, intentalo más tarde!';
        }
      }
    );
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }
}
