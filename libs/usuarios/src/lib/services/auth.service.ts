import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURLUsers = environment.apiUrl + 'usuarios';

  constructor(
    private http: HttpClient,
    private token: LocalstorageService,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<Usuario> {

    return this.http.post<Usuario>(`${this.apiURLUsers}/login`, { email, password });
  }

  logout() {
    this.token.removeToken();
    this.router.navigate(['/login']);
  }
}
