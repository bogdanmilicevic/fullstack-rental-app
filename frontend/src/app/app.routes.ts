import { Routes } from '@angular/router';
import { PocetnaStranicaComponent } from './pocetna-stranica/pocetna-stranica.component';
import { LoginComponent } from './login/login.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { VlasnikComponent } from './vlasnik/vlasnik.component';
import { TuristaComponent } from './turista/turista.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { VikendicaComponent } from './vikendica/vikendica.component';
import { IznajmljivanjeComponent } from './iznajmljivanje/iznajmljivanje.component';
import { LozinkaComponent } from './lozinka/lozinka.component';

export const routes: Routes = [
  { path: '', component: PocetnaStranicaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'vlasnik', component: VlasnikComponent },
  { path: 'turista', component: TuristaComponent },
  { path: 'loginadmin', component: LoginAdminComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'admin', component: AdministratorComponent },
  { path: 'vikendica', component: VikendicaComponent },
  { path: 'iznajmljivanje', component: IznajmljivanjeComponent },
  { path: 'promenaLozinke', component: LozinkaComponent}
];
