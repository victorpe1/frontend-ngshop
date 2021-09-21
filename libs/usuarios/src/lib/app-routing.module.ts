import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { PerfilPageComponent } from './components/perfil-page/perfil-page.component';
import { AuthGuard } from './services/auth-guard.service';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'perfil',
    canActivate: [AuthGuard],
    component: PerfilPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
