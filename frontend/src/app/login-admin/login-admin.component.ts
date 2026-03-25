import { Component, inject } from '@angular/core';
import { KorisnikService } from '../servisi/korisnik.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {
  private router = inject(Router)
    private korisnikServis = inject(KorisnikService)
    username: string = "";
    password: string = "";
    error: string = "";
    admin: boolean = false;
    lozinka:string=""
    ngOnInit() :void{
      
    }
    login() {
      if (this.username == "" || this.password == "") {
        this.error = "Niste uneli sve podatke!";
        return;
      }
      this.error = "";
      this.korisnikServis.login1(this.username, this.password,"admin").subscribe(k => {
        if (k) {
          localStorage.setItem("ulogovan", JSON.stringify(k))
          this.router.navigate([k.tip])
        } else {
          this.error = "Losi podaci!";
          return;
        }
      })
  
    }
}
