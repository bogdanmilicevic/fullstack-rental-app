import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { KorisnikService } from '../servisi/korisnik.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private router = inject(Router)
  private korisnikServis = inject(KorisnikService)
  tip: string=''
  username: string = "";
  password: string = "";
  error: string = "";
  admin: boolean = false;

  login() {
    if (this.username == "" || this.password == "") {
      this.error = "Niste uneli sve podatke!";
      return;
    }
    this.error = "";
    this.korisnikServis.login(this.username, this.password).subscribe(k => {
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
